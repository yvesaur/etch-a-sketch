const mainButtons = document.querySelectorAll('.sketch-buttons button');
const buttonSFX = document.querySelector('#button-clicked');
const colorPickerRadio = document.querySelector('.omsim-grid');
const sketchArea = document.querySelector('.sketch-content');
const penButton = document.querySelectorAll('.sketch-buttons button')[0];
const rainbowButton = document.querySelectorAll('.sketch-buttons button')[1];

buttonSFX.volume = 0.5;

function changeCursor(url){
    document.body.style.cursor = `url('${url}'), auto`;
}

penButton.addEventListener('click', () => {
    changeCursor('./cursors/penCursor.cur');
})

rainbowButton.addEventListener('click', () => {
    changeCursor('./cursors/rainbowCursor.ani');
})



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