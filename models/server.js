const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
        }

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json() ); 

        //Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {

        //La ruta que se pone puede ser cualquiera
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}

module.exports = Server;