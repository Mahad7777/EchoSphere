<script>
	import { onMount, afterUpdate } from 'svelte';
	import io from 'socket.io-client';
	

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
	let socket;
	let messages = [];
	let messagesContainer;

	onMount(async () => {

		const response = await fetch('/api/get_messages', { method: 'POST' });
		const messageArray = await response.json();

		// Socket connection
		socket = io('/', {
		transports: ["websocket"], // optional: avoids polling fallback
		});

		setTimeout(() => {
			messageArray.forEach((value, index, array) => {
				let data = JSON.parse(value);
				const isSelf = data.socket_id === socket.id;
				messages = [...messages, { ...data, isSelf }];
			});
			
		// console.log(messages)
		}, 100);


		socket.on('chat message', (data) => {
			const isSelf = data.socket_id === socket.id;
			messages = [...messages, { ...data, isSelf }];
		});
	});

	afterUpdate(() => {
		scrollToBottom();
	});

	const submitMessage = (e) => {
		const formData = new FormData(e.target);
		const userMessage = formData.get('user_message');

		socket.emit('chat message', userMessage);
		e.target.reset();
	};

	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		const hours = date.getHours() % 12 || 12; // Convert 24-hour format to 12-hour format
		const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

		return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${ampm}`;
	};

	const scrollToBottom = () => {
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	};
</script>

<div class="container">
	<div class="child-container">
		<div class="header">
			<h2>Chat App</h2>
		</div>

		<div class="chat-whole-section">
			<div class="chat-section" bind:this={messagesContainer}>
				{#each messages as message}
					<div class:messages class:self={message.isSelf}>
						<strong class="user">{message.socket_id}: </strong>
						<p class="user-message">{message.message}</p>
						<p class="message-created-at">{formatDate(message.createdAt)}</p>
					</div>
				{/each}
			</div>

			<form on:submit|preventDefault={submitMessage}>
				<div class="message-control-section">
					<div class="message-input-section">
						<input type="text" name="user_message" placeholder="Enter Message..." required />
					</div>

					<div class="message-send-section">
						<button type="submit">Send</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
