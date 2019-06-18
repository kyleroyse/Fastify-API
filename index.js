
/************************************* Fastify ***************************************/

// Require the framework and instantiate it
const fastify = require('fastify')()

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0', function (err, address) {
        if (err) {
          fastify.log.error(err)
          process.exit(1)
        }
        fastify.swagger();
        fastify.log.info(`server listening on ${address}`);
      })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

/************************************* Fastify ***************************************/

/************************************* MongoDB ***************************************/

// Require external modules
const mongoose = require('mongoose')

// Connect to DB
mongoose.connect('mongodb://localhost/mycargarage')
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err))

const MongoClient = require('mongodb').MongoClient;

/************************************* MongoDB ***************************************/

/************************************** Routes ***************************************/

const routes = require('./routes');

// Initialize routes with Fastify
routes.forEach((route, index) => {
    fastify.route(route)
   });
/*********************************** Routes *****************************************/

/*********************************** Swagger ****************************************/

// Import Swagger Options
const swagger = require('./config/swagger');

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);
/*********************************** Swagger ****************************************/
