<!-- Instalar el typscript -->
npm install -g typescript

<!-- Crear el index.js a traves del index.ts -->
tsc index.ts

<!-- Crear el ts tsconfig.json para darle parametros de inicio al tsc -->
 tsc --init  

<!-- Iniciamos el watch de tsc para que haga la compilacion automaticamente-->
tsc -w

<!-- Modulos utilizados -->
npm install express //crear servidor web yservidor rest
npm install body-parser // recibir informacion del post y transformarlo en un objeto de .js
npm install cors //peticiones cross-domain
npm install mongoose //interacciones con la base de datos
npm install express-fileupload //recibir peticiones de imagenes y gestionarlas
npm install jsonwebtoken //web token para mantener de forma pasiva la sesion activa del usuario
npm install bcrypt //encriptar las contraseñas de los usuarios y tener almacenadas las contraseñas de forma segura


npm install express body-parser cors mongoose express-fileupload jsonwebtoken bcrypt



npm install @types/express --save-dev //instalacion del tipado

npm install @types/mongoose --save-dev //instalacion del tipado