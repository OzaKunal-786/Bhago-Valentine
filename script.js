// --- Configuration Object ---
const config = {
    // Basic Information
    valentineName: "Bhago",                    // Your Valentine's name
    pageTitle: "Will You Be My Valentine? 💝", // Browser tab title

    // Floating Background Elements
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],  // Heart emojis in background
        bears: ['🧸', '🐻']                       // Bear emojis in background
    },

    // Questions and Buttons - Now structured as an array for easier iteration
    questions: [
        {
            type: 'yesNo',
            text: "Do you like me?",                   // First question
            yesBtn: "Yes",                             // Yes button text
            noBtn: "No",                               // No button text
            secretAnswer: "I don't like you, I love you! ❤️", // Hidden message for 'No'
            bouncyNo: true, // This question has a special bouncy 'No' button
            uncatchableNo: true, // Makes the 'No' button jump all over the screen
            secretNoThreshold: 8 // How many 'No' clicks/hovers until secret answer
        },
        {
            type: 'loveMeter',
            text: "How much do you love me?",          // Second question
            startText: "This much!",                   // Text before percentage
            nextBtn: "Next ❤️",                         // Next button text
            loveThreshold: 150 // Percentage needed to show the next button
        },
        {
            type: 'animatedChoice', // NEW QUESTION
            text: "Would you rather have a super-romantic dinner under the stars, or an epic pillow fight followed by cuddles?",
            options: [
                { text: "Dinner Under Stars ✨", visual: "🥂🌌💖", response: "Oh, how dreamy! I'll bring the champagne and bug spray! 😉" },
                { text: "Epic Pillow Fight! ☁️", visual: "💥🤣🤗", response: "My kind of fight! Prepare to be covered in feathers and snuggles! (And maybe a few gentle boops!)" }
            ],
            visualDuration: 2500, // how long the visual animation stays
            nextBtn: "My kind of person!"
        },
        {
            type: 'hiddenTextNo', // NEW QUESTION TYPE
            text: "Can you *really* say NO to being my Valentine? 😉",
            yesBtn: "Yes!",
            noBtn: "NO!",
            hiddenText: "No, I love you! ❤️",
            hiddenTextSize: "0.1em", // Very small
            hiddenTextOpacity: "0.08", // Very faint
            hiddenTextColor: "white", // Color of the hidden text
            noAttemptMessage: "That's not the right 'No'! Keep looking... 🤔",
            successMessage: "Aha! You found it! I knew you did! 🥰"
        },
        {
            type: 'choice', // Humorous Choice Question
            text: "Which superpower would you rather have for Valentine's Day?",
            options: [
                { text: "Instantly make anyone laugh uncontrollably (especially me!)", response: "Oh, you'd be my favorite comedian! And it's true, laughter is the best medicine... especially with you. 😂" },
                { text: "Always find the perfect parking spot (for our dates!)", response: "A true hero! Think of all the stress-free adventures we'd have. My parking struggles would be a thing of the past! 🙏" }
            ],
            nextBtn: "Smart choice!"
        },
        { // NEW QUESTION: Transforming Choices
            type: 'transformingChoice',
            text: `Alright, ${config.valentineName}, deep down, how would you describe me?`,
            options: [
                { initial: "Ugly", transformed: "Handsome! 🥰", response: "Aw, you're just saying what you truly feel! You're too kind!" },
                { initial: "Annoying", transformed: "Charming! ✨", response: "Haha, I knew you loved my quirks! And now I know you find me charming!" },
                { initial: "Irritating", transformed: "Captivating! 😉", response: "Irritating? Never! Captivating? Absolutely! Thanks for saying it!" },
                { initial: "Clueless", transformed: "Brilliant! 💡", response: "Oh, you thought I was clueless? Plot twist: I'm brilliant! Thanks for noticing!" }
            ],
            nextBtn: "You're too sweet! 😍"
        },
        {
            type: 'decodeCipher', // NEW QUESTION
            text: "I've sent you a secret love note, but it's encoded! Only your clever mind can unlock its true meaning. The key is in my heart...",
            cipherText: "D FDWFKH HDBA LRYH! L ZDV RSHQLQJ PX FKRFRZHEVLWH.", // Shift +3 from original "A SWEETHEART LOVE! I WAS OPENING MY CHOCOWEBSITE."
            correctAnswer: "A SWEETHEART LOVE! I WAS OPENING MY CHOCOWEBSITE.",
            hint: "Each letter is actually 3 letters *before* it in the alphabet!", // This is the Caesar cipher, shift by -3 to decode
            successMessage: "You cracked it! My brilliant, clever Valentine! 🥰",
            failMessage: "Hmm, not quite! Keep trying, my clever one! (Or ask for a hint if you dare! 😉)"
        },
        {
            type: 'yesNo',
            text: "Am I cute when I'm grumpy?",
            yesBtn: "Always!",
            noBtn: "Be honest...",
            yesResponse: "Aww, you get me! Even my grumpy face is loveable to you. 🥰",
            noResponse: "Hey! Even my grumpy face has a certain charm... right? 😉"
        },
        {
            type: 'miniGame', // NEW QUESTION
            text: `Quick, ${config.valentineName}! Catch 5 flying kisses in 10 seconds! My heart depends on it!`,
            targetCount: 5,
            timeLimit: 10, // seconds
            emoji: '😘',
            successMessage: "You caught them all! My heart is yours! 💖",
            failMessage: "Oh no! You missed some! My kisses are too fast for you... Try again? 😉"
        },
        {
            type: 'finalYesNo', // Special type for the final question
            text: "Will you be my Valentine...?",
            yesBtn: "Yes!",
            noBtn: "No"
        }
    ],

    // Love Meter Messages
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows above 5000%
        high: "To infinity and beyond! 🚀💝",              // Shows above 1000%
        normal: "And beyond! 🥰"                           // Shows above 100%
    },

    // Final Celebration
    celebration: {
        title: "Yay! I'm the luckiest person...",     // Celebration title
        message: "Now come get your gift...",          // Celebration message
        emojis: "🎁💖🤗💝💋❤️💕"                        // Celebration emojis
    },

    // Website Colors
    colors: {
        backgroundStart: "#ffafbd",      // Background gradient start
        backgroundEnd: "#ffc3a0",        // Background gradient end
        buttonBackground: "#ff6b6b",     // Button color
        buttonHover: "#ff8787",          // Button hover color
        textColor: "#ff4757"            // Text color
    },

    // Animation Settings
    animations: {
        floatDuration: "15s",           // How long hearts float (10-20s)
        floatDistance: "50px",          // Sideways movement (30-70px)
        bounceSpeed: "0.5s",            // Bounce animation speed (0.3-0.7s)
        heartExplosionSize: 1.5         // Final heart explosion size (1.2-2.0)
    },

    // Music Settings
    music: {
        enabled: true, // Music feature is enabled
        autoplay: true, // Try to autoplay (note: some browsers may block this)
        musicUrl: "YOUR_CLOUDINARY_URL_HERE", // Paste your music URL here
        startText: "🎵 Play Music", // Button text to start music
        stopText: "🔇 Stop Music", // Button text to stop music
        volume: 0.5 // Volume level (0.0 to 1.0)
    }
};

