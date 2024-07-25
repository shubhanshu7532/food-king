require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const sequelize = require('./models').sequelize;
const restaurantRoutes = require('./routes/restaurantRoutes');

fastify.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Restaurant Service',
            description: 'Restaurant Management API',
            version: '1.0.0'
        },
        host: 'localhost:3003',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    },
    exposeRoute: true
});

fastify.register(restaurantRoutes);

const start = async () => {
    try {
        await sequelize.sync();
        await fastify.listen(3003);
        fastify.swagger();
        fastify.log.info(`Restaurant Service listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
