document.addEventListener('DOMContentLoaded', function() {
    const startMusicButton = document.getElementById('startMusicButton');
    const backgroundMusic = document.getElementById('backgroundMusic');

    startMusicButton.addEventListener('click', function() {
        backgroundMusic.play().catch(error => {
            console.error('Autoplay was prevented:', error);
        });
        startMusicButton.style.display = 'none';
    });

    const animals = ['Eagle', 'Zebra', 'Horse', 'Tiger', 'Shark', 'Rhino', 'Llama', 'Koala', 'Otter', 'Hyena', 'Whale', 'Gecko', 'Moose', 'Panda', 'Bison', 'Crane', 'Sloth', 'Viper', 'Zebra', 'Eagle'];
    const foods = ['Apple', 'Bread', 'Lemon', 'Onion', 'Mango', 'Peach', 'Olive', 'Cream', 'Chile', 'Curry', 'Salsa', 'Honey', 'Bacon', 'Rice', 'Nuts', 'Pasta', 'Beans', 'Tofu', 'Olive', 'Apple'];
    const objects = ['Chair', 'Table', 'Light', 'Phone', 'Book', 'Clock', 'Brush', 'Keypad', 'Pen', 'Lamp', 'Shelf', 'Frame', 'Door', 'Couch', 'Desk', 'Alarm', 'Shelf', 'Brush', 'Desk', 'Chair'];

    const categories = [animals, foods, objects];
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const selectedCategory = categories[randomCategoryIndex];
    const randomWordIndex = Math.floor(Math.random() * selectedCategory.length);
    const goal = selectedCategory[randomWordIndex].toUpperCase();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const letterButtonsContainer = document.querySelector('.letter-buttons');
    const wordDisplay = document.getElementById('word');
    const messageDisplay = document.getElementById('message');
    const livesDisplay = document.getElementById('lives');
    const hangmanImage = document.getElementById('hangmanImage');
    const categorydisplay = document.getElementById('category');



        let lives = 8;
    let guessedWord = "_ ".repeat(goal.length).trim();
    
    wordDisplay.textContent = guessedWord;
     

     
    if ( randomCategoryIndex===0) {
        categorydisplay.textContent = "animals";
    }
        if (randomCategoryIndex===1) {
        categorydisplay.textContent = "foods";
    }
     if (randomCategoryIndex===2) {
        categorydisplay.textContent = "objects";
    }
    


    
     
    

    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleLetterClick(letter, button));
        letterButtonsContainer.appendChild(button);
    });



    function handleLetterClick(letter, button) {
        button.disabled = true;
        if (goal.includes(letter)) {
            messageDisplay.textContent = `Good guess! ${letter} is in the word.`;
            updateGuessedWord(letter);
        } else {
            lives--;
            livesDisplay.textContent = `Lives: ${lives}`;
            updateHangmanImage();
            messageDisplay.textContent = `Sorry, ${letter} is not in the word.`;
            
            if (lives === 0) {
                messageDisplay.textContent = "Game over! You've run out of lives.";
                disableAllButtons();
            }
        }

        if (!guessedWord.includes("_")) {
            messageDisplay.textContent = "Congratulations! You've guessed the word.";
            disableAllButtons();
        }
    }

    function updateGuessedWord(letter) {
        let newGuessedWord = "";
        for (let i = 0; i < goal.length; i++) {
            if (goal[i] === letter) {
                newGuessedWord += letter + " ";
            } else {
                newGuessedWord += guessedWord[i * 2] + " ";
            }
        }
        guessedWord = newGuessedWord.trim();
        wordDisplay.textContent = guessedWord;
    }

    function updateHangmanImage() {
        hangmanImage.src = `${8 - lives}.png`; 
    }

    function disableAllButtons() {
        const buttons = letterButtonsContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
    }
    
    function reloadGame() {
        window.location.reload();
    }

    document.getElementById('reloadButton').addEventListener('click', reloadGame);

    backgroundMusic.play();
});

   
  