// --- Global Variables and DOM Elements ---
const app = document.getElementById('app');
const body = document.body;
const documentTitle = document.querySelector('title');
let noButtonClickCount = 0; // To track how many times the 'No' button is clicked for Q1
let lovePercentage = 0; // To track love percentage for Q2
let currentQuestionIndex = 0; // To keep track of which question we are on

// --- Music Game Variables ---
let score = 0;
let gameTimer = null;
let kissGenerationInterval = null;


// --- Apply Configuration ---

// 1. Set the page title
documentTitle.textContent = config.pageTitle;

// 2. Apply CSS variables from config for dynamic styling
body.style.setProperty('--background-start', config.colors.backgroundStart);
body.style.setProperty('--background-end', config.colors.backgroundEnd);
body.style.setProperty('--button-background', config.colors.buttonBackground);
body.style.setProperty('--button-hover', config.colors.buttonHover);
body.style.setProperty('--text-color', config.colors.textColor);
body.style.setProperty('--bounce-speed', config.animations.bounceSpeed); // For love button


// --- Music Player Setup ---
let audio;
let musicButton;

function setupMusicPlayer() {
    if (!config.music.enabled) return;

    audio = new Audio(config.music.musicUrl);
    audio.loop = true;
    audio.volume = config.music.volume;

    musicButton = document.createElement('button');
    musicButton.id = 'music-button';
    musicButton.innerHTML = config.music.startText; // Initial text
    body.appendChild(musicButton);

    let isPlaying = false;

    musicButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicButton.innerHTML = config.music.startText;
        } else {
            audio.play().catch(e => console.error("Music autoplay blocked or failed:", e));
            musicButton.innerHTML = config.music.stopText;
        }
        isPlaying = !isPlaying;
    });

    // Attempt autoplay if enabled and allowed by browser
    if (config.music.autoplay) {
        audio.play().then(() => {
            isPlaying = true;
            musicButton.innerHTML = config.music.stopText;
        }).catch(e => {
            console.warn("Autoplay was blocked. User will need to click the music button.", e);
            isPlaying = false; // Ensure button state is correct if blocked
        });
    }
}

