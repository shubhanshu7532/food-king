const { register, login } = require('../controllers/authController');

async function routes(fastify, options) {
    fastify.post('/register', register);
    fastify.post('/login', login);
}

module.exports = routes;
