import { Router, Request, Response } from "express";
import { verificaToken } from "../middlewares/authentication";
import { Post } from "../models/post.model";



const postRoutes = Router();




//CRUD post
//CREATE post
postRoutes.post('/', [verificaToken], async (req: any, res: Response) => {
    try {
        const body = req.body;
        body.usuario = req.usuario._id;

        const postDB = await Post.create(body);

        await postDB.populate('usuario', '-password');

        res.json({
            ok: true,
            post: postDB
        });
    } catch (error) {
        console.error('Error al crear el post:', error);
        res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
});




//READ post paginado
postRoutes.get('/', [verificaToken], async (req: any, res: Response) => {

    /* _id -1 ordenar descendente, empezando por el último */

    /* skip para saltar registros */

    let pagina = Number(req.query.pagina) || 1;

    let skip = pagina - 1;

    skip = skip * 10;

    const posts = await Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();

    res.json({
        ok: true,
        posts


    });
});



// Servicio para subir archivos
postRoutes.post('/upload', [verificaToken], (req: Request, res: Response) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }

    const file = req.files.image

    res.json({
        ok: false,
        mensaje: 'Imagen gestionada',
        file        

    })

    console.log(file)
});





export default postRoutes;