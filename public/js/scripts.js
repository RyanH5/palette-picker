const colorPossibilities = document.querySelectorAll('.color--palette-possibility');
var colorList = [ {'saved': false}, 
                  {'saved': false},
                  {'saved': false},
                  {'saved': false},
                  {'saved': false}
                ]

window.onload = createColorPalette()
window.onload = fetchProjects();
// window.onload = fetchProjectPalettes();
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
  const palette = {
    name: $('#palette--naming-input').val(),
    color1: colorList[0].color,
    color2: colorList[1].color,
    color3: colorList[2].color,
    color4: colorList[3].color,
    color5: colorList[4].color,
    project_id: $('#projects--dropdown').val()
  }
  postPalette(palette);
  $('#colpickerproject_' + $('#projects--dropdown').val()).append(`
      <article>
        <h3 class="palette--title">${$('#palette--naming-input').val()}</h3>
        <ul class="palette-splotches">
          <li style='background-color:${colorList[0].color}' class="splotch"></li>
          <li style='background-color:${colorList[1].color}' class="splotch"></li>
          <li style='background-color:${colorList[2].color}' class="splotch"></li>
          <li style='background-color:${colorList[3].color}' class="splotch"></li>
          <li style='background-color:${colorList[4].color}' class="splotch"></li>
        </ul>
        <i class="fas fa-trash-alt"></i>
      </article>`);
}

function saveProject(event) {
  event.preventDefault();
  const projectName = $('#project--naming-input').val();
    $('#colpickerproject_' + projectName).prepend(`
    <div id=colpickerproject_${projectName}><h2 class="project-name">${projectName}</h2></div>`)
  addProjectToSelect(projectName);
  $('#project--naming-input').val('');
  postProject(projectName);
}

async function fetchProjects() {
  const response = await fetch('http://localhost:3000/api/v1/palettes');
  const palettes = await response.json();
  const sortedPalettes = groupPalettesByProject(palettes);
  const projectNames = Object.keys(sortedPalettes);
  projectNames.forEach(name => {
    $('#saved--projects').prepend(`<div id=colpickerproject_${name}><h2 class="project-name">${name}</h2></div>`)
    sortedPalettes[name].forEach(palette => {
      $('#colpickerproject_' + palette.project_name).append(`
      <article>
        <h3 class="palette--title">${palette.palette_name}</h3>
        <ul class="palette-splotches">
          <li style='background-color:${palette.color1}' class="splotch"></li>
          <li style='background-color:${palette.color2}' class="splotch"></li>
          <li style='background-color:${palette.color3}' class="splotch"></li>
          <li style='background-color:${palette.color4}' class="splotch"></li>
          <li style='background-color:${palette.color5}' class="splotch"></li>
        </ul>
        <i class="fas fa-trash-alt"></i>
      </article>`);

      const project_names = []
      $('select option').each(function() { 
        project_names.push( $(this).attr('value') );
      });
      if (!project_names.includes(palette.project_name)) {
        $('select').append(`<option value=${palette.project_name}>${palette.project_name}</option>`)
      }
  })
  })
}

function groupPalettesByProject(palettes) {
  return palettes.reduce((projects, palette) => {
    if (!projects[palette.project_name]) {
      projects[palette.project_name] = []
    } 
    projects[palette.project_name].push(palette)
    return projects;
  }, {})
}

async function postProject(newProject) {
  const url = 'http://localhost:3000/api/v1/projects/';
  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({name: newProject}),
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    })
  const projectData = await response.json();
};

async function postPalette(newPalette) {
  const url = 'http://localhost:3000/api/v1/palettes/';
  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newPalette),
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    })
  const paletteData = await response.json();
};

function addProjectToSelect(chars) {
  const projectName = $('#project--naming-input').val();  
  $('select').append(`<option value=${projectName}>${$('#project--naming-input').val()}</option>`)
}

