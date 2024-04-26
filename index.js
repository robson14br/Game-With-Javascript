const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');


let gameStarted = false; // Variável para controlar se o jogo começou ou não
let score = 0; // Variável para armazenar o número de pontos

const jump = (event) => {
    // Verifica se a tecla pressionada é a tecla de espaço (código 32)
    if (gameStarted && event.keyCode === 32) { // Verifica se o jogo já começou e se a tecla de espaço foi pressionada
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const loop = setInterval(() => {
    if (!gameStarted) return; // Se o jogo não começou, não executa o loop
    const pipePosition = pipe.offsetLeft;
    const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', '') );
    
     
    
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition <80) { 
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`
       
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`
        mario.src = 'midias/game-over.png';
        mario.style.width = '60px'
        mario.style.marginLeft = '65px'
        clearInterval(loop)
        resetButton.style.display = 'inline'; // Exibe o botão de reset quando o jogador perde
        resetButton.addEventListener('click', function() {
            location.reload();
        });

    } else if (pipePosition === 0) {
        score += 100 // Incrementa o número de pontos a cada cano pulado
        document.getElementById('score').innerText = `Pontuação: ${score}`;
    }
    
}, 10);



document.addEventListener('keydown', jump);

startButton.addEventListener('click', () => {
    gameStarted = true; // Define que o jogo começou quando o botão é clicado
    startButton.style.display = 'none'; // Esconde o botão de início
    gameLoop(); // Inicia o loop do jogo
});
