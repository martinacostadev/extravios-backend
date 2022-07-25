const db = require("../models");
const Post = db.posts;
const Likes = db.likes;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
    return;
  }

  // Create a Post
  const post = {
    title: req.body.title,
    description: req.body.description,
    city: req.body.city,
    whatsApp: req.body.whatsApp,
    published: req.body.published ? req.body.published : true,
    userId: req.body.userId,
  };

  // Save Post in the database
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const limit = 3;
  const page = req.query.page || 1;
  const offset = limit * (page - 1);

  const title = req.query.title;
  var condition = title
    ? { title: { [Op.like]: `%${title}%` }, published: true }
    : { published: true };

  Post.findAndCountAll({
    offset: offset,
    limit: limit,
    where: condition,
    order: [["id", "DESC"]],
  })
    .then((data) => {
      // const response = {
      //   count: data.count,
      //   rows: data.rows,

      // }

      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "¡Publicación eliminada con éxito!",
        });
      } else {
        res.send({
          message: `No se pudo eliminar la publicación (${id}).`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `No se pudo eliminar la publicación (${id}).`,
      });
    });
};

// find all published Post
exports.findAllPublished = (req, res) => {
  Post.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

// Update a Like Field of Post by the id in the request
exports.like = async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  const foundItem = await Likes.findOne({
    where: { userId: userId, postId: postId },
  });

  if (!foundItem) {
    const body = {
      userId: userId,
      postId: postId,
    };
    // Save Like
    Likes.create(body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Ups! Ocurrió un error inesperado.",
        });
      });
  } else {
    Likes.destroy({
      where: { userId: userId, postId: postId },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Me gusta eliminado con éxito",
          });
        } else {
          res.send({
            message: `No se pudo eliminar el voto (${id}).`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `No se pudo eliminar  el voto (${id}).`,
        });
      });
  }
};
