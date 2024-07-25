require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const sequelize = require('./models').sequelize;
const authRoutes = require('./routes/authRoutes');

fastify.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Auth Service',
            description: 'Authentication API',
            version: '1.0.0'
        },
        host: 'localhost:3001',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    },
    exposeRoute: true
});

fastify.register(authRoutes);

const start = async () => {
    try {
        await sequelize.sync();
        await fastify.listen(3001);
        fastify.swagger();
        fastify.log.info(`Auth Service listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
