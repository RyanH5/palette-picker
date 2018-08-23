

exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'Project1'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { name: 'business', 
              color1: "#AF220C",
              color2: "#B33E43",
              color3: "#7B6874",
              color4: "#666370",
              color5: "#4C1A33",
              project_id: project[0]
            },
            { name: 'spring time', 
              color1: "#53B4D8",
              color2: "#34C45D",
              color3: "#3CBA66",
              color4: "#9F021C",
              color5: "#C30550",
              project_id: project[0]
            },
            { name: 'Cold Colors', 
              color1: "#53B2D8",
              color2: "#14C45D",
              color3: "#3CBA46",
              color4: "#9F041C",
              color5: "#A10550",
              project_id: project[0]
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};