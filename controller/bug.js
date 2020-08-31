require('dotenv').config()
const Pool = require('pg').Pool
const pool = require('../config/dbconnect').pool


const getBugs = (request, response) => {
  pool.query('SELECT * FROM bug ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getBugsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM bug WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createBug = (request, response) => {
  const { bug_name, severity, bug_detail, priority, project_id, device, browser, status, date_reported } = request.body

  pool.query('INSERT INTO bug (bug_name, severity, bug_detail, priority, project_id, device, browser, status, date_reported) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
             [bug_name, severity, bug_detail, priority, project_id, device, browser, status, date_reported], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Bug added with ID: ${results.insertId}`)
  })
}

const updateBug = (request, response) => {
  const id = parseInt(request.params.id)
  const { bug_name, severity, bug_detail, priority, project_id, device, browser, status, date_reported } = request.body

  pool.query(
    'UPDATE bug SET bug_name = $1, severity = $2, bug_detail = $3, priority = $4, project_id = $5, device = $6, browser = $7, status = $8, date_reported = $9 WHERE id = $10',
    [bug_name, severity, bug_detail, priority, project_id, device, browser, status, date_reported, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Bug modified with ID: ${id}`)
    }
  )
}

const deleteBug = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM bug WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Bug deleted with ID: ${id}`)
  })
}

module.exports = {
  getBugs,
  getBugsById,
  createBug,
  updateBug,
  deleteBug,
}
