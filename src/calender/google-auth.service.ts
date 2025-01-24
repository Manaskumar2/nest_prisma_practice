import { google } from 'googleapis';

export class GoogleAuthService {
  private oAuth2Client;

  constructor() {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS); // Load your credentials JSON here
    const { client_id, client_secret, redirect_uris } = credentials.web;

    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  }

  generateAuthUrl() {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getTokens(code: string) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);
    return tokens;
  }

  getAuthClient() {
    return this.oAuth2Client;
  }
}