// --- Floating Elements Setup ---
function createFloatingEmoji() {
    const emojiList = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];

    const span = document.createElement('span');
    span.classList.add('floating-emoji');
    span.textContent = emoji;

    // Random starting position (x-axis)
    span.style.left = `${Math.random() * 100}vw`;

    // Apply animation properties from config
    span.style.setProperty('--float-duration', config.animations.floatDuration);
    // Randomize sideways movement within range
    const floatXValue = (Math.random() - 0.5) * 2 * parseInt(config.animations.floatDistance) + 'px';
    span.style.setProperty('--float-x', floatXValue);

    body.appendChild(span);

    // Remove the emoji after its animation finishes to prevent clutter
    span.addEventListener('animationend', () => {
        span.remove();
    });
}

function startFloatingEmojis() {
    emojiInterval = setInterval(createFloatingEmoji, 700); // Store interval ID
}

// --- Core UI Rendering Functions ---

// Function to clear the app container
function clearApp() {
    app.innerHTML = '';
    // Reset app positioning for 'No' button when clearing
    app.style.position = 'relative';
    app.style.left = 'auto';
    app.style.top = 'auto';
    // Clear any inline styles left by bouncy buttons (this is crucial!)
    const oldNoBtn = document.getElementById('noBtn');
    if (oldNoBtn) {
        oldNoBtn.style.position = '';
        oldNoBtn.style.left = '';
        oldNoBtn.style.top = '';
        oldNoBtn.style.transform = '';
        oldNoBtn.style.transition = '';
        oldNoBtn.style.width = '';
        oldNoBtn.style.minWidth = '';
        oldNoBtn.style.padding = '';
        oldNoBtn.style.fontSize = '';
        oldNoBtn.style.zIndex = '';
        oldNoBtn.style.opacity = '';
        oldNoBtn.style.display = ''; // Clear display none potentially set
    }
    // Clear any game items from mini-game
    document.querySelectorAll('.moving-kiss').forEach(kiss => kiss.remove());
    // Stop any running timers for the mini-game
    clearInterval(kissGenerationInterval);
    clearTimeout(gameTimer);
}

function renderQuestion(index) {
    clearApp();
    currentQuestionIndex = index;
    const questionData = config.questions[index];

    // Adjust greeting based on question type for variety
    const h1 = document.createElement('h1');
    if (questionData.type === 'loveMeter' || questionData.type === 'choice' || questionData.type === 'hiddenTextNo' || questionData.type === 'transformingChoice' || questionData.type === 'animatedChoice' || questionData.type === 'decodeCipher' || questionData.type === 'miniGame') {
        h1.textContent = `${config.valentineName}! ❤️`;
    } else {
        h1.textContent = `Hey ${config.valentineName}!`;
    }

    const p = document.createElement('p');
    p.textContent = questionData.text;

    app.appendChild(h1);
    app.appendChild(p);

    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    switch (questionData.type) {
        case 'yesNo':
            renderYesNoQuestion(questionData, btnContainer);
            break;
        case 'loveMeter':
            renderLoveMeterQuestion(questionData, btnContainer);
            break;
        case 'animatedChoice': // NEW
            renderAnimatedChoiceQuestion(questionData, btnContainer);
            break;
        case 'hiddenTextNo':
            renderHiddenTextNoQuestion(questionData, btnContainer);
            break;
        case 'choice':
            renderChoiceQuestion(questionData, btnContainer);
            break;
        case 'transformingChoice':
            renderTransformingChoiceQuestion(questionData, btnContainer);
            break;
        case 'decodeCipher': // NEW
            renderDecodeCipherQuestion(questionData, btnContainer);
            break;
        case 'miniGame': // NEW
            renderMiniGameQuestion(questionData, btnContainer);
            break;
        case 'finalYesNo':
            renderFinalYesNoQuestion(questionData, btnContainer);
            break;
    }

    app.appendChild(btnContainer);
}

