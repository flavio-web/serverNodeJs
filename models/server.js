const express = require('express');
const cors = require('cors')

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //CONNECT BD
        this.connectDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE MI APP
        this.routes();
    }

    async connectDB(){
        //await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //PARSEO Y LECTURA BODY
        this.app.use(express.json());

        //archivos estaticos
        this.app.use(express.static('public'));

        //manajear carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use('/api/users', require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;