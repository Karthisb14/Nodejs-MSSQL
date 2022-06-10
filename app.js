const express = require('express');
const userrouter = require('./Router/user')
require('./db/database')
const studentrouter = require('./Router/student')
const sprouter = require('./Router/storedprocedure')

const app = express()
app.use(express.json())
app.use(userrouter,studentrouter,sprouter)

const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log('Server started on port 3000')
})