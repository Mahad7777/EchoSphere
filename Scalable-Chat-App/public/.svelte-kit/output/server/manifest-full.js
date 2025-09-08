export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["css/app.css","favicon.png"]),
	mimeTypes: {".css":"text/css",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.t0ep3y-i.js","app":"_app/immutable/entry/app.us9D42De.js","imports":["_app/immutable/entry/start.t0ep3y-i.js","_app/immutable/chunks/entry.zqN2Kkmc.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/entry/app.us9D42De.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/chunks/index.yUutpuvV.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
