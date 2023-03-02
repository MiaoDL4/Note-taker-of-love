const express = require('express');
const path = require('path');
const notesRoute = require('./routes/notes');

//set up express
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('public'));
app.use(express.json()); 
app.use('/api', notesRoute);

// app.get('/', (req, res) => //not needed
//     res.sendFile(path.join(__dirname, './public/index.html'))
// );

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('*', (req, res) => //catch all
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
