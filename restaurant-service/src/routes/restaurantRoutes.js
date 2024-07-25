const { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const rbac = require('../utils/rbac');

async function routes(fastify, options) {
    fastify.get('/restaurants', getAllRestaurants);
    fastify.get('/restaurants/:id', getRestaurantById);
    fastify.post('/restaurants', { preHandler: rbac('restaurant') }, createRestaurant);
    fastify.put('/restaurants/:id', { preHandler: rbac('restaurant') }, updateRestaurant);
    fastify.delete('/restaurants/:id', { preHandler: rbac('admin') }, deleteRestaurant);
}

module.exports = routes;
