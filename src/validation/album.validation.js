import Joi from "joi";

class AlbumValidator{
    create(data){
        const album = Joi.object({
            name: Joi.string().max(50).required(),
            artist: Joi.string().optional() 
        });
        return album.validate(data);
    }

    update(data){
        const album = Joi.object({
            name: Joi.string().max(50).optional(),
            artist: Joi.string().optional() 
        });
        return album.validate(data);
    }
}

export default new AlbumValidator();