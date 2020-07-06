const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors")
const db = require('./controller/bug')
const dbProject = require('./controller/project')
const path = require('path')
const port = 8080

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))

 
app.get('/', (request, res) => {
  res.json({ message: "Bug Tracker"})
})

//Bug Endpoints
app.get('/bugs', db.getBugs)
app.get('/bugs/:id', db.getBugsById)
app.post('/bugs', db.createBug)
app.put('/bugs/:id', db.updateBug)
app.delete('/bugs/:id', db.deleteBug)

//Project Endpoints
app.get('/projects', dbProject.getProjects)
app.get('/projects/:id', dbProject.getProjectById)
app.post('/project', dbProject.createProject)
app.put('/projects/:id', dbProject.updateProject)
app.delete('/project/:id', dbProject.deleteProject)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
