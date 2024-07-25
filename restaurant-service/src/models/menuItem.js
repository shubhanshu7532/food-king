module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define('MenuItem', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        restaurantId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });
    return MenuItem;
};
