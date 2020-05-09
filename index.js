const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./controller/bug')
const dbProject = require('./controller/project')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

//Bug Endpoints
app.get('/bugs', db.getBugs)
app.get('/bugs/:id', db.getBugsById)
app.post('/bugs', db.createBug)
app.put('/bugs/:id', db.updateBug)
app.delete('/bugs/:id', db.deleteBug)

//Project Endpoints
app.get('/project', dbProject.getProjects)
app.get('/project/:id', dbProject.getProjectById)
app.post('/project', dbProject.createProject)
app.put('/project/:id', dbProject.updateProject)
app.delete('/project/:id', dbProject.deleteProject)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
