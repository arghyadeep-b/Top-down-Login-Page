;const express = require('express');
const cors = require('cors')  
const app = express();

const db = require('./db/index.js');

const port = 4000;
const reactClient = 'http://localhost:3000'; 
const path = require('path')

app.use(express.static('../build'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use( 
    cors({ 
        origin: reactClient, 
        credentials: true
    })
)

app.post('/register', db.register) 

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port, (req, res) => {
    console.log(`Server is up on port ${port}`)
})