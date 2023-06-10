const mainButtons = document.querySelectorAll('.sketch-buttons button');
const buttonSFX = document.querySelector('#button-clicked');
const gridRadio = document.querySelector('.omsim-grid');
const sketchArea = document.querySelector('.sketch-content');
const penButton = document.querySelectorAll('.sketch-buttons button')[0];
const rainbowButton = document.querySelectorAll('.sketch-buttons button')[1];
const eraseButton = document.querySelectorAll('.sketch-buttons button')[2];
const clearButton = document.querySelectorAll('.sketch-buttons button')[3];
let sketchContentPixelList = sketchArea.childNodes;
const colorRadio = document.querySelector('#color-picker');
const rainbowColor = ["#FF0000", "#FF8700","#FFD300", "#DEFF0A","#A1FF0A", "#0AFF99",
                      "#0AEFFF", "#147DF5","#580AFF", "#BE0AFF"];
let currentColor;
let currentRainbowColor = 0;

let isDrawing = false;
let isRainbow = false;
let isErasing = false;
let isMouseDown = 0;
let isDragging = false;



buttonSFX.volume = 0.5;

// Detect what activity is chosen by the user
function changeCursor(url){
    document.body.style.cursor = `url('${url}'), auto`;
}
penButton.addEventListener('click', () => {
    changeCursor('./cursors/stylus.png');
    isDrawing = true;
    isRainbow = false;
    isErasing = false;
})
rainbowButton.addEventListener('click', () => {
    changeCursor('./cursors/rainbow.png');
    isRainbow = true;
    isDrawing = false;
    isErasing = false;
})
eraseButton.addEventListener('click', () => {
    changeCursor('./cursors/rubber.png');
    isErasing = true;
    isDrawing = false;
    isRainbow = false;
})
clearButton.addEventListener('click', ()=> {
    sketchContentPixelList = sketchArea.childNodes;
    sketchContentPixelList.forEach(pixel => {
        pixel.style.backgroundColor = "";
    });
})
//

// Detect if the user is holding the LMB (i.e. Drawing on the sketch content)
document.body.addEventListener('mousedown', function() {
    ++isMouseDown;
});
  
document.body.addEventListener('mouseup', function() {
    --isMouseDown;
});

setInterval(()=> {
    sketchContentPixelList = sketchArea.querySelectorAll('.pixel');
    if(isMouseDown){
        console.log('LMB is still held down.');
    } else {
        console.log('LMB is not held down.');
    }
},1000);


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
    
    sketchContentPixelList = sketchArea.childNodes;
    sketchContentPixelList.forEach(pixel => {
        pixel.style.border = '0.001rem dotted rgba(0, 0, 0, 0.3)';
        pixel.style.userSelect = 'none';
        sketchArea.style.userSelect = 'none';
        pixelListeners('mouseover', pixel);
        pixelListeners('click', pixel);
    });
})

// Get the current selected color if color radio is changed
colorRadio.addEventListener('change', ()=>{
    currentColor = colorRadio.value;
})

// Listeners to modify each pixel div element on the sketch area
function pixelListeners(events, element) {
    element.addEventListener(`${events}`, () =>{
        console.log(`Cursor:${events} to div:.${element.className}`);
        if (isRainbow && String(events) == "click") {
            let color = rainbowColor[currentRainbowColor];
            element.style.backgroundColor = String(color);
            console.log(String(color));
            currentRainbowColor = (currentRainbowColor + 1)% rainbowColor.length;
        }

        if(isDrawing && isMouseDown || isDrawing && String(events) == "click"){
            element.style.backgroundColor = String(currentColor);
        } else if (isErasing && isMouseDown || isErasing && String(events) == "click") {
            element.style.backgroundColor = "";
        } 
         // While on rainbow mode and LMB is hold, it will traverse on rainbowColor array infinitely    
         else if (isRainbow && isMouseDown) {
            let color = rainbowColor[currentRainbowColor];
            element.style.backgroundColor = String(color);
            console.log(String(color));
            currentRainbowColor = (currentRainbowColor + 1)% rainbowColor.length;
        }
    });
}
