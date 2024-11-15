const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Importamos el modelo videogame.models.js en este nuevo archivo.
const SkateComponent = require('../api/models/skateComponent.model');

const components = [
  {
    "titulo": "Tabla de Skate Modelo X",
    "descripcion": "Tabla de skate de alta calidad fabricada en madera de arce. Medidas: 8.0\" x 31.5\".",
    "enOferta": false,
    "imagen": "imagen1.jpg",
    "precio": 100
  },
  {
    "titulo": "Trucks de Skate Modelo A",
    "descripcion": "Trucks de skate resistentes y duraderos. Tamaño: 139 mm.",
    "enOferta": true,
    "imagen": "imagen2.jpg",
    "precio": 100
  },
  {
    "titulo": "Ruedas de Skate Premium",
    "descripcion": "Ruedas de skate de alto rendimiento para un deslizamiento suave. Dureza: 99A.",
    "enOferta": true,
    "imagen": "imagen3.jpg",
    "precio": 100
  },
  {
    "titulo": "Rodamientos de Skate ABEC-7",
    "descripcion": "Rodamientos de alta velocidad para un deslizamiento suave y rápido.",
    "enOferta": false,
    "imagen": "imagen4.jpg",
    "precio": 100
  },
  {
    "titulo": "Lija de Skate Antideslizante",
    "descripcion": "Lija de skate de calidad superior con agarre antideslizante.",
    "enOferta": false,
    "imagen": "imagen5.jpg",
    "precio": 100
  },
  {
    "titulo": "Tabla de Skate Modelo Y",
    "descripcion": "Tabla de skate de diseño exclusivo. Medidas: 8.25\" x 32\".",
    "enOferta": true,
    "imagen": "imagen6.jpg",
    "precio": 100
  },
  {
    "titulo": "Trucks de Skate Modelo B",
    "descripcion": "Trucks de skate de aluminio ligero. Tamaño: 149 mm.",
    "enOferta": true,
    "imagen": "imagen7.jpg",
    "precio": 100
  },
  {
    "titulo": "Ruedas de Skate de Colores",
    "descripcion": "Ruedas de skate en varios colores vibrantes. Dureza: 101A.",
    "enOferta": false,
    "imagen": "imagen8.jpg",
    "precio": 100
  },
  {
    "titulo": "Rodamientos de Skate ABEC-9",
    "descripcion": "Rodamientos de alta precisión para un deslizamiento suave y silencioso.",
    "enOferta": false,
    "imagen": "imagen9.jpg",
    "precio": 100
  },
  {
    "titulo": "Lija de Skate Personalizada",
    "descripcion": "Lija de skate con diseño personalizado. Agarre óptimo.",
    "enOferta": true,
    "imagen": "imagen10.jpg",
    "precio": 100
  },
  {
    "titulo": "Tabla de Skate Modelo Z",
    "descripcion": "Tabla de skate con gráficos impresionantes. Medidas: 7.75\" x 31\".",
    "enOferta": true,
    "imagen": "imagen11.jpg",
    "precio": 100
  },
  {
    "titulo": "Trucks de Skate Modelo C",
    "descripcion": "Trucks de skate de alta resistencia. Tamaño: 129 mm.",
    "enOferta": false,
    "imagen": "imagen12.jpg",
    "precio": 100
  },
  {
    "titulo": "Ruedas de Skate de Gel",
    "descripcion": "Ruedas de skate de gel para un deslizamiento suave y silencioso. Dureza: 95A.",
    "enOferta": false,
    "imagen": "imagen13.jpg",
    "precio": 100
  },
  {
    "titulo": "Rodamientos de Skate ABEC-5",
    "descripcion": "Rodamientos de calidad a un precio asequible.",
    "enOferta": true,
    "imagen": "imagen14.jpg",
    "precio": 100
  },
  {
    "titulo": "Lija de Skate Transparente",
    "descripcion": "Lija de skate transparente con agarre perfecto.",
    "enOferta": true,
    "imagen": "imagen15.jpg",
    "precio": 100
  },
  {
    "titulo": "Tabla de Skate Modelo W",
    "descripcion": "Tabla de skate de gran durabilidad. Medidas: 7.875\" x 32.25\".",
    "enOferta": false,
    "imagen": "imagen16.jpg",
    "precio": 100
  },
  {
    "titulo": "Trucks de Skate Modelo D",
    "descripcion": "Trucks de skate de diseño ergonómico. Tamaño: 135 mm.",
    "enOferta": true,
    "imagen": "imagen17.jpg",
    "precio": 100
  },
  {
    "titulo": "Ruedas de Skate Todoterreno",
    "descripcion": "Ruedas de skate ideales para terrenos variados. Dureza: 92A.",
    "enOferta": false,
    "imagen": "imagen18.jpg",
    "precio": 100
  },
  {
    "titulo": "Rodamientos de Skate ABEC-3",
    "descripcion": "Rodamientos de entrada de calidad decente.",
    "enOferta": false,
    "imagen": "imagen19.jpg",
    "precio": 100
  },
  {
    "titulo": "Lija de Skate Gráfica",
    "descripcion": "Lija de skate con gráficos llamativos. Agarre excepcional.",
    "enOferta": true,
    "imagen": "imagen20.jpg",
    "precio": 100
  }
]

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos

mongoose.connect(process.env.DB_URL);

mongoose.connect(process.env.DB_URL, { // aqui va el link de mongodb

    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
		// Utilizando Videogame.find() obtendremos un array con todos los juegos de la db
    const allSkateComponent = await SkateComponent.find();
		
		// Si existen juegos previamente, dropearemos la colección
    if (allSkateComponent.length) {
      await SkateComponent.collection.drop(); //La función drop borra la colección
      console.log('Drop database')
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de los juegos, usaremos el array videogames
		// para llenar nuestra base de datos con todas los videojuegos.
		await SkateComponent.insertMany(components);
        console.log(components)
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());





  // node server/api/models/videogames.model.js


  // Si todo ha ido bien debería aparecer en consola el texto: DatabaseCreated