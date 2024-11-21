const path = require('path')

const handle_main = (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'src', 'index.html'))
}

module.exports = { handle_main }