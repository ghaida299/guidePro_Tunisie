
/**
 * DRIVE_API_CONFIG
 * 
 * To make this work:
 * 1. Run 'node server.js' on your computer (Port 3001).
 * 2. Share your Drive folder with the Service Account email.
 */
export const DRIVE_API_CONFIG = {
  // Point to the local bridge server
  UPLOAD_ENDPOINT: 'http://localhost:3001/api/upload-to-drive',
  
  // The ID of the folder from your screenshot
  TARGET_FOLDER_ID: '10kcfdOHjftB82XBadXlkDpHCepypnXnz', 
  
  // UI Metadata
  PROVIDER: 'Google Cloud Service Account',
  AUTH_METHOD: 'OAuth2 Server-to-Server',
  
  // Set to true if you want to skip the backend requirement during UI testing
  IS_MOCK_MODE: false 
};
