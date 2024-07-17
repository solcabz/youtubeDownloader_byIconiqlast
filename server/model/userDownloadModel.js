const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DownloadSchema = new Schema({
  videoTitle: { type: String, required: true },
  resolution: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming User model exists
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DownloadList", DownloadSchema);
