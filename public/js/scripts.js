const paletteGeneratorBtn = document.getElementById("palette--generator-btn");

const generateRandomColor = () => {
  console.log('yo')
}

const createColorPalette = () => {
  for(var i = 0; i < 5; i++) {
    generateRandomColor();
    console.log('mama')
    }
}

paletteGeneratorBtn.addEventListener("click", createColorPalette);
