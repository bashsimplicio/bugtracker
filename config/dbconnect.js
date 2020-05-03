const Pool = require('pg').Pool

const pool = new Pool({
  host:process.env.PG_HOST,
  port:process.env.PG_PORT,
  database: process.env.PG_DB_NAME,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
})

pool.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
    console.log('port', pool.port)
  }
})

module.exports={pool}

// var { Client } = require('pg')

// var client = new Client({
//     host:process.env.PG_HOST,
//     port:process.env.PG_PORT,
//     database: process.env.PG_DB_NAME,
//     user:process.env.PG_USER,
//     password:process.env.PG_PASSWORD,
// })

// module.exports={client}
