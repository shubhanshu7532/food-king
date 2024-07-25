const { verifyToken } = require('./jwt');

function rbac(...allowedRoles) {
    return async (request, reply, next) => {
        try {
            const token = request.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);
            if (!allowedRoles.includes(decoded.role)) {
                return reply.status(403).send({ message: 'Forbidden' });
            }
            next();
        } catch (err) {
            reply.status(401).send({ message: 'Unauthorized' });
        }
    };
}

module.exports = rbac;
