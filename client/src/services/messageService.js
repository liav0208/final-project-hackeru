import http from "./httpService";
import { apiUrl } from "../config.json";

// send new message
export async function sendMessage(message) {
  const { data } = await http.post(`${apiUrl}/messages/send`, message);
  return data;
}

// get all inbox messages
export async function getInboxMessages(skip = 0) {
  const { data } = await http.get(`${apiUrl}/messages/inbox?skip=${skip}`);
  return data;
}

// get all outbox messages
export async function getOutboxMessages(limit = 5, skip = 0) {
  const { data } = await http.get(
    `${apiUrl}/messages/outbox?limit=${limit}&skip=${skip}`
  );
  return data;
}

const message = {
  sendMessage,
  getInboxMessages,
  getOutboxMessages,
};

export default message;
