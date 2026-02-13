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
        { // NEW QUESTION: Transforming Choices (FIXED: removed config.valentineName from definition)
            type: 'transformingChoice',
            text: `Alright, [VALENTINE_NAME], deep down, how would you describe me?`, // Placeholder used here
            options: [
                { initial: "Ugly", transformed: "Handsome! 🥰", response: "Aw, you're just saying what you truly feel! You're too kind!" },
                { initial: "Annoying", transformed: "Charming! ✨", response: "Haha, I knew you loved my quirks! And now I know you find me charming!" },
                { initial: "Irritating", transformed: "Captivating! 😉", response: "Irritating? Never! Captivating? Absolutely! Thanks for saying it!" },
                { initial: "Clueless", transformed: "Brilliant! 💡", response: "Oh, you thought I was clueless? Plot twist: I'm brilliant! Thanks for noticing!" }
            ],
            activationEvent: 'mouseover', // NEW: Activate on mouseover
            nextBtn: "You're too sweet! 😍" // This will be the text on the "Continue" button after choice
        },
        {
            type: 'decodeCipher', // NEW QUESTION
            text: "I've sent you a secret love note, but it's encoded! Only your clever mind can unlock its true meaning. The key is in my heart...",
            cipherText: "L ORYH NXQDO RCD, X DUH EHFW.", // New encoded text (Caesar cipher, shift +3)
            correctAnswer: "I LOVE KUNAL OZA, U ARE BEST.", // New correct answer
            hint: "Each letter is actually 3 letters *before* it in the alphabet!", // This is the Caesar cipher, shift by -3 to decode
            successMessage: "You cracked it! My brilliant, clever Valentine! 🥰",
            failMessage: "Hmm, not quite! Keep trying, my clever one! (Or ask for a hint if you dare! 😉)",
            skipBtnText: "Kiss Kunal Now to get the answer", // New skip button text
            skipDelay: 30000 // NEW: Delay in ms before skip button appears (10 seconds)
        },
         {
            type: 'miniGame', // Q5: Catch the Kiss
            text: `Quick, [VALENTINE_NAME]! Catch 5 flying kisses in 10 seconds! My heart depends on it!`,
            targetCount: 5,
            timeLimit: 10, // seconds
            emoji: '😘',
            kissMoveDuration: '3s',
            kissGenerationInterval: 700,
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

// --- Mini-Game Variables ---
let score = 0;
let gameTimerId = null; // Changed name to avoid confusion with built-in Timer object
let kissGenerationIntervalId = null; // Changed name


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
        oldNoBtn.classList.remove('transformed'); // Ensure this class is removed
    }
    // Clear any game items from mini-game
    document.querySelectorAll('.moving-kiss').forEach(kiss => kiss.remove());
    // Stop any running intervals/timeouts for the mini-game
    if (kissGenerationIntervalId) clearInterval(kissGenerationIntervalId);
    if (gameTimerId) clearTimeout(gameTimerId);
    kissGenerationIntervalId = null;
    gameTimerId = null;
}

