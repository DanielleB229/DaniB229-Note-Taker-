// Dependencies

const express = require('express');
const path = require('path');
var data = require('./db/db.json');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 
var idCount = 0;


data = data.map(x => {
    x.id = idCount++; 
    return x;
})



app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// Displays all notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));


app.get('/api/notes', (req, res) => {
    
      return res.json(data);
});

// adding the delete method with a path variable called ID
app.delete('/api/notes/:id', (req, res) => {
    var id= +req.params.id 
    data.splice(data.indexOf(data.find(x => x.id === id)),1);
    return res.json(data);
});


app.get('/api/notes/:id', (req, res) => {
    var id= +req.params.id 
    return res.json(data.find(x => x.id === id));

});

// Create New Characters - takes in JSON input
app.post('/api/notes', (req, res) => {
 
  const newNote = req.body;
  newNote.id = idCount++; 
  // We then add the json the user sent to the json notes  array
  data.push(newNote);

  // We then display the JSON to the users
  return res.json(data);
});

// Start the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));


function _log(obj){
    console.log(obj);
}