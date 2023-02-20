import axios from "axios";

export const login = async (id, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/users/login",
      data: {
        email: id,
        password,
      },
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
    console.log(res);
  } catch (e) {
    let divError = document.getElementById("formError");
    divError.innerHTML = `Error : ${e.response.data.message}`;
  }
};
