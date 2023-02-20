import "@babel/polyfill";
import { login } from "./login";

let formLogin = document.getElementById("formLogin");
let btnConnection = document.getElementById("btnConnection");

if (btnConnection) {
  btnConnection.addEventListener("click", (e) => {
    e.preventDefault();
    let idConnect = document.getElementById("idConnect").value;
    let password = document.getElementById("password").value;
    login(idConnect, password);
  });
}