function renderYesNoQuestion(questionData, btnContainer) {
    const yesBtn = document.createElement('button');
    yesBtn.textContent = questionData.yesBtn;
    yesBtn.id = 'yesBtn';
    yesBtn.addEventListener('click', () => {
        if (questionData.yesResponse) {
            displayTemporaryMessage(questionData.yesResponse, renderNextQuestion);
        } else {
            renderNextQuestion();
        }
    });

    const noBtn = document.createElement('button');
    noBtn.textContent = questionData.noBtn;
    noBtn.id = 'noBtn';

    if (questionData.bouncyNo && questionData.uncatchableNo) { // Specific for the first question's uncatchable 'No'
        noBtn.style.position = 'fixed'; // Position relative to viewport for full-screen jumps
        noBtn.style.width = 'fit-content';
        noBtn.style.minWidth = '100px';
        noBtn.style.padding = '10px 20px';
        noBtn.style.fontSize = '1em';
        noBtn.style.zIndex = '100';

        noBtn.addEventListener('mouseover', handleNoButtonHover); // Mouseover for desktop
        noBtn.addEventListener('click', handleNoButtonClick); // Click for mobile/accessibility
        noBtn.addEventListener('touchstart', handleNoButtonHover); // Touch for mobile

        // Initial positioning somewhere not too obvious but within view
        setTimeout(() => { // Give it a moment to render to get its true size
            const btnRect = noBtn.getBoundingClientRect();
            noBtn.style.left = `${Math.random() * (window.innerWidth - btnRect.width - 40) + 20}px`;
            noBtn.style.top = `${Math.random() * (window.innerHeight - btnRect.height - 40) + 20}px`;
        }, 50);

    } else if (questionData.bouncyNo) { // For other bouncy 'No' buttons (like final question)
        noBtn.style.position = 'absolute'; // Position relative to the #app container
        noBtn.style.width = 'fit-content';
        noBtn.style.minWidth = '100px';
        noBtn.style.padding = '10px 20px';
        noBtn.style.fontSize = '1em';
        noBtn.style.zIndex = '100';

        noBtn.addEventListener('mouseover', handleNoButtonHover);
        noBtn.addEventListener('click', handleNoButtonClick);

        setTimeout(() => { // Initial positioning inside app container
            const appRect = app.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();
            noBtn.style.left = `${(appRect.width - btnRect.width) / 2}px`;
            noBtn.style.top = `${appRect.height - btnRect.height - 20}px`;
        }, 50);

    } else { // For regular Yes/No questions (like "Am I cute...")
        noBtn.addEventListener('click', () => {
            if (questionData.noResponse) {
                displayTemporaryMessage(questionData.noResponse, renderNextQuestion);
            } else {
                 renderNextQuestion();
            }
        });
    }

    btnContainer.appendChild(yesBtn);
    btnContainer.appendChild(noBtn);
}

function renderLoveMeterQuestion(questionData, btnContainer) {
    lovePercentage = 0; // Reset love percentage

    const p = document.getElementById('app').querySelector('p'); // Update existing p tag
    p.innerHTML = `${questionData.startText} <span id="love-percentage">0%</span>`;

    const loveBtn = document.createElement('button');
    loveBtn.textContent = "Tap to increase love!";
    loveBtn.id = 'loveBtn';
    loveBtn.style.minWidth = '200px';
    loveBtn.addEventListener('click', increaseLove);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = questionData.nextBtn;
    nextBtn.id = 'nextBtn';
    nextBtn.style.display = 'none'; // Hide until enough love
    nextBtn.addEventListener('click', renderNextQuestion);

    btnContainer.appendChild(loveBtn);
    btnContainer.appendChild(nextBtn);
}

// NEW FUNCTION: Renders an animated choice question
function renderAnimatedChoiceQuestion(questionData, btnContainer) {
    const choicesMade = []; // To ensure only one choice is made
    questionData.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.textContent = option.text;
        optionBtn.addEventListener('click', () => {
            if (choicesMade.length > 0) return; // Prevent multiple clicks

            choicesMade.push(true); // Mark a choice as made

            // Remove all other buttons immediately
            btnContainer.innerHTML = '';

            // Display the animated visual
            const visualDisplay = document.createElement('div');
            visualDisplay.textContent = option.visual;
            visualDisplay.style.fontSize = '3em';
            visualDisplay.style.marginTop = '20px';
            app.appendChild(visualDisplay);

            // After a short delay, display the response message
            setTimeout(() => {
                displayTemporaryMessage(option.response, renderNextQuestion);
            }, questionData.visualDuration);
        });
        btnContainer.appendChild(optionBtn);
    });
}


function renderChoiceQuestion(questionData, btnContainer) {
    questionData.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.textContent = option.text;
        optionBtn.addEventListener('click', () => {
            displayTemporaryMessage(option.response, renderNextQuestion);
        });
        btnContainer.appendChild(optionBtn);
    });

    // Add a general "Next" button if available in config
    if (questionData.nextBtn) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = questionData.nextBtn;
        nextBtn.style.marginTop = '15px'; // Give some space
        nextBtn.addEventListener('click', renderNextQuestion);
        btnContainer.appendChild(nextBtn);
    }
}

