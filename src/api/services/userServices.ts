import axios from 'axios';

const API_URL = 'http://localhost:3000/api';


export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};


export const createUser = async (name: string, email: string) => {
  const response = await axios.post(`${API_URL}/user`, { name, email });
  return response.data;
};


export const updateUser = async (id: number, name: string, email: string) => {
  const response = await axios.put(`${API_URL}/user/${id}`, { name, email });
  return response.data;
};


export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${API_URL}/user/${id}`);
  return response.data;
};






