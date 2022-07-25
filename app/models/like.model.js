module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    userId: {
      type: Sequelize.STRING,
    },
    postId: {
      type: Sequelize.INTEGER,
    },
  });

  return Like;
};
