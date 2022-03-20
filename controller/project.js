require('dotenv').config()
const Pool = require('pg').Pool
const pool = require('../config/dbconnect').pool


const getProjects = (request, response) => {
    pool.query('SELECT * FROM project ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getProjectById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM project WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createProject = (request, response) => {
    const { project_name, team } = request.body
  
    pool.query('INSERT INTO project (project_name, team) VALUES ($1, $2)', [project_name, team], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Project added with ID: ${results.insertId}`)
    })
}

const updateProject = (request, response) => {
    const id = parseInt(request.params.id)
    const { project_name, team } = request.body
  
    pool.query(
      'UPDATE project SET project_name = $1, team = $2 WHERE id = $3',
      [project_name, team, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Project modified with ID: ${id}`)
      }
    )
}

const deleteProject = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM project WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Project deleted with ID: ${id}`)
    })
}

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
}
