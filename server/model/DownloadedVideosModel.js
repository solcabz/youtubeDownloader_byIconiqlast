class DownloadedVideosModel {
  constructor() {
    this.downloadedVideos = [];
  }

  addDownloadedVideo(title, url, format) {
    this.downloadedVideos.push({ title, url, format });
  }

  getAllDownloadedVideos() {
    return this.downloadedVideos;
  }
}

module.exports = DownloadedVideosModel;
