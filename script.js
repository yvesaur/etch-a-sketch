const mainButtons = document.querySelectorAll('.sketch-buttons button');
const buttonSFX = document.querySelector('#button-clicked');
const colorPickerRadio = document.querySelector('.omsim-grid');
const sketchArea = document.querySelector('.sketch-content');
const penButton = document.querySelectorAll('.sketch-buttons button')[0];
const rainbowButton = document.querySelectorAll('.sketch-buttons button')[1];
const eraseButton = document.querySelectorAll('.sketch-buttons button')[2];

let isDrawing = false;
let isRainbow = false;
let isErasing = false;
let isMouseDown = false;



buttonSFX.volume = 0.5;

// Detect what activity is chosen by the user
function changeCursor(url){
    document.body.style.cursor = `url('${url}'), auto`;
}
penButton.addEventListener('click', () => {
    changeCursor('./cursors/stylus.png');
    isDrawing = true;
    isRainbow, isErasing = false;
})
rainbowButton.addEventListener('click', () => {
    changeCursor('./cursors/rainbow.png');
    isRainbow = true;
    isDrawing, isErasing = false;
})
eraseButton.addEventListener('click', () => {
    changeCursor('./cursors/rubber.png');
    isErasing = true;
    isDrawing, isRainbow = false;
})
//

// Detect if the user is holding the LMB (i.e. Drawing on the sketch content)
window.onmousedown = () => {
    isMouseDown = true;
}

// Detect if LMB is released
window.onmouseup = () => {
    isMouseDown = false;
}


// Detect if LMB is released



// Play a soundFX when button is clicked
mainButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(!buttonSFX) return;

        buttonSFX.currentTime = 0;
        buttonSFX.play();
    });
});

// Change the grid size (A * B) when radio is changed
colorPickerRadio.addEventListener('change', (e) => {

    // Clear the pixels when radio is changed again
    sketchArea.innerHTML= '';

    // initialize appropriate grid template
    console.log(`${e.target.value}`);
    sketchArea.style.cssText = `
                                    grid-template-columns: repeat(${e.target.value}, auto);
                                    grid-template-rows: repeat(${e.target.value},auto)
                                `

    let bitSize = e.target.value * e.target.value;
    
    // Add div elements to each grid cells
    for(let i = 1; i <= bitSize; i++){
        const sketchContentPixel = document.createElement('div');
        sketchContentPixel.className = 'pixel';

        sketchContentPixel.classList.add('pixel');
        sketchArea.appendChild(sketchContentPixel);
    }
})