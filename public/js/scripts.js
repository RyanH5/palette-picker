const paletteGeneratorBtn = document.getElementById("palette--generator-btn");

const generateRandomColor = () => {
  var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
  var newColor = "#";
  
  for ( let i = 0; i < 6; i++ ) {
    let x = Math.round( Math.random() * 14 );
    let y = hexValues[x];
    newColor += y;
  }
  console.log(newColor)
  document.getElementById("first--color-possibility").style.backgroundColor = newColor;
  document.getElementById("first--color-hex").innerHTML = newColor;
}

const createColorPalette = () => {
  for(var i = 1; i < 6; i++) {
    generateRandomColor();
    console.log(newColor)
    }
}

paletteGeneratorBtn.addEventListener("click", createColorPalette);
