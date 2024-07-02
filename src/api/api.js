import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "6e23899c-6120-4846-80ff-13d777b3afbf",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  unfollow(userId) {
    return instance
     .delete(`follow/${userId}`)
     .then((response) => {
      return response.data;
    });
  },
  follow(userId) {
    return instance
     .post(
      `follow/${userId}`,
      {},
    )
     .then((response) => {
        return response.data;
      });
  },
};

export const profileAPI = {
    profileGetUsers(userId) {
        return instance
          .get(`profile/` + (userId || 2))
          .then((response) => {
            return response.data;
          });
      },
    getStatus(userId) {
      return instance
          .get(`profile/status/` + (userId || 31301))
          .then((response) => {
            return response.data;
          });
    },
    updateStatus(status) {
      return instance
          .put(`profile/status/`, {status: status})
          .then((response) => {
            return response.data;
          });
    }
}

export const headerAPI = {
    headerGetAuth() {
        return instance
        .get(`auth/me`)
        .then((response) => {
            return response.data;
          });
    }
}

export const loginAPI = {
  logIn(body) {
    return instance
        .post(`auth/login`, body)
        .then((response) => {
            return response.data;
          });
  },
  logOut() {
    return instance
        .delete(`auth/login`)
        .then((response) => {
            return response.data;
          });
  }
}