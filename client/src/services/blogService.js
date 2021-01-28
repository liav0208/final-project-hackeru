import http from "./httpService";
import { apiUrl } from "../config.json";

export async function createMessage(body) {
  await http.post(`${apiUrl}/blog/create-message`, body);
}

export async function getAllMessages(skip = 0) {
  const { data } = await http.get(`${apiUrl}/blog/?skip=${skip}`);
  return data;
}

const blog = {
  createMessage,
  getAllMessages,
};

export default blog;