function renderQuestion(index) {
    clearApp();
    currentQuestionIndex = index;
    const questionData = config.questions[index];

    const h1 = document.createElement('h1');
    // First question uses "Hey [ValentineName]!", subsequent ones use "[ValentineName]! ❤️"
    if (currentQuestionIndex === 0) {
        h1.textContent = `Hey ${config.valentineName}!`;
    } else {
        h1.textContent = `${config.valentineName}! ❤️`;
    }

    const p = document.createElement('p');
    // Replace placeholder for Valentine's Name in question text
    p.textContent = questionData.text.replace('[VALENTINE_NAME]', config.valentineName);

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
        case 'transformingChoice':
            renderTransformingChoiceQuestion(questionData, btnContainer);
            break;
        case 'decodeCipher':
            renderDecodeCipherQuestion(questionData, btnContainer);
            break;
        case 'miniGame':
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

    } else { // For regular Yes/No questions
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

// Renders the transforming choice question
function renderTransformingChoiceQuestion(questionData, btnContainer) {
    const buttons = [];
    let choiceConfirmed = false; // Flag to track if a choice has been definitively made

    const responseParagraph = document.createElement('p'); // New element for response text
    responseParagraph.style.marginTop = '20px';
    responseParagraph.style.minHeight = '1.2em'; // Ensure space even when empty
    responseParagraph.style.fontWeight = 'bold';
    app.appendChild(responseParagraph);

    const continueBtnContainer = document.createElement('div'); // Container for the continue button
    continueBtnContainer.className = 'btn-container'; // Reuse button container styling
    const nextQuestionBtn = document.createElement('button');
    nextQuestionBtn.textContent = 'Continue ❤️';
    nextQuestionBtn.style.display = 'none'; // Initially hidden
    nextQuestionBtn.addEventListener('click', renderNextQuestion);
    continueBtnContainer.appendChild(nextQuestionBtn);
    app.appendChild(continueBtnContainer);


    questionData.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.textContent = option.initial;
        optionBtn.dataset.initialText = option.initial; // Store initial text
        optionBtn.dataset.transformedText = option.transformed; // Store transformed text
        optionBtn.dataset.responseText = option.response; // Store response text
        optionBtn.classList.add('transforming-button'); // Add a class for potential styling or targeting

        const handleMouseover = (event) => {
            if (choiceConfirmed) return; // If a choice is confirmed, do nothing

            event.target.textContent = event.target.dataset.transformedText; // Change button text
            event.target.style.backgroundColor = 'var(--text-color)'; // Highlight it
            event.target.style.transform = 'scale(1.05) translateY(-5px)'; // Little bounce
            event.target.style.transition = 'all 0.3s ease-out'; // Smooth transition
            event.target.style.cursor = 'pointer'; // Keep pointer cursor
        };

        const handleMouseout = (event) => {
            if (choiceConfirmed) return; // If a choice is confirmed, do nothing

            event.target.textContent = event.target.dataset.initialText; // Reset text
            event.target.style.backgroundColor = ''; // Reset background (CSS var will apply)
            event.target.style.transform = ''; // Reset transform
            event.target.style.transition = 'background-color 0.3s ease, transform 0.1s ease'; // Reset transition
        };

        const handleClick = (event) => {
            if (choiceConfirmed) return; // Already confirmed, do nothing

            choiceConfirmed = true; // Mark choice as confirmed

            // Ensure the clicked button stays transformed and highlighted
            event.target.textContent = event.target.dataset.transformedText;
            event.target.style.backgroundColor = 'var(--text-color)';
            event.target.style.transform = 'scale(1.05) translateY(-5px)';
            event.target.style.transition = 'all 0.3s ease-out';
            event.target.style.cursor = 'default';

            // Display response message
            responseParagraph.innerHTML = event.target.dataset.responseText;

            // Disable all other buttons and remove their event listeners
            buttons.forEach(btn => {
                if (btn !== event.target) {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                    // Remove all event listeners from other buttons
                    btn.removeEventListener('mouseover', handleMouseover);
                    btn.removeEventListener('mouseout', handleMouseout);
                    btn.removeEventListener('click', handleClick);
                }
            });

            // Show the "Continue" button
            nextQuestionBtn.style.display = 'block';
        };

        // Attach event listeners
        optionBtn.addEventListener('mouseover', handleMouseover);
        optionBtn.addEventListener('mouseout', handleMouseout);
        optionBtn.addEventListener('click', handleClick); // Primary selection event

        buttons.push(optionBtn);
        btnContainer.appendChild(optionBtn);
    });
}


// Renders the decode cipher question
// Renders the decode cipher question
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

    const skipBtn = document.createElement('button'); // NEW: Skip button
    skipBtn.textContent = questionData.skipBtnText;
    skipBtn.style.marginTop = '10px';
    skipBtn.style.display = 'none'; // Initially hidden
    btnContainer.appendChild(skipBtn);

    // Make skip button appear after a delay
    setTimeout(() => {
        skipBtn.style.display = 'block';
    }, questionData.skipDelay);


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

    skipBtn.addEventListener('click', () => { // NEW: Skip button functionality with confirmation
        clearApp(); // Clear current question
        const pConfirm = document.createElement('p');
        pConfirm.innerHTML = "Did you really kiss Kunal? 😉";
        pConfirm.style.fontSize = '1.5em';
        pConfirm.style.fontWeight = 'bold';
        app.appendChild(pConfirm);

        const confirmKissBtn = document.createElement('button');
        confirmKissBtn.textContent = "Yes, I did! 💋";
        confirmKissBtn.style.marginTop = '30px';
        confirmKissBtn.addEventListener('click', renderNextQuestion);
        app.appendChild(confirmKissBtn);
    });
}

