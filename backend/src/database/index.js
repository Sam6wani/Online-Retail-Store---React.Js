const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Import models
db.user = require("./models/user")(db.sequelize, DataTypes);
db.product = require("./models/product")(db.sequelize, DataTypes);
db.cart = require("./models/cart")(db.sequelize, DataTypes);
db.cartItem = require("./models/cartItem")(db.sequelize, DataTypes);
db.reviews = require("./models/review")(db.sequelize, DataTypes);

// Set up associations
db.user.hasOne(db.cart, { foreignKey: "user_id" });
db.cart.belongsTo(db.user, { foreignKey: "user_id" });

db.cart.hasMany(db.cartItem, { foreignKey: "cart_id" });
db.cartItem.belongsTo(db.cart, { foreignKey: "cart_id" });

db.product.hasMany(db.cartItem, { foreignKey: "product_id" });
db.cartItem.belongsTo(db.product, { foreignKey: "product_id" });

db.user.hasMany(db.reviews, { foreignKey: "user_id", sourceKey: "user_id" });
db.reviews.belongsTo(db.user, { foreignKey: "user_id", targetKey: "user_id" });

db.product.hasMany(db.reviews, {
  foreignKey: "product_id",
  sourceKey: "product_id",
});
db.reviews.belongsTo(db.product, {
  foreignKey: "product_id",
  targetKey: "product_id",
});

// Include a sync option with seed data logic included.
db.sync = async () => {
  try {
    // Sync schema.
    await db.sequelize.sync();

    // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
    // await db.sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
    await seedData();
  } catch (error) {
    console.error("Failed to synchronize database:", error);
  }
};

async function seedData() {
  try {
    // Seed users
    const userCount = await db.user.count();
    if (userCount === 0) {
      const argon2 = require("argon2");

      // Hash the password and create the first user
      let hash = await argon2.hash("abc123", { type: argon2.argon2id });
      await db.user.create({
        username: "dhanush",
        email: "dhanush@gmail.com", // Added the email field
        password_hash: hash,
        first_name: "dhanush",
        last_name: "sasa",
      });

      // Hash another password and create the second user
      hash = await argon2.hash("123456", { type: argon2.argon2id });
      await db.user.create({
        username: "kamal",
        email: "kamal@gmail.com", // Added the email field
        password_hash: hash,
        first_name: "kamal",
        last_name: "datta",
      });
    }

    // Seed products
    const productCount = await db.product.count();
    console.log(`Product count: ${productCount}`); // Debug logging
    if (productCount === 0) {
      await db.product.bulkCreate([
        {
          name: 'Organic Avocado Oil',
          image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Cold-pressed avocado oil, rich in nutrients and perfect for cooking or skincare.',
          price: 12.99,
          quantity: 10,
          unit: "pint",
          isSpecial: true,
          specialPrice: 3.49,
        },
        {
          name: 'Himalayan Pink Salt',
          image: 'https://images.unsplash.com/photo-1633727783375-750547d0fc21?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Pure, unrefined Himalayan pink salt, packed with essential minerals for a healthier diet.',
          price: 8.99,
          quantity: 10,
          unit: "12oz jar",
          isSpecial: true,
          specialPrice: 5.98,
        },
        {
          name: 'Organic Quinoa',
          image: 'https://plus.unsplash.com/premium_photo-1664476002571-ead0cbfc6d74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Premium organic quinoa, a versatile and nutritious grain for salads, bowls, and more.',
          price: 5.99,
          quantity: 10,
          unit: "quart",
          isSpecial: false,
          specialPrice: null,
        },
        {
          name: 'Raw Honey',
          image: 'https://images.unsplash.com/photo-1550411294-098af68c8c2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Locally sourced raw honey, unpasteurized and full of natural enzymes and antioxidants.',
          price: 10.49,
          quantity: 10,
          unit: "bag",
          isSpecial: false,
          specialPrice: null,
        },
        {
          name: 'Green Tea Leaves',
          image: 'https://plus.unsplash.com/premium_photo-1661594835845-7035de5abb30?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'High-quality green tea leaves, packed with antioxidants for a refreshing and health-boosting beverage.',
          price: 7.99,
          quantity: 10,
          unit: "bag",
          isSpecial: false,
          specialPrice: null,
        },
        {
          name: 'Organic Fruit Basket',
          image: 'https://images.unsplash.com/photo-1519097000072-e44ffa116485?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'A delightful assortment of fresh, organic fruits sourced from local farms.',
          price: 29.99,
          quantity: 10,
          unit: "12oz jar",
          isSpecial: true,
          specialPrice: 20.99,
        }, 
        {
          name: 'Superfood Smoothie Kit',
          image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Kickstart your day with our superfood smoothie kit, packed with antioxidants and nutrients.',
          price: 19.99,
          quantity: 10,
          unit: "12oz jar",
          isSpecial: true,
          specialPrice: 16.99,
        }, 
        {
          name: 'Organic Spice Set',
          image: 'https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Elevate your culinary creations with our premium organic spice set, sourced from around the world.',
          price: 14.99,
          quantity: 10,
          unit: "12oz jar",
          isSpecial: true,
          specialPrice: 10.88,
        },
        {
          name: 'Healthy Snack Pack',
          image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Stay fueled throughout the day with our curated selection of healthy snacks, perfect for on-the-go lifestyles.',
          price: 9.99,
          quantity: 10,
          unit: "12oz jar",
          isSpecial: true,
          specialPrice: 8.99,
        },
        {
          name: 'Gourmet Tea Sampler',
          image: 'https://images.unsplash.com/38/QoR8Bv1S2SEqH6UcSJCA_Tea.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Indulge in a variety of gourmet teas from across the globe with our exclusive sampler pack.',
          price: 17.99,
          quantity: 10,
          unit: "12oz jar",
          isSpecial: true,
          specialPrice: 15.98,
        },
      ]);
      console.log("Seed data added successfully.");
    }
  } catch (error) {
    console.error("Failed to seed data:", error);
  }
}

module.exports = db;
