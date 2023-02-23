import axios from "axios";

export const login = async (PATH, id, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${PATH}/api/users/login`,
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
export const signup = async (
  PATH,
  pseudo,
  email,
  password,
  confirmPassword
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${PATH}/api/users/signup`,
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

export const updateUser = async (PATH, data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${PATH}/api/users/update`,
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
export const updatePassword = async (PATH, data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${PATH}/api/users/updatePassword`,
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
