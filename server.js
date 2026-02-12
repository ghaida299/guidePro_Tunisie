
/**
 * GUIDEPRO BACKEND BRIDGE
 * 
 * Usage:
 * 1. Place 'service-account.json' in this directory.
 * 2. Run: npm install express googleapis multer cors
 * 3. Run: node server.js
 */

const express = require('express');
const { google } = require('googleapis');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const KEY_FILE_PATH = path.join(__dirname, 'service-account.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Initialize Auth
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

app.post('/api/upload-to-drive', upload.single('file'), async (req, res) => {
  try {
    const { targetFolderId } = req.body;
    const file = req.file;

    if (!file) return res.status(400).send('No file uploaded.');
    if (!fs.existsSync(KEY_FILE_PATH)) {
      return res.status(500).send('Service Account JSON key missing on server.');
    }

    const response = await drive.files.create({
      requestBody: {
        name: file.originalname,
        parents: [targetFolderId],
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
      fields: 'id, name, webViewLink',
    });

    // Cleanup temp file
    fs.unlinkSync(file.path);

    console.log(`Successfully uploaded: ${file.originalname}`);
    res.json(response.data);
  } catch (error) {
    console.error('Drive API Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`
  🚀 GuidePro Bridge running at http://localhost:${PORT}
  📂 Ensure folder is shared with Service Account email.
  `);
});
