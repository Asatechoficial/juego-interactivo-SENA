document.addEventListener('DOMContentLoaded', () => {
    const words = [
        { word: 'ciberseguridad', hint: 'La planificación de la información según este criterio es esencial para la protección de datos sensibles.' },
        { word: 'confidencialidad', hint: 'La planificación de la información protege este aspecto de los datos.' },
        { word: 'integridad', hint: 'La planificación de la información protege este aspecto de los datos.' },
        { word: 'disponibilidad', hint: 'La planificación de la información protege este aspecto de los datos.' },
        { word: 'riesgos', hint: 'La planificación de la información implica identificar y evaluar estos elementos potenciales.' },
        { word: 'cifrado', hint: 'Una de las medidas de seguridad adecuadas es el... de datos sensibles.' },
        { word: 'vulnerabilidades', hint: 'La planificación implica considerar las posibles... en los sistemas y procesos existentes.' },
        { word: 'resiliencia', hint: 'La integración de criterios de ciberseguridad fortalece la... ante amenazas cibernéticas.' },
        { word: 'informacion', hint: 'La planificación de la... según criterios de ciberseguridad es un proceso fundamental.' },
        { word: 'protocolos', hint: 'La planificación también implica el diseño de... de respuesta ante incidentes.' },
        { word: 'acceso', hint: 'La implementación de controles de... sólidos es una medida de protección.' },
        { word: 'capacitacion', hint: 'Una medida de protección es la... del personal en prácticas de seguridad.' }
    ];

    let selectedWord = '';
    let guessedLetters = new Set(); // Usamos un Set para un seguimiento más eficiente
    let remainingAttempts = 8;
    const wordContainer = document.getElementById('word-container');
    const hintElement = document.getElementById('hint');
    const keyboard = document.getElementById('keyboard');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    function startGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex].word;
        hintElement.textContent = `Pista: ${words[randomIndex].hint}`;
        guessedLetters.clear();
        remainingAttempts = 8;
        messageElement.textContent = '';
        messageElement.style.color = '#ecf0f1';
        restartButton.style.display = 'none';
        wordContainer.innerHTML = '';
        keyboard.innerHTML = '';

        // Crear los espacios para las letras
        for (let i = 0; i < selectedWord.length; i++) {
            const letterBox = document.createElement('div');
            letterBox.classList.add('letter-box');
            wordContainer.appendChild(letterBox);
        }

        // Crear el teclado virtual
        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
            const key = document.createElement('button');
            key.textContent = letter;
            key.classList.add('key');
            key.addEventListener('click', () => handleGuess(letter));
            keyboard.appendChild(key);
        });
    }

    function handleGuess(letter) {
        // Normaliza la letra a minúscula
        letter = letter.toLowerCase();
        
        // Evita procesar la misma letra más de una vez
        if (guessedLetters.has(letter) || remainingAttempts === 0) {
            return;
        }

        guessedLetters.add(letter);

        let found = false;
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                wordContainer.children[i].textContent = letter;
                found = true;
            }
        }

        if (!found) {
            remainingAttempts--;
        }
        
        // Deshabilitar la tecla virtual
        const keyElement = [...keyboard.children].find(key => key.textContent === letter);
        if (keyElement) {
            keyElement.classList.add('disabled');
        }

        checkGameState();
    }

    function checkGameState() {
        const wordGuessed = [...wordContainer.children].every(box => box.textContent !== '');

        if (wordGuessed) {
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
        // Deshabilitar todas las teclas virtuales
        [...keyboard.children].forEach(key => {
            key.classList.add('disabled');
            key.removeEventListener('click', () => {});
        });
        restartButton.style.display = 'block';
        
        // Remover el event listener del teclado físico al terminar
        document.removeEventListener('keydown', handleKeyPress);
    }
    
    function handleKeyPress(event) {
        const letter = event.key.toLowerCase();
        // Verificar si la tecla es una letra del alfabeto
        if (letter.length === 1 && letter.match(/[a-z]/)) {
            handleGuess(letter);
        }
    }

    restartButton.addEventListener('click', startGame);
    
    // Agregamos el event listener para el teclado físico
    document.addEventListener('keydown', handleKeyPress);

    startGame();
});
