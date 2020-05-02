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
  const { name, bug_type, bug_detail } = request.body

  pool.query('INSERT INTO bug (name, bug_type, bug_detail) VALUES ($1, $2, $3) RETURNING id', [name, bug_type, bug_detail], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Bug added with ID: ${results.rows[0].id}`)
  })
}

const updateBug = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, bug_type, bug_detail } = request.body

  pool.query(
    'UPDATE bug SET name = $1, bug_type = $2, bug_detail = $3 WHERE id = $4',
    [name, bug_type, bug_detail, id],
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
