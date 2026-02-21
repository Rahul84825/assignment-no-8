import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
});

export const fetchTodos = async () => {
  const response = await apiClient.get('/todo');
  return response.data?.data ?? [];
};

export const createTodo = async (task) => {
  const response = await apiClient.post('/todo', {
    data: { task },
  });
  return response.data?.data ?? [];
};

export const updateTodoById = async (id, data) => {
  const response = await apiClient.put(`/todo/${id}`, {
    data,
  });
  return response.data?.data;
};

export const deleteTodoById = async (id) => {
  const response = await apiClient.delete(`/todo/${id}`);
  return response.data?.data;
};