// Renders the question with a hidden "No, I love you!" text
function renderHiddenTextNoQuestion(questionData, btnContainer) {
    const yesBtn = document.createElement('button');
    yesBtn.textContent = questionData.yesBtn;
    yesBtn.id = 'yesBtn';
    yesBtn.addEventListener('click', () => {
        displayTemporaryMessage(`I knew you couldn't! 😉 ${config.valentineName}, you're the best!`, renderNextQuestion);
    });

    const noBtn = document.createElement('button');
    noBtn.textContent = questionData.noBtn;
    noBtn.id = 'noBtn';
    noBtn.style.position = 'relative'; // Important for positioning hidden span inside

    const hiddenSpan = document.createElement('span');
    hiddenSpan.textContent = questionData.hiddenText;
    hiddenSpan.classList.add('hidden-no-love'); // For styling in CSS
    // Apply dynamic styling from config for maximum stealth
    hiddenSpan.style.fontSize = questionData.hiddenTextSize;
    hiddenSpan.style.opacity = questionData.hiddenTextOpacity;
    hiddenSpan.style.color = questionData.hiddenTextColor;
    hiddenSpan.style.position = 'absolute';
    hiddenSpan.style.bottom = '5%'; // Position it subtly inside the button
    hiddenSpan.style.left = '50%';
    hiddenSpan.style.transform = 'translateX(-50%)';
    hiddenSpan.style.width = 'fit-content';
    hiddenSpan.style.whiteSpace = 'nowrap'; // Keep text on one line
    hiddenSpan.style.pointerEvents = 'auto'; // Make it clickable (override button's pointer-events)
    hiddenSpan.style.cursor = 'pointer'; // Show pointer on hover

    hiddenSpan.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the parent button's click from firing
        displayTemporaryMessage(questionData.successMessage, renderNextQuestion);
    });

    // If they click the main part of the NO button, give a hint
    noBtn.addEventListener('click', () => {
        displayTemporaryMessage(questionData.noAttemptMessage, () => renderQuestion(currentQuestionIndex));
    });


    noBtn.appendChild(hiddenSpan); // Put the hidden text inside the NO button
    btnContainer.appendChild(yesBtn);
    btnContainer.appendChild(noBtn);
}

// Renders the transforming choice question
function renderTransformingChoiceQuestion(questionData, btnContainer) {
    const buttons = [];
    questionData.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.textContent = option.initial;
        optionBtn.dataset.initialText = option.initial; // Store initial text
        optionBtn.dataset.transformedText = option.transformed; // Store transformed text
        optionBtn.dataset.responseText = option.response; // Store response text

        optionBtn.addEventListener('click', (event) => {
            event.target.textContent = event.target.dataset.transformedText; // Change button text
            event.target.style.backgroundColor = 'var(--text-color)'; // Highlight it
            event.target.style.transform = 'scale(1.05) translateY(-5px)'; // Little bounce
            event.target.style.transition = 'all 0.3s ease-out'; // Smooth transition
            event.target.style.cursor = 'default';

            displayTemporaryMessage(event.target.dataset.responseText, () => {
                // After the response, show a "Next" button
                clearApp(); // Clear the message
                const h1 = document.createElement('h1');
                h1.textContent = `${config.valentineName}! ❤️`;
                app.appendChild(h1);
                const nextMessage = document.createElement('p');
                nextMessage.innerHTML = questionData.nextBtn; // Use innerHTML for potential emojis
                nextMessage.style.fontSize = '1.5em';
                app.appendChild(nextMessage);

                const nextQuestionBtn = document.createElement('button');
                nextQuestionBtn.textContent = 'Continue ❤️';
                nextQuestionBtn.addEventListener('click', renderNextQuestion);
                app.appendChild(nextQuestionBtn);
            });

            // Disable all other buttons and remove their event listeners
            buttons.forEach(btn => {
                if (btn !== event.target) {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                    btn.removeEventListener('click', btn.eventListenerReference); // Remove specific listener
                }
            });
        });
        optionBtn.eventListenerReference = optionBtn.addEventListener; // Store reference to remove later
        buttons.push(optionBtn);
        btnContainer.appendChild(optionBtn);
    });
}

// NEW FUNCTION: Renders the decode cipher question
function renderDecodeCipherQuestion(questionData, btnContainer) {
    const cipherDisplay = document.createElement('p');
    cipherDisplay.innerHTML = `Cipher: <code>${questionData.cipherText}</code>`;
    cipherDisplay.style.fontFamily = 'monospace';
    cipherDisplay.style.fontSize = '1.3em';
    cipherDisplay.style.fontWeight = 'bold';
    app.appendChild(cipherDisplay);

    const input = document.createElement('input');
    input.id = 'cipher-input';
    input.type = 'text';
    input.placeholder = 'Type your decoded message here...';
    app.appendChild(input);

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'Decode!';
    btnContainer.appendChild(checkBtn);

    const hintBtn = document.createElement('button');
    hintBtn.textContent = 'Need a hint?';
    hintBtn.style.marginTop = '10px';
    btnContainer.appendChild(hintBtn);

    checkBtn.addEventListener('click', () => {
        const userAnswer = input.value.toUpperCase().trim(); // Convert to uppercase for comparison
        if (userAnswer === questionData.correctAnswer.toUpperCase().trim()) {
            displayTemporaryMessage(questionData.successMessage, renderNextQuestion);
        } else {
            displayTemporaryMessage(questionData.failMessage, () => renderQuestion(currentQuestionIndex));
        }
    });

    hintBtn.addEventListener('click', () => {
        displayTemporaryMessage(questionData.hint, () => renderQuestion(currentQuestionIndex)); // Show hint, then re-render question
    });
}

