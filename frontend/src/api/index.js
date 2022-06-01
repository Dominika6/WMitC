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
export const updateUserName = (userDatas) =>
  API.patch(`/user/nameUpdate/${userDatas.id}/${userDatas.name}`);
export const updateUserPhone = (userDatas) =>
  API.patch(`/user/phoneUpdate/${userDatas.id}/${userDatas.phone_number}`);
export const fetchUser = (id) => API.get(`/user/getUser/${id}`);

export const createClient = (newClient) =>
  API.post("/client/createClient", newClient);
export const fetchClientsBySearch = (email) =>
  API.get(`/client/search/${email}`);
export const fetchClients = () => API.get("/client/clients");
export const fetchClient = (id) => API.get(`/client/getClient/${id}`);
export const updateClientEmail = (clientDatas) =>
  API.patch(`/client/emailUpdate/${clientDatas.id}/${clientDatas.email}`);
export const updateClientPhone = (clientDatas) =>
  API.patch(
    `/client/phoneUpdate/${clientDatas.id}/${clientDatas.phone_number}`
  );

export const createProject = (newProject) =>
  API.post("/project/createProject", newProject);
export const fetchMyClientsProjects = (email) =>
  API.get(`/project/getMyClientsProjects/${email}`);

export const createTask = (newTask) => API.post("/task/createTask", newTask);
export const updateTask = (id, implementation_status) =>
  API.patch(`/task/taskStatusUpdate/${id}/${implementation_status}`);
export const updateTaskWorkHours = (taskDatas) =>
  API.patch(`/task/taskWorkedHoursUpdate/${taskDatas.id}/${taskDatas.value}`);
export const commentTask = (value, id) =>
  API.post(`/task/${id}/commentTask`, { value });
export const fetchTask = (id) => API.get(`/task/${id}`);
export const fetchTasksBySearch = (email) => API.get(`/task/search/${email}`);

export const fetchProjectTasksByCoordinatorEmailWithArchived = (email) =>
  API.get(`/task/search_project_tasks/${email}`);
export const fetchClientSummaryTable = (email) =>
  API.get(`task/clientSummaryTable/${email}`);
export const fetchUserSummaryTable = (email) =>
  API.get(`task/userSummaryTable/${email}`);
export const fetchTeamSummaryTable = (email) =>
  API.get(`task/teamSummaryTable/${email}`);
