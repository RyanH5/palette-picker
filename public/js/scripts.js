const paletteGeneratorBtn = document.getElementById("palette--generator-btn");
const savePaletteBtn = document.getElementById("palette--save-btn");
const unLockedLock = document.querySelectorAll('.unlocked');
const colorPossibilities = document.querySelectorAll('.color--palette-possibility');
const colorHexs = document.querySelectorAll('.color-hex');


// unLockedLock.addEventListener("click", toggleLockColor);

const generateRandomColor = () => {
  var hexValues = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E", "F"];
  var newColor = "#";
  
  for ( let i = 0; i < 6; i++ ) {
    let x = Math.round( Math.random() * 15 );
    let y = hexValues[x];
    newColor += y;
  }
  return newColor;
}

const createColorPalette = () => {
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


const toggleLockColor = () => {
}

unLockedLock.forEach(lock => lock.addEventListener('click', toggleLockColor))


paletteGeneratorBtn.addEventListener("click", createColorPalette);
