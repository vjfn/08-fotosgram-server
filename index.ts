import Server from './classes/server';
import userRoutes from './routes/usuario';

import mongoose from 'mongoose';

import bodyParser from 'body-parser';



const server = new Server();


//Middleware bodyparser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Rutas de mi app
server.app.use('/user', userRoutes)

//Conexion a DB (protocolo,puerto,nombre de bd)


//Conexion segura a BD
mongoose.connect(`mongodb://localhost:27017/fotosgram`);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // estamos conectados!
  console.log('Connected to MongoDB');
});    


// Levantar express
server.start( ()=> {
    console.log(`Servidor corriendo en puerto: ${server.port}`)
})