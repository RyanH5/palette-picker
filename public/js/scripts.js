const savePaletteBtn = document.getElementById("palette--save-btn");
const colorPossibilities = document.querySelectorAll('.color--palette-possibility');
var colorList = []

window.onload = createColorPalette();
$("#palette--generator-btn").on("click", createColorPalette);
colorPossibilities.forEach(color => color.addEventListener("click", storeSelectedColor));

function generateRandomColor() {
  var hexValues = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E", "F"];
  var newColor = "#";
  
  for ( let i = 0; i < 6; i++ ) {
    let x = Math.round( Math.random() * 15 );
    let y = hexValues[x];
    newColor += y;
  }
  return newColor;
}

function createColorPalette(event) {
  colorList = [];
  const colorHexs = document.querySelectorAll('.color-hex');
  for(var i = 0; i < 5; i++) {
    let newColor = generateRandomColor();
      colorList.push({
        color: newColor,
        saved: false
      });
      $('.color--palette-possibility')[i].style.backgroundColor = colorList[i].color;
      colorHexs[i].innerHTML = colorList[i].color;
    }
}

function storeSelectedColor(event) {
  colorList.forEach(color => {
    if (color.color === event.target.innerText) {
      $(this).children('.lock').toggleClass('locked')
      color.saved = !color.saved
    }
  });
}

