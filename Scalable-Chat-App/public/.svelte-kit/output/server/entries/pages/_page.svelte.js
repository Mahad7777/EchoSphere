import { c as create_ssr_component, d as add_attribute, f as each, h as add_classes, e as escape } from "../../chunks/ssr.js";
import "socket.io-client";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let messages = [];
  let messagesContainer;
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours() % 12 || 12;
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")} ${ampm}`;
  };
  return `<div class="container"><div class="child-container"><div class="header" data-svelte-h="svelte-1jy54y0"><h2>Scalable Chat App</h2></div> <div class="chat-whole-section"><div class="chat-section"${add_attribute("this", messagesContainer, 0)}>${each(messages, (message) => {
    return `<div${add_classes(((messages ? "messages" : "") + " " + (message.isSelf ? "self" : "")).trim())}><strong class="user">${escape(message.socket_id)}:</strong> <p class="user-message">${escape(message.message)}</p> <p class="message-created-at">${escape(formatDate(message.createdAt))}</p> </div>`;
  })}</div> <form data-svelte-h="svelte-35hfx0"><div class="message-control-section"><div class="message-input-section"><input type="text" name="user_message" placeholder="Enter Message..." required></div> <div class="message-send-section"><button type="submit">Send</button></div></div></form></div></div></div>`;
});
export {
  Page as default
};
