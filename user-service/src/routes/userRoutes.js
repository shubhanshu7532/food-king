const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const rbac = require('../utils/rbac');

async function routes(fastify, options) {
    fastify.get('/users', { preHandler: rbac('admin') }, getAllUsers);
    fastify.get('/users/:id', { preHandler: rbac('admin') }, getUserById);
    fastify.put('/users/:id', { preHandler: rbac('admin') }, updateUser);
    fastify.delete('/users/:id', { preHandler: rbac('admin') }, deleteUser);
}

module.exports = routes;
