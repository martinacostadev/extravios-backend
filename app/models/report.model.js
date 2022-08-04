module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define("report", {
    postId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.STRING,
    },
  });

  return Report;
};