// Renders the mini-game question
function renderMiniGameQuestion(questionData, btnContainer) {
    score = 0; // Reset score for the new game

    // Create and append score display
    const scoreDisplay = document.createElement('p');
    scoreDisplay.id = 'game-score';
    scoreDisplay.textContent = `Caught: ${score}/${questionData.targetCount}`;
    scoreDisplay.style.marginBottom = '10px';
    app.appendChild(scoreDisplay); // FIXED: Use appendChild

    // Create and append timer display
    const timerDisplay = document.createElement('p');
    timerDisplay.id = 'game-timer';
    timerDisplay.textContent = `Time: ${questionData.timeLimit}s`;
    timerDisplay.style.marginBottom = '10px';
    app.appendChild(timerDisplay); // FIXED: Use appendChild

    // Create and append game area
    const gameArea = document.createElement('div');
    gameArea.id = 'mini-game-area';
    app.appendChild(gameArea); // FIXED: Use appendChild

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start Game!';
    btnContainer.appendChild(startBtn); // This correctly adds to btnContainer

    const initialGameMessage = document.createElement('p');
    initialGameMessage.textContent = "Click 'Start Game' to begin!";
    initialGameMessage.style.textAlign = 'center';
    gameArea.appendChild(initialGameMessage); // Display instruction inside game area

    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        initialGameMessage.remove(); // Remove instruction
        score = 0;
        scoreDisplay.textContent = `Caught: ${score}/${questionData.targetCount}`;

        let timeLeft = questionData.timeLimit;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        kissGenerationIntervalId = setInterval(() => {
            createMovingKiss(gameArea, questionData);
        }, questionData.kissGenerationInterval); // Use config interval

        gameTimerId = setTimeout(() => {
            clearInterval(kissGenerationIntervalId);
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

function createMovingKiss(gameArea, questionData) {
    const kiss = document.createElement('span');
    kiss.classList.add('moving-kiss');
    kiss.textContent = questionData.emoji;

    // Set dynamic animation duration
    kiss.style.setProperty('--kiss-move-duration', questionData.kissMoveDuration);

    // Random starting position within the game area
    const emojiSize = 50; // Approximate size of emoji in pixels for calculation
    const startX = Math.random() * (gameArea.offsetWidth - emojiSize);
    const startY = Math.random() * (gameArea.offsetHeight - emojiSize); // Start anywhere in gameArea
    kiss.style.left = `${startX}px`;
    kiss.style.top = `${startY}px`;

    // Random end position (anywhere within the game area bounds, then slightly off-screen)
    const endX = Math.random() * (gameArea.offsetWidth - emojiSize);
    const endY = Math.random() * (gameArea.offsetHeight - emojiSize); // End point within game area
    const finalOffScreenY = -emojiSize; // Guaranteed off-screen top

    kiss.style.setProperty('--move-x', `${endX - startX}px`);
    kiss.style.setProperty('--move-y', `${endY - startY}px`);
    kiss.style.setProperty('--move-x-end', `${endX - startX + (Math.random() * 100 - 50)}px`); // Slightly randomize final X
    kiss.style.setProperty('--move-y-end', `${finalOffScreenY - startY}px`); // Ensure it moves off top

    // Add click feedback and remove kiss
    kiss.addEventListener('click', (event) => {
        score++;
        document.getElementById('game-score').textContent = `Caught: ${score}/${questionData.targetCount}`;
        // Brief scale down before removal for visual feedback
        event.target.style.transform = 'scale(0.5)';
        event.target.style.opacity = '0';
        event.target.style.transition = 'transform 0.1s ease-out, opacity 0.1s ease-out';
        setTimeout(() => event.target.remove(), 100); // Remove after quick animation
    });

    gameArea.appendChild(kiss);

    // Remove kiss after its animation if not caught (important for performance)
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
    noBtn.id = 'noBtn'; // Changed to 'noBtn' as it's the general ID for bouncy buttons
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