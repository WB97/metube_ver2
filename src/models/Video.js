import mongoose from "mongoose";

// export const formatHashtags = (hashtags) => {
//   return hashtags
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// };

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, require: true },
    rating: { type: Number, default: 0, require: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

const video = mongoose.model("video", videoSchema);
export default video;