// NEW FUNCTION: Renders the mini-game question
function renderMiniGameQuestion(questionData, btnContainer) {
    score = 0; // Reset score for the new game
    const gameArea = document.createElement('div');
    gameArea.id = 'mini-game-area';
    gameArea.style.position = 'relative';
    gameArea.style.width = 'calc(100% - 20px)'; // Adjust for padding
    gameArea.style.height = '200px'; // Fixed height for game area
    gameArea.style.border = '2px dashed var(--text-color)';
    gameArea.style.borderRadius = '10px';
    gameArea.style.marginBottom = '20px';
    gameArea.style.overflow = 'hidden';
    gameArea.style.backgroundColor = 'rgba(255,255,255,0.7)'; // Slightly transparent background for game area
    app.insertBefore(gameArea, btnContainer); // Insert game area above buttons

    const scoreDisplay = document.createElement('p');
    scoreDisplay.id = 'game-score';
    scoreDisplay.textContent = `Caught: ${score}/${questionData.targetCount}`;
    scoreDisplay.style.marginBottom = '10px';
    app.insertBefore(scoreDisplay, gameArea);

    const timerDisplay = document.createElement('p');
    timerDisplay.id = 'game-timer';
    timerDisplay.textContent = `Time: ${questionData.timeLimit}s`;
    timerDisplay.style.marginBottom = '10px';
    app.insertBefore(timerDisplay, scoreDisplay);

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start Game!';
    btnContainer.appendChild(startBtn);

    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        score = 0;
        scoreDisplay.textContent = `Caught: ${score}/${questionData.targetCount}`;
        gameArea.innerHTML = ''; // Clear any previous kisses

        let timeLeft = questionData.timeLimit;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        kissGenerationInterval = setInterval(() => {
            createMovingKiss(gameArea, questionData.emoji);
        }, 500); // Generate a kiss every 0.5 seconds

        gameTimer = setTimeout(() => {
            clearInterval(kissGenerationInterval);
            const finalScore = score;
            const message = finalScore >= questionData.targetCount ? questionData.successMessage : questionData.failMessage;
            displayTemporaryMessage(message, renderNextQuestion);
        }, questionData.timeLimit * 1000);

        // Update timer every second
        let countdownInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    });
}

function createMovingKiss(gameArea, emoji) {
    const kiss = document.createElement('span');
    kiss.classList.add('moving-kiss');
    kiss.textContent = emoji;

    // Random starting position within the game area
    const startX = Math.random() * (gameArea.offsetWidth - 50); // Adjust for emoji size
    const startY = gameArea.offsetHeight - 30; // Start from bottom of game area
    kiss.style.left = `${startX}px`;
    kiss.style.top = `${startY}px`;

    // Random end position
    const endX = Math.random() * (gameArea.offsetWidth - 50);
    const endY = -50; // Off the top of the game area

    kiss.style.setProperty('--move-x', `${endX - startX}px`);
    kiss.style.setProperty('--move-y', `${endY - startY}px`);

    kiss.addEventListener('click', () => {
        score++;
        document.getElementById('game-score').textContent = `Caught: ${score}/${config.questions[currentQuestionIndex].targetCount}`;
        kiss.remove(); // Remove kiss when caught
    });

    gameArea.appendChild(kiss);

    // Remove kiss after its animation if not caught
    kiss.addEventListener('animationend', () => {
        kiss.remove();
    });
}


function renderFinalYesNoQuestion(questionData, btnContainer) {
    const yesBtn = document.createElement('button');
    yesBtn.textContent = questionData.yesBtn;
    yesBtn.id = 'finalYesBtn';
    yesBtn.addEventListener('click', triggerCelebration);

    const noBtn = document.createElement('button');
    noBtn.textContent = questionData.noBtn;
    noBtn.id = 'finalNoBtn';
    // For the final 'No', we'll make it a little hard to click (only within app boundaries)
    // Re-using the bouncyNo logic from handleNoButtonHover/Click, but scoped to the app
    noBtn.style.position = 'absolute';
    noBtn.style.width = 'fit-content';
    noBtn.style.minWidth = '100px';
    noBtn.style.padding = '10px 20px';
    noBtn.style.fontSize = '1em';
    noBtn.style.zIndex = '100';

    setTimeout(() => { // Initial positioning
        const appRect = app.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        noBtn.style.left = `${(appRect.width - btnRect.width) / 2}px`;
        noBtn.style.top = `${appRect.height - btnRect.height - 20}px`;
    }, 50);


    noBtn.addEventListener('mouseover', handleNoButtonHover); // This will use the app-scoped bounce
    noBtn.addEventListener('click', () => {
        // If they manage to click no, give a message then re-render
        displayTemporaryMessage("Are you SURE? 😉 My heart can't take that!", () => renderFinalYesNoQuestion(questionData, btnContainer));
    });


    btnContainer.appendChild(yesBtn);
    btnContainer.appendChild(noBtn);
}


