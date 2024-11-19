const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
}) //logger, pokazuje logi w terminalu

app.use(express.urlencoded({ extended: false })) //handle urlencoded form data
app.use(express.json()) //obsługa json
app.use(express.static(path.join(__dirname, 'public'))) //obsługa plików statycznych np. css z folderu public


app.listen(PORT, () => console.log(`server running on ${PORT}`))