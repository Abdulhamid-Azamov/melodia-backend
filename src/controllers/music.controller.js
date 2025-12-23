import Music from "../schemas/music.schema.js";
import { BaseController } from "./base.controller.js";

class MusicContreoller extends BaseController {

    constructor() {
        super(Music)
    }


    async search(req, res) {
        
        const { q, page = 1, limit = 10 } = req.params;
        console.log(q);
        
        

        const regex = new RegExp(`^${q}`, "i");
        const skip = (page - 1) * limit

        const musics = await this.model
            .find({ title: regex })
            .skip(skip)
            .limit(1)
            .select("title artist cover playCount")


        res.json({
            q,
            page,
            limit,
            count: musics.length,
            data: musics
        })
    }
}

export default new MusicContreoller(Music, "album");