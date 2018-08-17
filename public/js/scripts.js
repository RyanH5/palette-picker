const colorPossibilities = document.querySelectorAll('.color--palette-possibility');
var colorList = [ {'saved': false}, 
                  {'saved': false},
                  {'saved': false},
                  {'saved': false},
                  {'saved': false}
                ]

window.onload = createColorPalette();
$("#palette--generator-btn").on("click", createColorPalette);
colorPossibilities.forEach(color => color.addEventListener("click", storeSelectedColor));
$("#project--save-btn").on("click", saveProject);
$("#palette--save-btn").on("click", savePallete);

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
  for(var i = 0; i < 5; i++) {
    if (!colorList[i]['saved']) {
      let newColor = generateRandomColor();
      colorList[i] = {
        color: newColor,
        saved: false
      };
      $('.color--palette-possibility')[i].style.backgroundColor = colorList[i].color;
      colorHexs[i].innerHTML = colorList[i].color;
    }
  }
}

function storeSelectedColor(event) {
  colorList.forEach(color => {
    if (color.color === event.target.innerText) {
      $(this).children('.lock').toggleClass('locked');
      color.saved = !color.saved
    }
  });
}

function savePallete(event) {
  event.preventDefault();
  const projectPalette = colorList.filter(colorSplotch => {
    return colorSplotch.saved === true
  })
}

function saveProject(event) {
  event.preventDefault();
    $('#saved--projects').prepend(`
    <article>
      <h3 class="project--title">${$('#project--naming-input').val()}</h3>
      <ul class="project-splotches">
        <li class="splotchOne"></li>
        <li class="splotchTwo"></li>
        <li class="splotchThree"></li>
        <li class="splotchFour"></li>
        <li class="splotchFive"></li>
      </ul>
      <i class="fas fa-trash-alt"></i>
    </article>`)
  const projectName = $('#project--naming-input').val();
  addProjectToSelect(projectName);
  $('#project--naming-input').val('');
  postProjectToDb(projectName)
}

// async function fetchProjects() {
//   const response = await fetch('/api/v1/palettes');
//   const projects = await response.json();
//   return projects;
// }

function postProjectToDb(newProject) {
  const url = 'http://localhost:3000/api/v1/projects/';
  fetch(url, {
      method: 'POST',
      body: JSON.stringify({name: newProject}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => console.log(response.json()))
    .catch(function (error) {
      console.log(error.messege)
    });
};


// add select tag options on click of projectSave

function addProjectToSelect(chars) {
  const projectName = $('#project--naming-input').val();  
  $('select').append(`<option value=${projectName}>${$('#project--naming-input').val()}</option>`)
}

// function displayProjectPalette() {
//   const paletteColors = savePallete();
//   console.log(paletteColors)
// }