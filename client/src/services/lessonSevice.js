import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getMyLessons() {
  const { data } = await http.get(`${apiUrl}/lessons/my-lessons`);
  return data;
}

export async function getLessonById(lessonId) {
  const { data } = await http.get(`${apiUrl}/lessons/${lessonId}`);
  return data;
}

export async function editLesson(lessonId, data) {
  await http.put(`${apiUrl}/lessons/update/${lessonId}`, data);
}

export async function deleteLesson(lessonId) {
  await http.delete(`${apiUrl}/lessons/${lessonId}`);
}

export async function getLessonByTeacherId(teacherId) {
  const { data } = await http.get(
    `${apiUrl}/lessons/teacher-lessons/${teacherId}`
  );
  return data;
}


export async function getLessons(topic = null, limit = null, skip = 0) {
  if (topic && limit) {
    const { data } = await http.get(
      `${apiUrl}/lessons?topic=${topic}&limit=${limit}&skip=${skip}`
    );
    return data;
  }
  if (topic) {
    const { data } = await http.get(`${apiUrl}/lessons?topic=${topic}`);
    return data;
  }
  if (limit) {
    const { data } = await http.get(`${apiUrl}/lessons?limit=${limit}`);
    return data;
  }
  const { data } = await http.get(`${apiUrl}/lessons`);
  return data;
}

const lesson = {
  getMyLessons,
  getLessonById,
  editLesson,
  deleteLesson,
  getLessonByTeacherId,
  getLessons,
};

export default lesson;
