const express = require('express')
const app = express()
app.get('/api/info', (req, res) => {
    res.json({
        name:"123",
        age:5,
        msg:"hello"
    })
})
app.listen('9092')