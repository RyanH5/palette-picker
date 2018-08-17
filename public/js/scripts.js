const colorPossibilities = document.querySelectorAll('.color--palette-possibility');
var colorList = [ {'saved': false}, 
                  {'saved': false},
                  {'saved': false},
                  {'saved': false},
                  {'saved': false}
                ]

window.onload = createColorPalette()
window.onload = fetchProjects();
$("#palette--generator-btn").on("click", createColorPalette);
colorPossibilities.forEach(color => color.addEventListener("click", storeSelectedColor));
$("#project--save-btn").on("click", saveProject);
$("#palette--save-btn").on("click", savePalette);

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

function savePalette(event) {
  event.preventDefault();
  const lockedColors = colorList.filter(colorSplotch => {
    return colorSplotch.saved === true
  })

    const palette = {
      color1: lockedColors[0].color,
      color2: lockedColors[1].color,
      color3: lockedColors[2].color,
      color4: lockedColors[3].color,
      color5: lockedColors[4].color
    }
    console.log(palette)
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
  postProject(projectName)
}

async function fetchProjects() {
  // empty display area
  const response = await fetch('http://localhost:3000/api/v1/projects');
  const projects = await response.json();
  projects.forEach(project => {
    $('#saved--projects').prepend(`
    <article>
      <h3 class="project--title">${project.name}</h3>
      <ul class="project-splotches">
        <li class="splotchOne"></li>
        <li class="splotchTwo"></li>
        <li class="splotchThree"></li>
        <li class="splotchFour"></li>
        <li class="splotchFive"></li>
      </ul>
      <i class="fas fa-trash-alt"></i>
    </article>`),
    $('select').append(`<option value=${project.name}>${project.name}</option>`)
})
  // });
  // return projects;
}

async function postProject(newProject) {
  const url = 'http://localhost:3000/api/v1/projects/';
  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({name: newProject}),
      headers: {
        "Content-Type": "application/json"
      }
    })
  const projectData = await response.json();
};

async function postPalette(newProject) {
  const url = 'http://localhost:3000/api/v1/palettes/';
  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({name: newProject}),
      headers: {
        "Content-Type": "application/json"
      }
    })
  const paletteData = await response.json();
};

function addProjectToSelect(chars) {
  const projectName = $('#project--naming-input').val();  
  $('select').append(`<option value=${projectName}>${$('#project--naming-input').val()}</option>`)
}
