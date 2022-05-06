import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });


API.interceptors.request.use((req) => {
   if(localStorage.getItem('profile')) {
       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
   }
   return req;
});


export const login = (formData) => API.post('/user/login', formData);
export const createUser = (formData) => API.post('/user/createUser', formData);
export const fetchTeamBySearch = (email) => API.get(`/user/search/${email}`);
export const fetchUsers = () => API.get('/user/users');
export const updatePassword = (id, passwordData) => API.patch(`/user/passwordUpdate/${id}`, passwordData);


export const createClient = (newClient) => API.post('/client/createClient', newClient);
export const fetchClientsBySearch = (email) => API.get(`/client/search/${email}`);
export const getClientByTheirEmail = (email) => API.get(`/client/search/client/${email}`);
export const fetchClients = () => API.get('/client/clients');


export const createProject = (newProject) => API.post('/project/createProject', newProject);
export const deleteProject = (id) => API.delete(`/project/delete/${id}`);
export const fetchProjects = () => API.get('/project/projects');
export const fetchMyClientsProjects = (email) => API.get(`/project/getMyClientsProjects/${email}`);


export const createTask = (newTask) => API.post('/task/createTask', newTask);
export const deleteTask = (id) => API.delete(`/task/delete/${id}`);
export const updateTask = (id, status) => API.patch(`/task/taskStatusUpdate/${id}`, status);
export const commentTask = (value, id) => API.post(`/task/${id}/commentTask`, { value });
export const fetchTask = (id) => API.get(`/task/${id}`);
export const fetchTasksBySearch = (email) => API.get(`/task/search/${email}`);
export const getTeamTasksBySearch = (email) => API.get(`/task/search_team/${email}`);
export const getProjectTasksByCoordinatorEmail = (email) => API.get(`/task/search_project_tasks/${email}`);

