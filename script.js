const mainButtons = document.querySelectorAll('.sketch-buttons button');
const buttonSFX = document.querySelector('#button-clicked');
const gridRadio = document.querySelector('.omsim-grid');
const sketchArea = document.querySelector('.sketch-content');
const penButton = document.querySelectorAll('.sketch-buttons button')[0];
const rainbowButton = document.querySelectorAll('.sketch-buttons button')[1];
const eraseButton = document.querySelectorAll('.sketch-buttons button')[2];
const clearButton = document.querySelectorAll('.sketch-buttons button')[3];
const colorRadio = document.querySelector('#color-picker');
let currentColor;

let isDrawing = false;
let isRainbow = false;
let isErasing = false;
let isMouseDown = 0;



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
clearButton.addEventListener('click', ()=> {
    document.body.style.cursor = 'default';
    isDrawing, isRainbow, isErasing = false;
})
//

// Detect if the user is holding the LMB (i.e. Drawing on the sketch content)
document.body.onmousedown = function(){
    ++isMouseDown;
}

// Detect if LMB is released
document.body.onmouseup = function(){
    --isMouseDown;
}

setInterval(()=> {
    if(isMouseDown){
        console.log('LMB is still held down.');
    } else {
        console.log('LMB is not held down.');
    }
},1000);


// Coloring - isDrawing
if(isDrawing == true) {
    while(isMouseDown == true){
        sketchContentPixelList.forEach(pixel => {
            pixel.addEventListener()
        })
    }
}

// Play a soundFX when button is clicked
mainButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(!buttonSFX) return;

        buttonSFX.currentTime = 0;
        buttonSFX.play();
    });
});

// Change the grid size (A * B) when radio is changed
gridRadio.addEventListener('change', (e) => {

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

    sketchContentPixelList = document.querySelectorAll('.sketch-content .pixel');
    sketchContentPixelList.forEach(pixel => {
        pixel.style.border = '0.01rem dotted rgba(0, 0, 0, 0.2)';
    })
})

// Get the current selected color if color radio is changed
colorRadio.addEventListener('change', ()=>{
    currentColor = colorRadio.value;
})