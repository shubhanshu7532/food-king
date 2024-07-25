const { User } = require('../models');

const getAllUsers = async (req, reply) => {
    const users = await User.findAll();
    reply.send(users);
};

const getUserById = async (req, reply) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        reply.send(user);
    } else {
        reply.status(404).send({ message: 'User not found' });
    }
};

const updateUser = async (req, reply) => {
    const { email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
        user.email = email;
        user.role = role;
        await user.save();
        reply.send(user);
    } else {
        reply.status(404).send({ message: 'User not found' });
    }
};

const deleteUser = async (req, reply) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        reply.send({ message: 'User deleted successfully' });
    } else {
        reply.status(404).send({ message: 'User not found' });
    }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
