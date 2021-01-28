import http from "./httpService";
import { apiUrl } from "../config.json";

// get 5 users and 5 lessons
export async function getUsersAndLessons(str) {
  const { data } = await http.get(`${apiUrl}/search/?search=${str}`);
  return data;
}

// find all lesson with the query
export async function findLessonByQuery({ query = "" }) {
  const { data } = await http.get(`${apiUrl}/search/find/${query}`);
  return data;
}

const search = {
  getUsersAndLessons,
  findLessonByQuery,
};

export default search;
