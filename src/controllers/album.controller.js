import { BaseController } from './base.controller.js';
import Album from '../schemas/album.schema.js';
import { catchAsync } from '../middlewares/catch-async.js';
import { ApiError } from '../utils/custom-error.js';
import { successRes } from '../utils/success-response.js';

class AlbumController extends BaseController {
    create = catchAsync(async (req, res) => {
        if (req.body === undefined) {
            throw new ApiError('Album name is required', 400)
        }

        const existAlbum = await Album.findOne({ name: req.body?.name });
        if (existAlbum) {
            throw new ApiError('Album name already exists', 409);
        }

        const album = await Album.create(req.body);
        return successRes(res, album, 201);
    })

    update = catchAsync(async (req, res) => {
        const id = req.params?.id;
        await this._getById(id);
        
        const { name } = req.body;
        
        if (name) {
            const existAlbum = await Album.findOne({ name });
            if (existAlbum && existAlbum.id != id) {
                throw new ApiError('Album name already exists', 409);
            }
        }

        const album = await Album.findByIdAndUpdate(id, req.body, { new: true });
        return successRes(res, album);
    })
}

const albums = new AlbumController(Album, "musics");

export default albums;