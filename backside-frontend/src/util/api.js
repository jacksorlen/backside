import { API_BASE_URL, ACCESS_TOKEN } from './const';
import axios from 'axios';

const request = (options) => {

  let headers = {};
  if(options.headers !== undefined)
    headers = options.headers;

  if(localStorage.getItem(ACCESS_TOKEN)) {
    headers['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
  }
  
  return axios({
    url: options.url,
    method: options.method,
    data: options.data,
    headers: headers
  });
}

export function getPublicTitles() {
  return request({
    url: API_BASE_URL + "/public/letters/titles",
    method: "GET",
    data: null
  });
}

export function getAllTitles() {
  return request({
    url: API_BASE_URL + "/authorship/letters/titles",
    method: "GET",
    data: null
  });
}

export function getPublicLetterById(id) {
  return request({
    url: API_BASE_URL + "/public/letters/" + id,
    method: "GET",
    data: null
  });
}

export function getAnyLetterById(id) {
  return request({
    url: API_BASE_URL + "/authorship/letters/" + id,
    method: "GET",
    data: null
  });
}

export function deleteLetter(id) {
  return request({
    url: API_BASE_URL + "/authorship/letters/delete_letter/" + id,
    method: "POST",
    data: null
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    data: loginRequest
  });
}

export function saveLetter(letter) {
  return request({
    url: API_BASE_URL + "/authorship/letters/save_letter",
    method: "POST",
    data: letter
  });
}

export function savePicture(picture) {
  return request({
    url: API_BASE_URL + "/authorship/pictures/save_picture",
    method: "POST",
    data: picture
  });
}

export function checkAuth() {
  return request({
    url: API_BASE_URL + "/auth/is_authed",
    method: "GET"
  });
}