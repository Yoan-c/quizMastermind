import "@babel/polyfill";
import { login, updateUser, updatePassword } from "./login";
import { startGame } from "./game";

let gameStart = document.getElementById("gameStart");
let btnConnection = document.getElementById("btnConnection");
let btnUpdate = document.getElementById("btnUpdate");
let btnUpdatePassword = document.getElementById("btnUpdatePassword");

if (btnConnection) {
  btnConnection.addEventListener("click", (e) => {
    e.preventDefault();
    let idConnect = document.getElementById("idConnect").value;
    let password = document.getElementById("password").value;
    login(idConnect, password);
  });
}

if (btnUpdate) {

  btnUpdate.addEventListener("click", (e) => {
    document.getElementById("formSuccess").innerHTML="";
    document.getElementById("formError").innerHTML="";
    e.preventDefault();
    document.getElementById("formError").innerHTML = "";
    let email = document.getElementById("Email").value;
    let pseudo = document.getElementById("pseudo").value;
    const data = {
      email, pseudo
    }
    updateUser(data);

  });
}
if (btnUpdatePassword) {
  btnUpdatePassword.addEventListener("click", (e) => {
    document.getElementById("formSuccess").innerHTML="";
    document.getElementById("formError").innerHTML="";
    e.preventDefault();
    document.getElementById("formError").innerHTML = "";
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if (!password || (password !== confirmPassword)) {
      document.getElementById("formError").innerHTML = "les mots de passe saisis ne sont pas identiques";
    }
    else if (password.length < 6){
      document.getElementById("formError").innerHTML = "le mot de passe doit avoir plus de 5 caractères";
    }
    else {
      const data = {
        password, confirmPassword
      }
      updatePassword(data);
    }
  });
}

if (gameStart) {
  gameStart.addEventListener("click", () => {
    const category = document.getElementById("category").textContent;
    startGame(category);
  });
}
