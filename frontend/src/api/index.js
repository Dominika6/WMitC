import axios from "axios";


export class Api {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Api();
    }
    return this.instance;
  }

  async init() {
    const result = await fetch(`./../config.json`);
    const config = await result.json();
    this.API = axios.create({ baseURL: config.proxy });
    // console.log(config.proxy, "test");

    this.API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`;
      }
      return req;
    });

    this.login = (formData) => this.API.post("/user/login", formData);
    this.createUser = (formData) => this.API.post("/user/createUser", formData);
    this.fetchTeamBySearch = (email) => this.API.get(`/user/search/${email}`);
    this.fetchUsers = () => this.API.get("/user/users");
    this.fetchManagers = () => this.API.get("/user/managers");
    this.updatePassword = (id, passwordData) =>
      this.API.patch(`/user/passwordUpdate/${id}`, passwordData);
    this.resetPassword = (userDatas) =>
      this.API.patch(
        `/user/passwordReset/${userDatas.id}/${userDatas.tmpPassword}`
      );
    this.updateUserName = (userDatas) =>
      this.API.patch(`/user/nameUpdate/${userDatas.id}/${userDatas.name}`);
    this.updateUserPhone = (userDatas) =>
      this.API.patch(
        `/user/phoneUpdate/${userDatas.id}/${userDatas.phone_number}`
      );
    this.fetchUser = (id) => this.API.get(`/user/getUser/${id}`);

    this.createClient = (newClient) =>
      this.API.post("/client/createClient", newClient);
    this.fetchClientsBySearch = (email) =>
      this.API.get(`/client/search/${email}`);
    this.fetchClients = () => this.API.get("/client/clients");
    this.fetchClient = (id) => this.API.get(`/client/getClient/${id}`);
    this.updateClientEmail = (clientDatas) =>
      this.API.patch(
        `/client/emailUpdate/${clientDatas.id}/${clientDatas.email}`
      );
    this.updateClientPhone = (clientDatas) =>
      this.API.patch(
        `/client/phoneUpdate/${clientDatas.id}/${clientDatas.phone_number}`
      );

    this.createProject = (newProject) =>
      this.API.post("/project/createProject", newProject);
    this.fetchMyClientsProjects = (email) =>
      this.API.get(`/project/getMyClientsProjects/${email}`);

    this.createTask = (newTask) => this.API.post("/task/createTask", newTask);
    this.updateTask = (id, implementation_status) =>
      this.API.patch(`/task/taskStatusUpdate/${id}/${implementation_status}`);
    this.updateTaskWorkHours = (taskDatas) =>
      this.API.patch(
        `/task/taskWorkedHoursUpdate/${taskDatas.id}/${taskDatas.value}`
      );
    this.commentTask = (value, id) =>
      this.API.post(`/task/${id}/commentTask`, { value });
    this.fetchTask = (id) => this.API.get(`/task/${id}`);
    this.fetchTasksBySearch = (email) => this.API.get(`/task/search/${email}`);

    this.fetchProjectTasksByCoordinatorEmailWithArchived = (email) =>
      this.API.get(`/task/search_project_tasks/${email}`);
    this.fetchClientSummaryTable = (email) =>
      this.API.get(`task/clientSummaryTable/${email}`);
    this.fetchUserSummaryTable = (email) =>
      this.API.get(`task/userSummaryTable/${email}`);
    this.fetchTeamSummaryTable = (email) =>
      this.API.get(`task/teamSummaryTable/${email}`);
  }
}
