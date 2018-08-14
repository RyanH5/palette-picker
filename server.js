const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.get('/', (request, response) => {
  response.send('COLOR PALETTE PICKER IS A PICKIN')
});

app.listen(app.get('port', () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
}));

// app.locals.messages = [
//   { id: 'a1', message: 'Hello World' },
//   { id: 'b2', message: 'Goodbye World' }
// ];