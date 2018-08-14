const paletteGeneratorBtn = document.getElementById("palette--generator-btn");
const savePaletteBtn = document.getElementById("palette--save-btn");

const generateRandomColor = () => {
  var hexValues = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E", "F"];
  var newColor = "#";
  
  for ( let i = 0; i < 6; i++ ) {
    let x = Math.round( Math.random() * 15 );
    let y = hexValues[x];
    newColor += y;
  }

  // return newColor;
  document.getElementById("first--color-possibility").style.backgroundColor = newColor;
  document.getElementById("first--color-hex").innerHTML = newColor;
}

const createColorPalette = () => {
  const colorList = [];
  for(var i = 1; i < 6; i++) {
    let newColor = generateRandomColor();
    colorList.push(newColor);
    }
  console.log(colorList)
}


paletteGeneratorBtn.addEventListener("click", createColorPalette);