const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response 
        .status(422)
        .send({error: `Expected format: {name:<String>} You're missing a "${requiredParameter}" property.`});
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0]})
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});


app.post('/api/v1/palettes', (request, response) => {
  console.log(request.body['project_id'])
  if(!request.body.name) {
    return response.status(422).send({Error: "Must provide palette name"})
  }

  database('projects').where({'name':request.body['project_id']}).select('id')
  .then(id => {
      request.body['project_id'] = id[0]['id']
      database('palettes').insert(request.body, ['id', 'name', 'color1', 'color2', 'color3', 'color4', 'color5', 'project_id'])
      .then(palette => {
          response.status(201).json({
            new_palette: palette[0]
          })
        })
        .catch(error => {
          console.log('second')
          response.status(500).json({ error })
        })
      })
  .catch(error => {
    console.log('first')
    response.status(500).json({ error })
  })
})


  
  // database('palettes').insert(request.body, ['id', 'name', 'color1', 'color2', 'color3', 'color4', 'color5', 'project_id'])
  // .then(palette => {
  //     response.status(201).json({
  //       new_palette: palette[0]
  //     })
  //   })
  //   .catch(error => {
  //     response.status(500).json({ error })
  //   })
  // })

  app.get('/api/v1/palettes', (request, response) => {
    database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes)
    })
    .catch((error) => {
      response.status(500).json({ error })
    });
  });
  
  app.listen(app.get('port'), () => {
    console.log(`PalettePicker is running on ${app.get('port')}.`);
  });
  
  app.get('/api/v1/projects', (request, response) => {
    database('projects').select()
      .then((projects) => {
        response.status(200).json(projects)
      })
      .catch((error) => {
        response.status(500).json({ error })
      });
  });

module.exports = app;