let table = $("table tr");


let player1 = {
  name: "",
  score: 0
};

let player2 = {
  name: "",
  score: 0
};

let player1Default = "Player 1";
let player2Default = "Player 2";

player1.name = prompt(
  "Player One: Input your name. Your assigned disc color will be Black",
  player1Default
);
let player1Color = "rgb(0,0,0)";

player2.name = prompt(
  "Player Two: Input your name. Your assigned disc color will be will be Red",
  player2Default
);
let player2Color = "rgb(255, 50, 50)";

let activePlayer = 1;
let activeName = player1 || player1Default;
let activeColor = player1Color;


$(document).ready(function() {
  $(".player1").text(`${player1.name} score: ${player1.score}`);
  $(".player2").text(`${player2.name} score: ${player2.score}`);

  $("h3").text(
    player1.name +
      ": it is your move to play, drop your black discs"
  );
  $(".board button").on("click", function() {
    let col = $(event.target)
      .closest("td")
      .index();
    let bottomOpen = reviewBottom(col);
    switchColor(bottomOpen, col, activeColor);


    if (
      horizontalWinCondition() ||
      verticalWinCondition() ||
      diagonalWinCondition()
    ) {
      gameEnd(activeName);
    }

    activePlayer = activePlayer * -1;

    if (activePlayer === 1) {
      activeName = player1.name;
      $("h3").text(
        activeName +
          ": it is your move to play, drop your black discs."
      );
      activeColor = player1Color;
    } else {
      activeName = player2.name;
      $("h3").text(
        activeName +
          ": it is your move to play, drop your red discs."
      );
      activeColor = player2Color;
    }
  });
});

let showWin = (rowNum, colNum) => {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
};


function switchColor(rowIndex, colIndex, color) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color", color);
}

function returnColor(rowIndex, colIndex) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color");
}

function reviewBottom(colIndex) {
  let showColor = returnColor(5, colIndex);
  for (let row = 5; row >= 0; row--) {
    showColor = returnColor(row, colIndex);
    if (showColor === "rgb(255, 255, 255)") {
      return row;
    }
  }
}

function reviewColorMatch(one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(255, 255, 255)" &&
    one !== undefined
  );
}


function horizontalWinCondition() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        reviewColorMatch(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        console.log("horizontal");
        showWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function verticalWinCondition() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        reviewColorMatch(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        console.log("vertical");
        showWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function diagonalWinCondition() {
  for (let col = 0; col < 5; col++) {
    for (let row = 0; row < 7; row++) {
      if (
        reviewColorMatch(
          returnColor(row, col),
          returnColor(row + 1, col + 1),
          returnColor(row + 2, col + 2),
          returnColor(row + 3, col + 3)
        )
      ) {
        console.log("diagonal");
        showWin(row, col);
        return true;
      } else if (
        reviewColorMatch(
          returnColor(row, col),
          returnColor(row - 1, col + 1),
          returnColor(row - 2, col + 2),
          returnColor(row - 3, col + 3)
        )
      ) {
        console.log("diagonal");
        showWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function gameEnd(winningPlayer) {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 7; row++) {
      $("h3").fadeOut("fast");
      $("h2").fadeOut("fast");
      $("h1")
        .text(winningPlayer + " has won! Click Reset Game to play again!")
        .css("fontSize", "25px")
        .css("color", "red");
    }
  }

  if (winningPlayer === player1.name) {
    player1.score = player1.score + 1;
  } else {
    player2.score = player2.score + 1;
  }
  $(".player1").text(`${player1.name} score: ${player1.score}`);
  $(".player2").text(`${player2.name} score: ${player2.score}`);
}

function resetBoard() {
  resetWhite();
  $("h3").fadeIn();
}

function resetWhite(rowIndex, colIndex) {
  return table
    .find("td")
    .find("button")
    .css("background-color", "rgb(255,255,255)");
}
