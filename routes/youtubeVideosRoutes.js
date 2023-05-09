const express = require('express');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();

const CLIENT_ID = '215988628472-ej8nukp2prmigjhcuqbhdrovqj8mcava.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

router.get('/auth', (req, res) => {
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  res.redirect(authorizeUrl);
});

router.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    res.redirect('/');

  } catch (error) {
    console.error('Error getting OAuth2 token:', error);
    res.status(500).json({ error: 'Error getting OAuth2 token' });
  }
});

router.get('/playlists', async (req, res) => {
  if (!req.session.tokens) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    '215988628472-ej8nukp2prmigjhcuqbhdrovqj8mcava.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/oauth2callback'
  );

  oauth2Client.setCredentials(req.session.tokens);

  try {
    const playlistItemsResponse = await google.youtube('v3').playlistItems.list({
      auth: oauth2Client,
      part: 'snippet',
      playlistId: req.query.playlistId,
      maxResults: 50
    });

    const videos = playlistItemsResponse.data.items;

    // Fetch additional pages of videos if there are more than 50
    while (playlistItemsResponse.data.nextPageToken) {
      playlistItemsResponse = await google.youtube('v3').playlistItems.list({
        auth: oauth2Client,
        part: 'snippet',
        playlistId: req.query.playlistId,
        maxResults: 50,
        pageToken: playlistItemsResponse.data.nextPageToken
      });

      videos.push(...playlistItemsResponse.data.items);
    }

    res.json(videos);
  } catch (error) {
    console.error('Error retrieving playlist videos:', error);
    res.status(500).json({ error: 'Error retrieving playlist videos' });
  }
});



module.exports = router;