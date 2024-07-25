require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const sequelize = require('./models').sequelize;
const userRoutes = require('./routes/userRoutes');

fastify.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'User Service',
            description: 'User Management API',
            version: '1.0.0'
        },
        host: 'localhost:3002',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    },
    exposeRoute: true
});

fastify.register(userRoutes);

const start = async () => {
    try {
        await sequelize.sync();
        await fastify.listen(3002);
        fastify.swagger();
        fastify.log.info(`User Service listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
