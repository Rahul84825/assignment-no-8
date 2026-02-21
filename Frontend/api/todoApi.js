import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
});

export const fetchTodos = () => {
  const response = apiClient.get('/todo');
  return response.data?.data ?? [];
};

export const createTodo = (task) => {
  const response = apiClient.post('/todo', {
    data: { task },
  });
  return response.data?.data ?? [];
};

export const updateTodoById = (id, data) => {
  const response = apiClient.put(`/todo/${id}`, {
    data,
  });
  return response.data?.data;
};

export const deleteTodoById = (id) => {
  const response = apiClient.delete(`/todo/${id}`);
  return response.data?.data;
};
