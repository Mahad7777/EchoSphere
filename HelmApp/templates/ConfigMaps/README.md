# ConfigMaps and Secrets - Usage Guide

## Overview

This directory contains Kubernetes ConfigMaps and Secrets for managing application configuration in a production-ready way.

## Structure

### ConfigMaps (Non-sensitive configuration)
- `backend-configmap.yaml` - Backend application settings
- `kafka-configmap.yaml` - Kafka broker configuration
- `redis-configmap.yaml` - Redis configuration file
- `zookeeper-configmap.yaml` - Zookeeper settings

### Secrets (Sensitive data)
Located in `../Secrets/`
- `app-secrets.yaml` - Database connection strings and credentials

## Deployment Order

1. **Apply ConfigMaps first:**
```bash
kubectl apply -f K8s/ConfigMaps/
```

2. **Apply Secrets:**
```bash
kubectl apply -f K8s/Secrets/
```

3. **Then deploy applications:**
```bash
kubectl apply -f K8s/Deployments/
kubectl apply -f K8s/Services/
kubectl apply -f K8s/Ingress/
```

## Updating Configuration

### To update non-sensitive config:
1. Edit the respective ConfigMap file
2. Apply changes:
```bash
kubectl apply -f K8s/ConfigMaps/backend-configmap.yaml
```
3. Restart pods to pick up changes:
```bash
kubectl rollout restart deployment/backend-deployment
```

### To update secrets:
1. Edit the secret file (use `stringData` for plain text)
2. Apply changes:
```bash
kubectl apply -f K8s/Secrets/app-secrets.yaml
```
3. Restart affected deployments:
```bash
kubectl rollout restart deployment/backend-deployment
```

## Viewing Current Configuration

```bash
# View ConfigMap
kubectl get configmap backend-config -o yaml

# View Secret (base64 decoded)
kubectl get secret app-secrets -o jsonpath='{.data.MONGO_CONNECT_STRING}' | base64 -d
```

## Production Best Practices

### Secrets Management
For production, consider using:

1. **External Secrets Operator** with cloud providers:
   - AWS Secrets Manager
   - Google Cloud Secret Manager
   - Azure Key Vault

2. **HashiCorp Vault** for centralized secret management

3. **Sealed Secrets** for GitOps workflows (encrypt secrets in Git)

### Example with External Secrets Operator:
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets
spec:
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: app-secrets
  data:
  - secretKey: MONGO_CONNECT_STRING
    remoteRef:
      key: prod/chat-app/mongodb
      property: connection_string
```

## Environment-Specific Configuration

Create separate ConfigMaps for different environments:

```bash
K8s/
├── ConfigMaps/
│   ├── dev/
│   │   └── backend-configmap.yaml
│   ├── staging/
│   │   └── backend-configmap.yaml
│   └── prod/
│       └── backend-configmap.yaml
```

Or use Kustomize overlays (recommended):
```bash
K8s/
├── base/
│   └── backend-configmap.yaml
└── overlays/
    ├── dev/
    ├── staging/
    └── prod/
```

## Security Notes

- Never commit unencrypted secrets to Git
- Use RBAC to restrict access to secrets
- Rotate secrets regularly
- Enable encryption at rest for etcd
- Use separate secrets for different environments
