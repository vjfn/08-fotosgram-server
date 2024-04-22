import { Schema, model, Document } from "mongoose";

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio']

    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    created: {
        type: Date
    },

});

usuarioSchema.pre<IUsuario>('save', function (next) {
    this.created = new Date();
    next();
});

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
    created: Date;
}


export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
export { IUsuario };