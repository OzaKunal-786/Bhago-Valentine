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
            uncatchableNo: true, // NEW: Makes the 'No' button jump all over the screen
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
            type: 'hiddenTextNo', // NEW QUESTION TYPE
            text: "Can you *really* say NO to being my Valentine? 😉",
            yesBtn: "Yes!",
            noBtn: "NO!",
            hiddenText: "No, I love you! ❤️",
            hiddenTextSize: "0.1em", // Very small
            hiddenTextOpacity: "0.08", // Very faint
            hiddenTextColor: "white",
            noAttemptMessage: "That's not the right 'No'! Keep looking... 🤔",
            successMessage: "Aha! You found it! I knew you did! 🥰"
        },
        {
            type: 'choice', // NEW QUESTION
            text: "Which superpower would you rather have for Valentine's Day?",
            options: [
                { text: "Instantly make anyone laugh uncontrollably (especially me!)", response: "Oh, you'd be my favorite comedian! And it's true, laughter is the best medicine... especially with you. 😂" },
                { text: "Always find the perfect parking spot (for our dates!)", response: "A true hero! Think of all the stress-free adventures we'd have. My parking struggles would be a thing of the past! 🙏" }
            ],
            nextBtn: "Smart choice!"
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
    // Clear any inline styles left by bouncy buttons
    if (document.getElementById('noBtn')) {
        const noBtn = document.getElementById('noBtn');
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.transform = '';
        noBtn.style.transition = '';
    }
}

function renderQuestion(index) {
    clearApp();
    currentQuestionIndex = index;
    const questionData = config.questions[index];

    // Adjust greeting based on question type for variety
    const h1 = document.createElement('h1');
    if (questionData.type === 'loveMeter' || questionData.type === 'choice' || questionData.type === 'hiddenTextNo' ) {
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
        case 'choice':
            renderChoiceQuestion(questionData, btnContainer);
            break;
        case 'hiddenTextNo': // NEW CASE
            renderHiddenTextNoQuestion(questionData, btnContainer);
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

    if (questionData.bouncyNo) {
        // For the uncatchable 'No' button on the first question, it needs to be positioned within the APP div
        // but its movement will be relative to the entire window for more craziness.
        // We set position absolute here, but update positions in handler.
        noBtn.style.position = 'absolute';
        noBtn.style.width = 'fit-content'; // Allow width to adjust to text if needed
        noBtn.style.minWidth = '100px'; // Give it a minimum width
        noBtn.style.padding = '10px 20px'; // Adjust padding for smaller size
        noBtn.style.fontSize = '1em'; // Adjust font size
        noBtn.style.zIndex = '100'; // Make sure it's on top of other buttons briefly

        noBtn.addEventListener('mouseover', handleNoButtonHover); // Mouseover for desktop
        noBtn.addEventListener('click', handleNoButtonClick); // Click for mobile/accessibility
        noBtn.addEventListener('touchstart', handleNoButtonHover); // Touch for mobile

        // Initial positioning for the uncatchable button
        setTimeout(() => { // Give it a moment to render to get its true size
            const appRect = app.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();
            noBtn.style.left = `${(appRect.width - btnRect.width) / 2}px`;
            noBtn.style.top = `${appRect.height - btnRect.height - 20}px`; // Towards bottom of app
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

// NEW FUNCTION: Renders the question with a hidden "No, I love you!" text
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


function renderFinalYesNoQuestion(questionData, btnContainer) {
    const yesBtn = document.createElement('button');
    yesBtn.textContent = questionData.yesBtn;
    yesBtn.id = 'finalYesBtn';
    yesBtn.addEventListener('click', triggerCelebration);

    const noBtn = document.createElement('button');
    noBtn.textContent = questionData.noBtn;
    noBtn.id = 'finalNoBtn';
    // For the final 'No', we'll make it a little hard to click (only within app boundaries)
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


    noBtn.addEventListener('mouseover', () => {
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
    });
    noBtn.addEventListener('click', () => {
        // If they manage to click no, maybe a gentle nudge back to yes or just re-ask
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
    if (questionData.bouncyNo && questionData.uncatchableNo) { // Specific for the first question's uncatchable 'No'
        noButtonClickCount++;

        const noBtn = document.getElementById('noBtn');
        const bodyRect = body.getBoundingClientRect(); // Get full window dimensions
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate a new random position across the *entire screen*
        // Make sure it doesn't go off screen too much
        const padding = 20; // Keep button at least 20px from edge
        const newX = padding + Math.random() * (bodyRect.width - btnRect.width - padding * 2);
        const newY = padding + Math.random() * (bodyRect.height - btnRect.height - padding * 2);

        // Apply position relative to the body (viewport), not the app container
        noBtn.style.position = 'fixed'; // Use fixed to position relative to viewport
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

                 // Remove event listeners, it's no longer evasive
                 noBtn.removeEventListener('mouseover', handleNoButtonHover);
                 noBtn.removeEventListener('click', handleNoButtonClick);
                 noBtn.removeEventListener('touchstart', handleNoButtonHover);
                 // Make the secret answer button trigger a 'Yes' path
                 noBtn.addEventListener('click', () => displayTemporaryMessage("I knew it! 🥰", renderNextQuestion));
            }
        }
    } else if (questionData.bouncyNo) { // Other bouncy 'No' buttons (like final question)
        noButtonClickCount++;

        const noBtn = document.getElementById('noBtn');
        // If it's the very first time it's getting bounced, set its position properly relative to app
        if (noBtn.style.position !== 'absolute') {
            noBtn.style.position = 'absolute';
            // Set initial position relative to current position, so it doesn't jump to (0,0)
            const currentRect = noBtn.getBoundingClientRect();
            const appRect = app.getBoundingClientRect();
            noBtn.style.left = `${currentRect.left - appRect.left}px`;
            noBtn.style.top = `${currentRect.top - appRect.top}px`;
        }

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
    if (questionData.bouncyNo && questionData.uncatchableNo) { // Specific for the first question
        // Trigger hover effect on click too, useful for touch devices
        handleNoButtonHover();
        // If the secret answer is revealed, allow it to act as a 'Yes'
        if (noButtonClickCount >= questionData.secretNoThreshold && document.getElementById('noBtn').textContent === questionData.secretAnswer) {
            displayTemporaryMessage("I knew it! 🥰", renderNextQuestion);
        }
    } else if (questionData.bouncyNo) { // Other bouncy 'No' buttons (like final question)
        noButtonClickCount++; // Still count clicks for debugging if needed
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