function renderNextQuestion() {
    noButtonClickCount = 0; // Reset for next bouncy 'No' if applicable
    currentQuestionIndex++;
    if (currentQuestionIndex < config.questions.length) {
        renderQuestion(currentQuestionIndex);
    } else {
        // This case should ideally not be reached if finalYesNo is the last question
        console.error("No more questions defined! Triggering celebration as fallback.");
        triggerCelebration();
    }
}

function displayTemporaryMessage(message, callback) {
    clearApp();
    const p = document.createElement('p');
    p.innerHTML = message; // Use innerHTML to allow emojis/HTML in messages
    p.style.fontSize = '1.5em';
    p.style.fontWeight = 'bold';
    app.appendChild(p);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Continue ❤️';
    nextBtn.style.marginTop = '30px';
    nextBtn.addEventListener('click', callback);
    app.appendChild(nextBtn);
}


// --- Event Handlers ---

function handleNoButtonHover() {
    const questionData = config.questions[currentQuestionIndex];
    const noBtn = document.getElementById('noBtn');

    if (!noBtn || noBtn.classList.contains('transformed')) return; // If button already transformed or doesn't exist

    if (questionData.bouncyNo && questionData.uncatchableNo) { // Specific for the first question's uncatchable 'No'
        noButtonClickCount++;

        const bodyRect = body.getBoundingClientRect(); // Get full window dimensions
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate a new random position across the *entire screen*
        // Make sure it doesn't go off screen too much
        const padding = 20; // Keep button at least 20px from edge
        const newX = padding + Math.random() * (bodyRect.width - btnRect.width - padding * 2);
        const newY = padding + Math.random() * (bodyRect.height - btnRect.height - padding * 2);

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.transform = `scale(${1 - noButtonClickCount * 0.02}) rotate(${Math.random() * 10 - 5}deg)`; // Shrink and rotate slightly
        noBtn.style.opacity = `${1 - noButtonClickCount * 0.05}`; // Fade slightly
        noBtn.style.transition = 'all 0.1s ease-out'; // Faster transition

        if (noButtonClickCount >= questionData.secretNoThreshold) {
            if (noBtn.textContent !== questionData.secretAnswer) {
                 noBtn.textContent = questionData.secretAnswer;
                 noBtn.style.backgroundColor = 'var(--text-color)';
                 noBtn.style.color = 'white';
                 noBtn.style.cursor = 'default';
                 noBtn.style.opacity = '1'; // Make it fully visible again
                 noBtn.style.transform = 'scale(1) rotate(0deg)'; // Reset size/rotation
                 noBtn.style.width = 'auto'; // Let it grow to fit text
                 noBtn.style.transition = 'all 0.3s ease-out'; // Slower transition for final state
                 noBtn.classList.add('transformed'); // Mark as transformed

                 // Remove event listeners, it's no longer evasive
                 noBtn.removeEventListener('mouseover', handleNoButtonHover);
                 noBtn.removeEventListener('click', handleNoButtonClick);
                 noBtn.removeEventListener('touchstart', handleNoButtonHover);
                 // Make the secret answer button trigger a 'Yes' path
                 noBtn.addEventListener('click', () => displayTemporaryMessage("I knew it! 🥰", renderNextQuestion));
            }
        }
    } else if (questionData.bouncyNo) { // For other bouncy 'No' buttons (like final question)
        const appRect = app.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate a new random position within the app's boundaries
        const padding = 10;
        const newX = padding + Math.random() * (appRect.width - btnRect.width - padding * 2);
        const newY = padding + Math.random() * (appRect.height - btnRect.height - padding * 2);

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.transform = 'translate(0,0)'; // Reset any previous transform
        noBtn.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
    }
}

