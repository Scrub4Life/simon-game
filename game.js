let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// starting the game on keypress
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // console.log(`userPattern: ${userClickedPattern}`);
  checkAnswer(userClickedPattern.length - 1);
});

// comparing the users answers to the gamepattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];

  const randomNumber = Math.floor(Math.random() * 4);
  //Assigning random number to desired color
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // use jQuery to animate a flash to the button
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  // play sound
  playSound(randomChosenColor);
  // upping level by 1 every time nextSequence() is called
  level++;
  //
  $("#level-title").text(`Level ${level}`);

  console.log(`gamePattern: ${gamePattern}`);
}

// play button sounds
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animating the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
