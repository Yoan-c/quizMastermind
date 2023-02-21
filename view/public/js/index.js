import "@babel/polyfill";
import { login } from "./login";
import { startGame } from "./game";

let gameStart = document.getElementById("gameStart");
let btnConnection = document.getElementById("btnConnection");

if (btnConnection) {
  btnConnection.addEventListener("click", (e) => {
    e.preventDefault();
    let idConnect = document.getElementById("idConnect").value;
    let password = document.getElementById("password").value;
    login(idConnect, password);
  });
}

if (gameStart) {
  gameStart.addEventListener("click", () => {
    const category = document.getElementById("category").textContent;
    startGame(category);
  });
}
