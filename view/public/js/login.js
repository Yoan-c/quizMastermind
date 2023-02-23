import axios from "axios";

export const login = async (id, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/users/login",
      data: {
        email: id,
        pseudo: id,
        password,
      },
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      });
    }
  } catch (e) {
    let divError = document.getElementById("formError");
    divError.innerHTML = `Error : ${e.response.data.message}`;
  }
};
export const signup = async (pseudo, email, password, confirmPassword) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/users/signup",
      data: {
        email,
        pseudo,
        password,
        confirmPassword,
      },
    });
    if (res.data.status === "success") {
      document.getElementById("formError").innerHTML = "";
      document.getElementById("formSuccess").innerHTML =
        "Utilisateur crée vous allez etre redirigé pour vous connecter / ou connectez vous ";
      window.setTimeout(() => {
        location.assign("/login");
      }, 5000);
    }
  } catch (e) {
    let divError = document.getElementById("formError");
    divError.innerHTML = `Error : ${e.response.data.message}`;
  }
};

export const updateUser = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3000/api/users/update",
      data,
    });
    if (res.data.status === "success") {
      document.getElementById("formSuccess").innerHTML = "Mis à jour effectué";
    }
  } catch (e) {
    let divError = document.getElementById("formError");
    divError.innerHTML = `Error : ${e.response.data.message}`;
  }
};
export const updatePassword = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3000/api/users/updatePassword",
      data,
    });
    if (res.data.status === "success") {
      document.getElementById("formSuccess").innerHTML = "Mot de passe modifié";
    }
  } catch (e) {
    let divError = document.getElementById("formError");
    divError.innerHTML = `Error : ${e.response.data.message}`;
  }
};
