const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(routes)

//erro de rota //
app.use((req,res) => {
    const error = new Error('Not Found')

    error.status = 404
    res.json(error)
})


app.listen(3333)