const { Restaurant, MenuItem } = require('../models');

const getAllRestaurants = async (req, reply) => {
  const restaurants = await Restaurant.findAll();
  reply.send(restaurants);
};

const getRestaurantById = async (req, reply) => {
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: MenuItem
  });
  if (restaurant) {
    reply.send(restaurant);
  } else {
    reply.status(404).send({ message: 'Restaurant not found' });
  }
};

const createRestaurant = async (req, reply) => {
  const { name, address, ownerId } = req.body;
  const restaurant = await Restaurant.create({ name, address, ownerId });
  reply.send(restaurant);
};

const updateRestaurant = async (req, reply) => {
  const { name, address } = req.body;
  const restaurant = await Restaurant.findByPk(req.params.id);
  if (restaurant) {
    restaurant.name = name;
    restaurant.address = address;
    await restaurant.save();
    reply.send(restaurant);
  } else {
    reply.status(404).send({ message: 'Restaurant not found' });
  }
};

const deleteRestaurant = async (req, reply) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  if (restaurant) {
    await restaurant.destroy();
    reply.send({ message: 'Restaurant deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Restaurant not found' });
  }
};

module.exports = { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant };
