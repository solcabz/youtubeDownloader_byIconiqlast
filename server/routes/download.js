const express = require("express");
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const ytdl = require("ytdl-core");
// const VideoModel = require("../models/VideoModel");
const DownloadedVideosModel = require("../model/DownloadedVideosModel");

const router = express.Router();
const downloadedVideosModel = new DownloadedVideosModel();

const TEMP_DIR = path.join(__dirname, "temp");

// Ensure temporary directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

// Helper function to sanitize file names
const sanitizeFileName = (name) =>
  name.replace(/[^a-z0-9]/gi, "_").toLowerCase();

// Helper function to get the video file path
const getFilePath = (videoTitle, ext) =>
  path.join(TEMP_DIR, `${sanitizeFileName(videoTitle)}.${ext}`);

// Function to download video and audio streams separately using ytdl
const downloadStreams = async (url, selectedFormat) => {
  try {
    const info = await ytdl.getInfo(url);
    let format;
    if (selectedFormat === "4k") {
      format =
        info.formats.find((f) => f.qualityLabel === "2160p") ||
        info.formats.find((f) => f.qualityLabel === "2160p60");
    } else if (selectedFormat === "1080p") {
      format =
        info.formats.find((f) => f.qualityLabel === "1080p") ||
        info.formats.find((f) => f.qualityLabel === "1080p60");
    } else if (selectedFormat === "720p") {
      format =
        info.formats.find((f) => f.qualityLabel === "720p") ||
        info.formats.find((f) => f.qualityLabel === "720p60");
    }

    if (!format) {
      throw new Error(
        `Selected format (${selectedFormat}) is not available for this video.`
      );
    }

    const videoTitle = info.videoDetails.title;
    const videoPath = getFilePath(videoTitle, "video.mp4");
    const audioPath = getFilePath(videoTitle, "audio.mp4");

    const video = ytdl(url, { format });
    const videoWriteStream = fs.createWriteStream(videoPath);
    video.pipe(videoWriteStream);

    const audio = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
    const audioWriteStream = fs.createWriteStream(audioPath);
    audio.pipe(audioWriteStream);

    await Promise.all([
      new Promise((resolve, reject) => {
        videoWriteStream.on("finish", resolve);
        videoWriteStream.on("error", reject);
      }),
      new Promise((resolve, reject) => {
        audioWriteStream.on("finish", resolve);
        audioWriteStream.on("error", reject);
      }),
    ]);

    return { videoTitle, videoPath, audioPath };
  } catch (error) {
    throw new Error(`Error downloading streams: ${error.message}`);
  }
};

router.get("/getVideoInfo", async (req, res) => {
  const { url } = req.query;
  try {
    const info = await ytdl.getInfo(url);
    const qualityLabels = info.formats.map((format) => format.qualityLabel);
    res.json({ videoDetails: info.videoDetails, qualityLabels });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error fetching video info: ${error.message}` });
  }
});

router.get("/video", async (req, res) => {
  const { url, format } = req.query;

  if (!format) {
    return res.status(400).json({ error: "Format parameter is missing" });
  }

  try {
    const { videoTitle, videoPath, audioPath } = await downloadStreams(
      url,
      format
    );
    const outputPath = getFilePath(videoTitle, "mp4");

    const ffmpegArgs = [
      "-y",
      "-i",
      videoPath,
      "-i",
      audioPath,
      "-c:v",
      "copy",
      "-c:a",
      "aac",
      "-strict",
      "experimental",
      "-b:a",
      "192k",
      "-movflags",
      "frag_keyframe+empty_moov",
      "-f",
      "mp4",
      outputPath,
    ];

    const ffmpegProcess = cp.spawn("ffmpeg", ffmpegArgs, {
      stdio: ["ignore", "pipe", "inherit"],
    });

    ffmpegProcess.on("close", (code) => {
      if (code === 0) {
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${sanitizeFileName(videoTitle)}.mp4"`
        );
        const fileStream = fs.createReadStream(outputPath);
        fileStream.pipe(res);

        fileStream.on("end", cleanupTempFiles);
        fileStream.on("error", (err) => {
          res.status(500).json({ error: `Error sending file: ${err.message}` });
          cleanupTempFiles();
        });
      } else {
        res.status(500).json({ error: "Error processing video" });
        cleanupTempFiles();
      }
    });

    function cleanupTempFiles() {
      [videoPath, audioPath, outputPath].forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    downloadedVideosModel.addDownloadedVideo(videoTitle, url, format);
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error downloading video: ${error.message}` });
  }
});

router.get("/audio", async (req, res) => {
  const { url } = req.query;

  try {
    const id = ytdl.getVideoID(url);
    const info = await ytdl.getBasicInfo(id);

    console.log("Downloading music:", info.videoDetails.title);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(
        info.videoDetails.title
      )}.mp3"`
    );
    const audio = ytdl(url, { filter: "audioonly", quality: "highestaudio" });

    audio.pipe(res);

    audio.on("end", () => {
      console.log(`Finished downloading ${info.videoDetails.title}.mp3`);
    });

    audio.on("error", (err) => {
      console.error(`Error downloading audio: ${err.message}`);
      res.status(500).json({ error: "Error downloading audio" });
    });
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    res.status(400).json({ error: "Not a valid URL or something like that" });
  }
});

module.exports = router;
