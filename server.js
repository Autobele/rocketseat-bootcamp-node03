const express = require('express')
const databaseConfig = require('./src/config/database')
const mongoose = require('mongoose')

class App {
    constructor() {
        this.express = express()

        this.database()
        this.middlewares()
        this.routes()
    }

    database() {
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require('./src/routes'))
    }

}

module.exports = new App().express