const { google } = require("googleapis");
const axios = require("axios");
const youtube1 = google.youtube("v3");
const secrets = require("../secret.json");

const apiKey = "AIzaSyCN5f1MNyDtMCAYmbbKkNp3jCZizIJpXYM";
const apiUrl = "https://www.googleapis.com/youtube/v3";
const channelId = "UCQWbzHC1OZa1iZGKy1tSDkA";
const playlistId = "PLKmLTfiPsZcrtKnTIm2OPIRdy1v47DgNY";
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});

exports.searchVideos = async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    const url = `${apiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;

    const response = await axios.get(url);
    const titles = response.data.items.map((item) => item.snippet.title);

    res.send(titles);
  } catch (err) {
    next(err);
  }
};

exports.showAllVideos = async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchQuery,
    });

    const titles = response.data.items.map((item) => item.snippet.title);
    res.send(titles);
  } catch (err) {
    next(err);
  }
};

exports.showAllChannelVideos = async (req, res, next) => {
  youtube.playlistItems.list(
    {
      key: apiKey,
      part: "id,snippet",
      playlistId: playlistId,
      maxResult: 10,
    },
    (err, results) => {
      console.log(err ? err.message : results.items[0].snippet);
    }
  );
};
