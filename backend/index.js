;const express = require('express');
const cors = require('cors')  
const app = express();

const db = require('./db/index.js');
const jwt = require('./auth/jwt.js')
const hash = require('./auth/hash.js')

const port = 4000;
const reactClient = 'http://localhost:3000'; 
const path = require('path');

app.use(express.static('../build'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use( 
    cors({ 
        origin: reactClient, 
        credentials: true
    })
)

async function encrypt(req, res, next) {
    let encryptedPassword = await hash.encrypt(req.body.password);
    
    req.body.password = encryptedPassword;
    next()
}

async function authenticate(req, res, next) {
    let user = await db.getUser(req.body);

    if (!user) {
        res.status(401).send("Can't authenticate email");
    } else if (!(await hash.comparePassword(req.body.password, user.password))) {
        res.status(401).send("Can't authenticate password")
    } else {
        req.user = user;
        next()
    }
}

app.post('/login', authenticate, async (req, res) => {
    const token = jwt.generateToken(req.user);
    res.status(200).json(token)
})

app.post('/register', encrypt, db.register) 

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port, (req, res) => {
    console.log(`Server is up on port ${port}`)
})