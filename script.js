const mainButtons = document.querySelectorAll('.sketch-buttons button');
const buttonSFX = document.querySelector('#button-clicked');
const colorPickerRadio = document.querySelector('.omsim-grid');

mainButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(!buttonSFX) return;

        buttonSFX.currentTime = 0;
        buttonSFX.play();
    });
});

colorPickerRadio.addEventListener('change', (e) => {
    console.log(`${e.target.value}`);
})