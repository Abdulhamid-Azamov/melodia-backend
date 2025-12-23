import Joi from "joi";

const create = Joi.object({
  title: Joi.string().min(1).required(),
  artist: Joi.string().allow(""),
  url: Joi.string().uri().required(),
  album: Joi.string().hex().length(24).required()
});

const update = Joi.object({
  title: Joi.string().min(1),
  artist: Joi.string().allow(""),
  url: Joi.string().uri(),
  album: Joi.string().hex().length(24)
});

export default {
  create,
  update
};
