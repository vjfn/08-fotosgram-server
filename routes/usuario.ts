import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt'
import Token from '../classes/token';
import { verificaToken } from "../middlewares/authentication";

const userRoutes = Router();

//Login

userRoutes.post('/login', async (req: Request, res: Response) => {
    try {
        const userDB = await Usuario.findOne({ email: req.body.email });

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        if (userDB.compararPassword(req.body.password)) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser 
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error) {
        console.error('Error al buscar usuario en la base de datos:', error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor'
        });
    }
});


//CRUD
//CREATE
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }

    Usuario.create(user).then(userDB => {

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser 
        });

        res.json({
            ok: true,
            user: userDB
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    })

});

//UPDATE
userRoutes.put('/update', verificaToken, async (req: any, res: Response) => {
    try {
        const user = {
            nombre: req.body.nombre || req.usuario.nombre,
            email: req.body.email || req.usuario.email,
            avatar: req.body.avatar || req.usuario.avatar,
        };

        const userDB = await Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe usuario con esa ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        return res.json({
            ok: true,
            token: tokenUser 
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
});

/* userRoutes.put('/update', verificaToken, (req: any, res: Response) => {

    const user = {
        nombre: req.body.nombre,
        email: req.body.nombre,
        avatar: req.body.nombre
    }

    Usuario.findByIdAndUpdate(req.usuario._id, user,{new: true},(err, userDB) => {

        if(err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe usuario con esa ID'
            });
        }

                    const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser 
            });

    });

    res.json({
        ok: true,
        usuario: req.usuario
    });
});
 */

userRoutes.get('/', [verificaToken], (req: any, res: Response) => {

    const usuario = req.usuario;

    res.json({
        ok:true,
        usuario
    })
})


//TEST

userRoutes.get('/healthcheck', (req: Request, res: Response) => {

    res.json({
        health: 'Ok'
    })
})


export default userRoutes;