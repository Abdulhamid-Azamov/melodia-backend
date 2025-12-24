import { BaseController } from "./base.controller.js";
import Music from "../schemas/music.schema.js";
import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";

class MusicController extends BaseController {
  constructor() {
    super(Music, 'album');
  }

  getRandom = catchAsync(async (_req, res) => {
    const [music] = await Music.aggregate([{ $sample: { size: 1 } }]);
    if (!music) return res.status(404).json({ message: "Music not found" });

    let populatedTrack = music;
    if (music.album) {
      populatedTrack = await Music.findById(music._id).populate('album', 'name');
    }

    res.json(populatedTrack);
  });

  create = catchAsync(async (req, res) => {
    if (req.body === undefined) {
      throw new ApiError('Author, url and title are required', 400)
    }

    const { title, url, file_id, author, album } = req.body;

    const exists = await Music.findOne({ file_id });
    if (exists) {
      throw new ApiError('This file was already added', 409);
    }

    const data = await this.model.create({
      title,
      url,
      file_id,
      author: author || null,
      album: album || null
    });

    return successRes(res, data, 201);
  });
}

export default new MusicController();