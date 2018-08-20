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
          response.status(500).json({ error })
        })
      })
  .catch(error => {
    response.status(500).json({ error })
  })
});

  app.get('/api/v1/palettes', (request, response) => {
    database('palettes').join('projects', 'palettes.project_id', '=',  'projects.id').select('projects.name as project_name',
                          'palettes.name as palette_name',
                          'palettes.color1',
                          'palettes.color2',
                          'palettes.color3',
                          'palettes.color4',
                          'palettes.color5',
                          'palettes.id as palette_id'
                        )
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

  app.post('/api/v1/palettes/delete', (request, response) => {
    console.log('sdfdsfsfs')
    database('palettes').where('id', request.id).del()
    .then(id => {
      response.status(200).json(id)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
  });



module.exports = app;