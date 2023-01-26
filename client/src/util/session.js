import axios from "axios";
axios.defaults.withCredentials = true

export const signup = (user) =>
  fetch("api/users/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const login = (user) =>
  axios({
    method: "post",
    url: "api/users/login",
    data: user,
  });

  // fetch("users/login", {
  //   method: "POST",
  //   body: JSON.stringify(user),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // axios({
  //   method: "post",
  //   url: "/users/login",
  //   data: user,
  // });


<<<<<<< HEAD

=======
>>>>>>> parent of 0b68304 (alhamdulillah)
export const logout = (user) =>
  fetch("users/logout", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
