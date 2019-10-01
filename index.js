const server = require('./server')

server.listen(3000, err => {
    if(err) throw err
    console.log('Server running')
})