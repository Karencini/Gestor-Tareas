descargar el backend y el frontend
tener postman instalado para realizar las solicitudes de usuarios y tareas
tener mongoDB instalado para administrar la base de datos de la app


al descargar el backend, abres una nueva terminal desde visual Studio code asegurandose estar desde la carpeta backend, (si no está en la carpeta no se ejecutará el servidor), luego de abrir la terminal desde BACKEND, ejecutas el comando "node server.js" esto conectara el servidor
con la base de datos de mongo 

luego abres postman, y pones la siguiente ruta para crear un nuevo usuario/registrar

http://localhost:5000/api/users/register

y dentro del body de postman 

{
 "name": "usuario",
  "email": "usuario1@correo.com",
  "password": "usuario1"
}

obvio en vez de usuario nu nombre, correo y contraseña personalizado
luego iniciamos sesion 
con la ruta en postman 

http://localhost:5000/api/users/login

y el body
{
 
  "email": "usuario1@correo.com",
  "password": "usuario1"
}

ya que solo necesitamos email y contraseña para iniciar sesión, si los datos son correctos nos dará un token unico que expira en 1h, esto es para verificar nuestro login como usuarios y podamos ingresar a ver nuestras tareas
