import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String},
  url: { type: String, required: true },
  album: { ref: "Album",type: mongoose.Schema.Types.ObjectId, required: true}
},{
  versionKey: false,
  timestamps: true
});

musicSchema.index({title: "text"})
musicSchema.index({artist: "text"})

export default mongoose.model("Music", musicSchema);