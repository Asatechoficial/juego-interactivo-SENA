document.addEventListener('DOMContentLoaded', () => {
    const words = [
    { word: 'ciberseguridad', hint: 'Disciplina que protege sistemas, redes y datos frente a ataques digitales.' },
    { word: 'confidencialidad', hint: 'Principio que asegura que solo personas autorizadas puedan ver la información.' },
    { word: 'integridad', hint: 'Garantiza que los datos no sean alterados sin autorización.' },
    { word: 'disponibilidad', hint: 'Asegura que la información esté accesible cuando se necesite.' },
    { word: 'riesgos', hint: 'Amenazas potenciales que pueden afectar la seguridad o funcionamiento de un sistema.' },
    { word: 'cifrado', hint: 'Técnica que transforma la información para que no pueda ser leída sin una clave.' },
    { word: 'vulnerabilidades', hint: 'Debilidades en un sistema que pueden ser explotadas por atacantes.' },
    { word: 'resiliencia', hint: 'Capacidad de un sistema para recuperarse tras un ciberataque.' },
    { word: 'informacion', hint: 'Recurso valioso que debe protegerse de accesos y alteraciones no autorizadas.' },
    { word: 'protocolos', hint: 'Conjunto de reglas o procedimientos para actuar ante incidentes de seguridad.' },
    { word: 'acceso', hint: 'Permiso o capacidad de entrar a un sistema o consultar datos.' },
    { word: 'capacitacion', hint: 'Formación que recibe el personal para aplicar buenas prácticas de seguridad.' }
];


    let selectedWord = '';
    let currentGuess = [];
    let remainingAttempts = 6; // Aumentamos los intentos para hacer el juego más sencillo
    const wordContainer = document.getElementById('word-container');
    const hintElement = document.getElementById('hint');
    const keyboard = document.getElementById('keyboard');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    function startGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex].word;
        hintElement.innerHTML = `Pista: ${words[randomIndex].hint}`; // Usar innerHTML para que reconozca los tags HTML si es necesario
        currentGuess = Array(selectedWord.length).fill('');
        remainingAttempts = 8;
        messageElement.textContent = '';
        restartButton.style.display = 'none';
        wordContainer.innerHTML = '';
        keyboard.innerHTML = '';

        // Crear los espacios para las letras
        for (let i = 0; i < selectedWord.length; i++) {
            const letterBox = document.createElement('div');
            letterBox.classList.add('letter-box');
            wordContainer.appendChild(letterBox);
        }

        // Crear el teclado
        'abcdefghijklmnñopqrstuvwxyz'.split('').forEach(letter => {
            const key = document.createElement('button');
            key.textContent = letter;
            key.classList.add('key');
            key.addEventListener('click', () => handleGuess(letter));
            keyboard.appendChild(key);
        });
    }

    function handleGuess(letter) {
        if (remainingAttempts === 0) return;

        let found = false;
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                currentGuess[i] = letter;
                wordContainer.children[i].textContent = letter;
                found = true;
            }
        }

        if (!found) {
            remainingAttempts--;
        }

        // Deshabilitar la tecla
        const keyElement = [...keyboard.children].find(key => key.textContent === letter);
        if (keyElement) {
            keyElement.classList.add('disabled');
            keyElement.removeEventListener('click', handleGuess);
        }

        checkGameState();
    }

    function checkGameState() {
        const guessString = currentGuess.join('');

        if (guessString === selectedWord) {
            messageElement.textContent = '¡Felicidades! ¡Has adivinado la palabra!';
            messageElement.style.color = '#2ecc71';
            endGame();
        } else if (remainingAttempts === 0) {
            messageElement.textContent = `¡Juego terminado! La palabra era: "${selectedWord}"`;
            messageElement.style.color = '#e74c3c';
            endGame();
        }
    }

    function endGame() {
        // Deshabilitar todas las teclas
        [...keyboard.children].forEach(key => {
            key.classList.add('disabled');
            key.removeEventListener('click', handleGuess);
        });
        restartButton.style.display = 'block';
    }

    restartButton.addEventListener('click', startGame);

    startGame();
});