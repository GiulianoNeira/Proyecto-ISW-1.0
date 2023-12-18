const { PORT, HOST } = require("./config/configEnv.js");            // Importa el archivo 'configEnv.js' para cargar las variables de entorno
const cors = require("cors");                                       // Importa el m  dulo 'cors' para agregar los cors
const express = require("express");                                 // Importa el m  dulo 'express' para crear la aplicacion web
const morgan = require("morgan");                                   // Importa morgan para ver las peticiones que se hacen al servidor
const cookieParser = require("cookie-parser");                      // Importa el m  dulo 'cookie-parser' para manejar las cookies
/** El enrutador principal */
const indexRoutes = require("./routes/index.routes.js");
const { setupDB } = require("./config/configDB.js");                // Importa el archivo 'configDB.js' para crear la conexi  n a la base de datos
// Importa el handler de errores
const { handleFatalError, handleError } = require("./utils/errorHandler.js");
const { createRoles, createUsers } = require("./config/initialSetup");

/**
 * Inicia el servidor web
*/
async function setupServer() {
  try {
    /** Instancia de la aplicacion */
    const server = express();
    server.use(express.json());                                       // Agrega el middleware para el manejo de datos en formato JSON
    server.use(cors({ credentials: true, origin: true }));            // Agregamos los cors
    server.use(cookieParser());                                       // Agregamos el middleware para el manejo de cookies
    server.use(morgan("dev"));                                        // Agregamos morgan para ver las peticiones que se hacen al servidor
    server.use(express.urlencoded({ extended: true }));               // Agrega el middleware para el manejo de datos en formato URL
    server.use("/api", indexRoutes);                                  // Agrega el enrutador principal al servidor

    // Inicia el servidor en el puerto especificado
    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

/**
 * Inicia la API
 */
async function setupAPI() {
  try {
    // Inicia la conexi  n a la base de datos
    await setupDB();
    // Inicia el servidor web
    await setupServer();
    // Inicia la creaci  n de los roles
    await createRoles();
    // Inicia la creaci  n del usuario admin y user
    await createUsers();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

// Inicia la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));

