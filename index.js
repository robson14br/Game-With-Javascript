const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
let scoreDisplay = document.querySelector("#score");

let gameStarted = false; // Variável para controlar se o jogo começou ou não
let score = 0; // Variável para armazenar o número de pontos
let pipeScored = false; // Variável para controlar se o cano já foi pontuado

const jump = () => {
  if (gameStarted) { // Verifica se o jogo começou
    mario.classList.add("jump");
    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

const gameLoop = () => {
  const loop = setInterval(() => {
    if (!gameStarted) return; // Se o jogo não começou, não executa o loop
    
    const pipePosition = pipe.offsetLeft;
    const marioPosition = Number(window.getComputedStyle(mario).bottom.replace("px", ""));
    
    // Verifica colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
      mario.src = "midias/game-over.png";
      mario.style.width = "60px";
      mario.style.marginLeft = "65px";

      clearInterval(loop);
      resetButton.style.display = "inline"; // Exibe o botão de reset quando o jogador perde
      resetButton.addEventListener("click", () => {
        location.reload();
      });
    } 

    // Incrementa a pontuação se o cano passou do Mario
    if (pipePosition < 0 && !pipeScored) {
      score += 100;
      scoreDisplay.innerHTML = `Pontuação: ${score}`;
      pipeScored = true; // Marca o cano como já pontuado
    }

    // Reseta a variável pipeScored quando o cano sai da tela para que a pontuação possa ser incrementada novamente
    if (pipePosition >= window.innerWidth) {
      pipeScored = false;
    }

  }, 10);
};

// Evento para teclado
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) { // Verifica se a tecla de espaço foi pressionada
    jump();
  }
});

// Evento para toque na tela
document.addEventListener("touchstart", jump);

startButton.addEventListener("click", () => {
  gameStarted = true; // Define que o jogo começou quando o botão é clicado
  startButton.style.display = "none"; // Esconde o botão de início
  pipe.style.animation = "pipe-animation 1s infinite linear"; // Inicia a animação do cano
  gameLoop(); // Inicia o loop do jogo
});
