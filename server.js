const express = require('express');
// import express
const app = express();
// create app using express
const bodyParser = require('body-parser'); 
// import body parser
const environment = process.env.NODE_ENV || 'development';
// set environment to development if not specified otherwise
const configuration = require('./knexfile')[environment];
// set config to environment
const database = require('knex')(configuration);
// create knex using configuration

app.set('port', process.env.PORT || 3000);
// make port dynamic for heroku but default to 3000 otherwise
app.use(express.static('public'));
// use static assets from public directory
app.use(bodyParser.json());
// use bodyparser to parse body responses

app.post('/api/v1/projects', (request, response) => {
  // route handler for this endpoint
  const project = request.body;
  // capture body as variable

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      // To create a project user must provide a name or get an error
      return response 
        .status(422)
        .send({error: `Expected format: {name:<String>} You're missing a "${requiredParameter}" property.`});
    }
  }

  database('projects').insert(project, 'id')
  // insert project into projects table with an id
    .then(project => {
      // no problem: good status code, store request.body (name in this case)
      response.status(201).json({ id: project[0]})
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});


app.post('/api/v1/palettes', (request, response) => {
  // To create a new palette user must provide a name or get an error
  if(!request.body.name) {
    return response.status(422).send({Error: "Must provide palette name"})
  }

  database('projects').where({'name':request.body['project_id']}).select('id')
  // look in projects table, get the id that matches the project_id
  .then(id => {
      request.body['project_id'] = id[0]['id']
      // project_id equals first id
      database('palettes').insert(request.body, ['id', 'name', 'color1', 'color2', 'color3', 'color4', 'color5', 'project_id'])
      // insert row w/ necessary palette info
      .then(palette => {
        // all good
          response.status(201).json({
            new_palette: palette[0]
          })
        })
        .catch(error => {
          // errored 
          response.status(500).json({ error })
        })
      })
  .catch(error => {
    response.status(500).json({ error })
    // errored in outside fn
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
                        // to retrieve project name and all palette info in one fetch, join tables and select desired content
    .then((palettes) => {
      // all good
      response.status(200).json(palettes)
    })
    .catch((error) => {
      // errored
      response.status(500).json({ error })
    });
  });
  
  app.listen(app.get('port'), () => {
    // shows in terminal that servers running and on which port
    console.log(`PalettePicker is running on ${app.get('port')}.`);
  });
  
  app.get('/api/v1/projects', (request, response) => {
    // route handler at /projects endpoint
    database('projects').select()
    // get data in projects table
      .then((projects) => {
        response.status(200).json(projects)
      })
      .catch((error) => {
        response.status(500).json({ error })
      });
  });

  app.post('/api/v1/palettes/delete', (request, response) => {
    // multiple attempts late but doesnt work
    database('palettes').where('id', request.id).del()
    .then(id => {
      response.status(200).json(id)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
  });

  app.delete('/api/v1/palettes', (request, response) => {             
    // route handler for a DELETE request to /palettes
    const { id } = request.body
                                           
    database('palettes')     
    // target palettes table
      .where({ 'id': id })   
      // find the id passed in from request
      .del()     
        // delete that row
      .then((palette) => {    
        // success 
        response.status(204).json(palette)                           
      })              
      .catch((error) => {   
        // failure           
        response.status(500).json({ error })   
      })
  })



module.exports = app;