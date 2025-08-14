const app = require('express');
const app = app()
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors());
app.use(app.json());

app.get('/', (req, res)=> {
    
})