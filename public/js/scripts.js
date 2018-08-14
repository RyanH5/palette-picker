const paletteGeneratorBtn = document.getElementById("palette--generator-btn");
const savePaletteBtn = document.getElementById("palette--save-btn");
const colorPossibilities = document.querySelectorAll('.color--palette-possibility');

window.onload = createColorPalette();
paletteGeneratorBtn.addEventListener("click", createColorPalette);
colorPossibilities.forEach(color => addEventListener("click", storeSelectedColor));

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
  const colorHexs = document.querySelectorAll('.color-hex');

  // event.preventDefault();
  const colorList = [];
  for(var i = 1; i < 6; i++) {
    let newColor = generateRandomColor();
    colorList.push(newColor);
  }
  for(var i = 0; i < 5; i++) {
    colorPossibilities[i].style.backgroundColor = colorList[i];
    colorHexs[i].innerHTML = colorList[i];
  }
}

function storeSelectedColor() {
  toggleLock();
}

function toggleLock() {
  let lockedLock = document.querySelectorAll(".locked");
  
  lockedLock.forEach(lock => lock.classList.toggle("locked"));
}