import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String},
},{
  versionKey: false,
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});


albumSchema.virtual('musics',{
  ref: 'Music',
  localField: '_id',
  foreignField: 'album'
})


export default mongoose.model("Album", albumSchema);