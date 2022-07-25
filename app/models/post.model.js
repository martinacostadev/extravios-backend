module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    whatsApp: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    userId: {
      type: Sequelize.STRING,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
  });

  return Post;
};
