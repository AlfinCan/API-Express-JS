const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require("./response")

app.use(bodyParser.json())

app.get("/", (req, res) => {
  response(200, "data ready", "success",res)
})

app.get("/murid", (req, res) => {
  const sql = "SELECT * FROM murid"
  db.query(sql, (err, fields) => {
    if(err) throw err
    response(200, fields, "murid get list", res)
  })
})

app.get("/murid/:nis", (req, res) => {
  const nis = req.params.nis
  const sql = `SELECT * FROM murid WHERE nis = ${nis}`
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "detail murid", res)
  })
})

app.post("/murid", (req, res) => {
  const { nis, nama, jurusan } = req.body

  const sql = `INSERT INTO murid (nis, nama, jurusan) VALUES (${nis}, '${nama}', '${jurusan}')`

  db.query(sql, (err, fields) => {
    if (err) throw err
    if (fields.affectedRows) {
      response(200, fields.insertId, "data semua murid", res)
    } 
  })
})

app.put("/murid", (req, res) => {
  const { nis, nama, jurusan } = req.body
  const sql = `UPDATE murid SET nama = '${nama}', jurusan = '${jurusan}' WHERE nis = ${nis}`

  db.query(sql, (err, fields) => {
    console.log(fields)
  })
  response(200, "ini mengupdate", "data lucu", res)
})

app.delete("/murid", (req, res) => {
  response(200, "ini menghapus",res)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