function handleNoButtonClick() {
    const questionData = config.questions[currentQuestionIndex];
    const noBtn = document.getElementById('noBtn');

    if (!noBtn || noBtn.classList.contains('transformed')) return;

    if (questionData.bouncyNo && questionData.uncatchableNo) { // Specific for the first question
        // Trigger hover effect on click too, useful for touch devices
        handleNoButtonHover();
        // If the secret answer is revealed, allow it to act as a 'Yes'
        if (noButtonClickCount >= questionData.secretNoThreshold && noBtn.textContent === questionData.secretAnswer) {
            displayTemporaryMessage("I knew it! 🥰", renderNextQuestion);
        }
    } else if (questionData.bouncyNo) { // Other bouncy 'No' buttons (like final question)
        // This is primarily for the final 'No' button, which also bounces but doesn't have a secret message.
        // It's meant to be hard to click, but if clicked, it just re-renders the same question with a message.
        // The event listener for this is handled in renderFinalYesNoQuestion.
        handleNoButtonHover(); // Also trigger hover behavior on click
    }
}


function increaseLove() {
    lovePercentage += Math.floor(Math.random() * 50) + 50; // Increase by 50-99% per click
    const lovePercentageSpan = document.getElementById('love-percentage');
    const loveMeterText = document.getElementById('app').querySelector('p'); // Get the main paragraph
    const loveBtn = document.getElementById('loveBtn');
    const nextBtn = document.getElementById('nextBtn');
    const questionData = config.questions[currentQuestionIndex];

    if (lovePercentageSpan) {
        lovePercentageSpan.textContent = `${lovePercentage}%`;
    }

    // Update button size/animation based on love
    const scale = 1 + (lovePercentage / 2000); // Grows larger over time
    loveBtn.style.transform = `scale(${Math.min(scale, 2)})`; // Max scale 2

    // Update love message based on thresholds
    if (lovePercentage >= 5000) {
        loveMeterText.innerHTML = `${config.loveMessages.extreme} <span id="love-percentage">${lovePercentage}%</span>`;
    } else if (lovePercentage >= 1000) {
        loveMeterText.innerHTML = `${config.loveMessages.high} <span id="love-percentage">${lovePercentage}%</span>`;
    } else if (lovePercentage >= 100) {
        loveMeterText.innerHTML = `${config.loveMessages.normal} <span id="love-percentage">${lovePercentage}%</span>`;
    }

    // Show Next button after a certain amount of love
    if (lovePercentage >= questionData.loveThreshold && nextBtn.style.display === 'none') {
        nextBtn.style.display = 'block';
        nextBtn.style.marginTop = '20px'; // Add some space
    }
}

// --- Celebration Function ---
function triggerCelebration() {
    clearApp();

    // Stop existing floating emojis and start explosion
    clearInterval(emojiInterval); // Stop regular emojis
    body.style.setProperty('--background-start', '#FFD700'); // Gold for celebration!
    body.style.setProperty('--background-end', '#FF8C00');

    // Create explosion at center of the screen
    for (let i = 0; i < 50; i++) { // Generate 50 hearts
        setTimeout(() => {
            createExplosionHeart(window.innerWidth / 2, window.innerHeight / 2);
        }, i * 50); // Stagger them
    }

    const title = document.createElement('h1');
    title.className = 'celebration-title';
    title.textContent = config.celebration.title;

    const message = document.createElement('p');
    message.className = 'celebration-message';
    message.textContent = config.celebration.message;

    const emojis = document.createElement('div');
    emojis.className = 'celebration-emojis';
    emojis.textContent = config.celebration.emojis;

    app.appendChild(title);
    app.appendChild(message);
    app.appendChild(emojis);

    // Optional: Play a short celebratory sound if available
    // if (audio && config.music.enabled) {
    //     audio.pause(); // Pause background music
    //     const cheerSound = new Audio("cheer.mp3"); // You'd need to provide this
    //     cheerSound.play();
    // }
}

function createExplosionHeart(x, y) {
    const heart = document.createElement('span');
    heart.classList.add('explosion-heart');
    heart.textContent = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // Randomize explosion direction and distance
    const angle = Math.random() * Math.PI * 2; // Full circle
    const distance = Math.random() * 200 + 100; // 100 to 300px distance
    const explodeX = Math.cos(angle) * distance;
    const explodeY = Math.sin(angle) * distance;

    heart.style.setProperty('--explode-x', `${explodeX}px`);
    heart.style.setProperty('--explode-y', `${explodeY}px`);
    heart.style.setProperty('--heart-explosion-size', config.animations.heartExplosionSize);
    heart.style.setProperty('--float-duration', config.animations.floatDuration); // Re-use float duration for explosion

    body.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

let emojiInterval; // Global variable to store interval ID

// --- Initialize the Application ---
document.addEventListener('DOMContentLoaded', () => {
    setupMusicPlayer();
    startFloatingEmojis(); // Start regular emojis
    renderQuestion(currentQuestionIndex); // Start with the first question
});