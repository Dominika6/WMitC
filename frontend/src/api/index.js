import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const login = (formData) => API.post("/user/login", formData);
export const createUser = (formData) => API.post("/user/createUser", formData);
export const fetchTeamBySearch = (email) => API.get(`/user/search/${email}`);
export const fetchUsers = () => API.get("/user/users");
export const fetchManagers = () => API.get("/user/managers");
export const updatePassword = (id, passwordData) =>
  API.patch(`/user/passwordUpdate/${id}`, passwordData);
export const resetPassword = (userDatas) =>
  API.patch(`/user/passwordReset/${userDatas.id}/${userDatas.tmpPassword}`);
export const updateUserEmail = (userDatas) =>
  API.patch(`/user/emailUpdate/${userDatas.id}/${userDatas.email}`);
export const updateUserName = (userDatas) =>
  API.patch(`/user/nameUpdate/${userDatas.id}/${userDatas.name}`);
export const updateUserPhone = (userDatas) =>
  API.patch(`/user/phoneUpdate/${userDatas.id}/${userDatas.phone_number}`);
export const updateUserCoordinator = (userDatas) =>
  API.patch(`/user/managerUpdate/${userDatas.id}/${userDatas.id_supervisor}`);
export const fetchUser = (id) => API.get(`/user/getUser/${id}`);

export const createClient = (newClient) =>
  API.post("/client/createClient", newClient);
export const fetchClientsBySearch = (email) =>
  API.get(`/client/search/${email}`);
export const getClientByTheirEmail = (email) =>
  API.get(`/client/search/client/${email}`);
export const fetchClients = () => API.get("/client/clients");
export const fetchClient = (id) => API.get(`/client/getClient/${id}`);
export const updateClientEmail = (clientDatas) =>
  API.patch(`/client/emailUpdate/${clientDatas.id}/${clientDatas.email}`);
export const updateClientName = (clientDatas) =>
  API.patch(`/client/nameUpdate/${clientDatas.id}/${clientDatas.name}`);
export const updateClientPhone = (clientDatas) =>
  API.patch(
    `/client/phoneUpdate/${clientDatas.id}/${clientDatas.phone_number}`
  );
export const updateClientCoordinator = (clientDatas) =>
  API.patch(
    `/client/managerUpdate/${clientDatas.id}/${clientDatas.id_supervisor}`
  );

export const createProject = (newProject) =>
  API.post("/project/createProject", newProject);
export const deleteProject = (id) => API.delete(`/project/delete/${id}`);
export const fetchProjects = () => API.get("/project/projects");
export const fetchMyClientsProjects = (email) =>
  API.get(`/project/getMyClientsProjects/${email}`);

export const createTask = (newTask) => API.post("/task/createTask", newTask);
export const deleteTask = (id) => API.delete(`/task/delete/${id}`);
export const updateTask = (id, status) =>
  API.patch(`/task/taskStatusUpdate/${id}`, status);
export const updateTaskWorkHours = (taskDatas) =>
  API.patch(
    `/task/taskWorkedHoursUpdate/${taskDatas.id}/${taskDatas.hours_worked}`
  );
export const commentTask = (value, id) =>
  API.post(`/task/${id}/commentTask`, { value });
export const fetchTask = (id) => API.get(`/task/${id}`);
export const fetchTasksBySearch = (email) => API.get(`/task/search/${email}`);
export const getTeamTasksBySearch = (email) =>
  API.get(`/task/search_team/${email}`);
export const fetchProjectTasksByCoordinatorEmailWithArchived = (email) =>
  API.get(`/task/search_project_tasks/${email}`);
