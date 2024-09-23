const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    audio = new Audio(`tunes/a.wav`); // by default, audio src is "a" tune

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; // passing audio src based on key pressed
    audio.play(); // playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
    clickedKey.classList.add("active"); // adding active class to the clicked key element
    setTimeout(() => {
        // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
};

pianoKeys.forEach((key) => {
    allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => {
        playTune(key.dataset.key);
        pressedKey({ key: key.dataset.key }); // Simulate key press
    });
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // passing the range slider value as an audio volume
};

const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
    // if the pressed key is in the allKeys array, only call the playTune function
    if (allKeys.includes(e.key)) playTune(e.key);

    // Track the sequence of keys pressed
    keySequence.push(e.key);
    if (keySequence.length > targetSequence.length) {
        keySequence.shift(); // Remove the oldest key if the sequence is too long
    }

    // Check if the sequence matches the target sequence
    if (keySequence.join("") === targetSequence.join("")) {
        showButton();
    }
};

let button = document.querySelector(".button");
button.style.display = "none";

// Function to show the button
const showButton = () => {
    console.log("did it");
    button.style.display = "block";
};

// Initialize variables for tracking the sequence
const keySequence = [];
const targetSequence = ["a", "s", "d"];

// Add event listener for key presses
document.addEventListener("keydown", pressedKey);

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
