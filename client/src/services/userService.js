import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import http from "./httpService";

const tokenKey = "token";

// get JWT token
export function getJwt() {
  return localStorage.getItem("token");
}

// return user data
export async function getUserDetails() {
  const { data } = await http.get(`${apiUrl}/users/me`);
  return data;
}

// return list of teachers
export async function getTeachersUser(skip) {
  const { data } = await http.get(`${apiUrl}/users/teachers?skip=${skip}`);
  return data;
}

// return logged user data
export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch {
    return null;
  }
}

//logout user
export function logout() {
  localStorage.removeItem(tokenKey);
}

//sign in user
export async function signin(email, password) {
  const { data } = await http.post(`${apiUrl}/auth/signin`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, data.token);
}

//return specific teacher data
export async function getTeacherDetails(id) {
  const { data } = await http.get(`${apiUrl}/users/teacher-profile/${id}`);
  return data;
}

//update user
export async function updateUser(userData) {
  const { data } = await http.put(`${apiUrl}/users/update-me`, userData);
  return data;
}

//save Teacher to favorite
export async function saveteacherToFavorite(teacherId) {
  const { data } = await http.patch(
    `${apiUrl}/users/save-teacher/${teacherId}`
  );
  return data;
}

// get favorite teachers
export async function getFavoriteTeachers() {
  const { data } = await http.get(`${apiUrl}/users/favorite`);
  return data;
}

// get most liked teachers
export async function getMostLikedTeachers() {
  const { data } = await http.get(`${apiUrl}/users/most-liked-teachers`);
  return data;
}

const user = {
  signin,
  getCurrentUser,
  logout,
  getJwt,
  getUserDetails,
  getTeachersUser,
  getTeacherDetails,
  updateUser,
  saveteacherToFavorite,
  getFavoriteTeachers,
  getMostLikedTeachers,
};

export default user;
