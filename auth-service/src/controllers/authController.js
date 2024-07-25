const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

const register = async (req, reply) => {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });
    const token = generateToken(user);
    reply.send({ token });
};

const login = async (req, reply) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return reply.status(401).send({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    reply.send({ token });
};

module.exports = { register, login };
