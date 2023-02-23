import axios from "axios";

export const startGame = async (category) => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://127.0.0.1:3000/api/quiz/${category}/start`,
    });
    if (res.data.success === "success") {
      let dataQuestion = await axios({
        method: "GET",
        url: res.data.data.url,
      });
      if (dataQuestion.data.success === "success") {
        format(
          dataQuestion.data.data,
          dataQuestion.data.numQuestion + 1,
          res.data.data.nbQuestions,
          false
        );
      }
    }
  } catch (e) {
    document.getElementById(
      "game__error"
    ).innerHTML = `Error : ${e.response.data.message}`;
  }
};

const format = (quiz, numQuestion, nbQuestions, first) => {
  const { question, category, _id, choices } = quiz;
  const divgGame = document.getElementById("game");
  const divBtn = document.getElementById("game__btn");

  document.getElementById("game__error").innerHTML = "";

  if (!first) {
    divgGame.removeChild(divBtn);
  } else {
    divgGame.removeChild(document.getElementById("game__info"));
  }
  const divGameInfo = document.createElement("div");

  divGameInfo.classList.add("game__info");
  divGameInfo.id = "game__info";
  divGameInfo.innerHTML = `
  <div class="game__numQuestion">Question : ${numQuestion} / ${nbQuestions}</div>
          <div class="game__question">${question}</div>
          <div class="game__choices">
            <div class="game__radio" id="radio">
              <input type="radio" id="choice" name="choice" value="${choices[0]}"/>
              <label for="choice">${choices[0]}</label>
            </div>
            <div class="game__radio" id="radio1">
              <input type="radio" id="choice1" name="choice" value="${choices[1]}" />
              <label for="choice1">${choices[1]}</label>
            </div>
            <div class="game__radio" id="radio2">
              <input type="radio" id="choice2" name="choice" value="${choices[2]}" />
              <label for="choice2">${choices[2]}</label>
            </div>
            <div class="game__radio" id="radio3">
              <input type="radio" id="choice3" name="choice" value="${choices[3]}" />
              <label for="choice3">${choices[3]}</label>
            </div>
          </div>
  `;
  divgGame.appendChild(divGameInfo);
  const radioChoices = document.getElementsByName("choice");
  radioChoices.forEach((el) => {
    el.addEventListener("click", (e) => {
      check(radioChoices, e, _id, category, numQuestion, nbQuestions);
    });
  });
};

const check = async (choices, el, id, category, numQuestion, nbQuestions) => {
  const answer = el.target.value;
  try {
    const res = await axios({
      method: "POST",
      url: `http://127.0.0.1:3000/api/quiz/${category}/${id}`,
      data: {
        answer,
      },
    });
    if (res.data.success === "success") {
      showResponse(choices, el, res.data.data);
      setTimeout(() => {
        if (res.data.data.nextQuestion === "finish") {
          showResult(res.data.data);
        } else {
          showNextQuestion(
            res.data.data.nextQuestion,
            numQuestion,
            nbQuestions
          );
        }
      }, 1500);
    }
  } catch (e) {
    document.getElementById(
      "game__error"
    ).innerHTML = `Error : ${e.response.data.message}`;
  }
};

const showResult = (data) => {
  const divgGame = document.getElementById("game");
  const gameInfo = document.getElementById("game__info");
  divgGame.removeChild(gameInfo);
  let dataSuccess = "fail";
  const statSuccess = Math.round((data.score / data.nbQuestions) * 100);
  const statFail = Math.round(
    ((data.nbQuestions - data.score) / data.nbQuestions) * 100
  );
  let result = "Raté";

  if (data.score >= data.nbQuestions / 2) {
    dataSuccess = "success";
    result = "Réussi";
  }
  const divGameEnd = document.createElement("div");
  divGameEnd.classList.add("game__end");
  divGameEnd.id = "game__end";

  divGameEnd.innerHTML = `<div class="game__success game__success--${dataSuccess}">
          <p>${result}</p>
      </div>
      <div class="game__score game__score--${dataSuccess}">
          <p>${statSuccess}%</p>
      </div>
      <div class="game__infoQuiz">
          <p>Reussi : ${statSuccess}%</p>
          <p>Raté : ${statFail}% </p>
      </div>`;
  divgGame.appendChild(divGameEnd);
};

const showNextQuestion = async (url, numQuestion, nbQuestions) => {
  let res = await axios({
    method: "GET",
    url,
  });
  if (res.data.success === "success") {
    format(res.data.data, numQuestion + 1, nbQuestions, true);
  }
};

const showResponse = (choices, el, data) => {
  const correctAnswer = data.correct_answer;
  const userAnswerId = el.target.id.replace("choice", "radio");
  const isCorrect = data.response;
  if (isCorrect) {
    document.getElementById(userAnswerId).classList.add("game__radio--success");
  } else {
    document.getElementById(userAnswerId).classList.add("game__radio--fail");
    choices.forEach((choice) => {
      if (choice.value === correctAnswer) {
        const id = choice.id.replace("choice", "radio");
        document.getElementById(id).classList.add("game__radio--success");
      }
    });
  }
};
