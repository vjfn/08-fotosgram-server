import Server from './classes/server';
import userRoutes from './routes/usuario';

import mongoose from 'mongoose';

import cors from 'cors';

import bodyParser from 'body-parser';
import postRoutes from './routes/post';

import fileUpload from 'express-fileupload'


const server = new Server();


//MIDDLEWARE el orden es importante, segun su uso

//bodyParser-Middleware body parser va siempre primero
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//fileUpload-Middleware, gestor de archivos
server.app.use( fileUpload());

//Configurar CORS
server.app.use(cors({ origin: true, credentials: true}));

//Rutas de mi app, las rutas van al final
server.app.use('/', userRoutes) 
server.app.use('/user', userRoutes)
server.app.use('/posts', postRoutes)

//Conexion a DB (protocolo,puerto,nombre de bd)
//TODO Conexion segura a BD
mongoose.connect(`mongodb://localhost:27017/fotosgram`);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // estamos conectados!
    console.log('Connected to MongoDB');
});


// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto: ${server.port}`)
})