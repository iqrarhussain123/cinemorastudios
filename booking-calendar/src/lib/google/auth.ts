import { google } from "googleapis";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}. See .env.example.`);
  }
  return value;
}

/**
 * OAuth2Client carrying only a refresh token (no access token). googleapis exchanges it for a
 * short-lived access token on the first API call and transparently refreshes it after that, so
 * nothing here ever needs to store or rotate an access token itself.
 */
export function getGoogleAuthClient() {
  const client = new google.auth.OAuth2(requireEnv("GOOGLE_CLIENT_ID"), requireEnv("GOOGLE_CLIENT_SECRET"));
  client.setCredentials({ refresh_token: requireEnv("GOOGLE_REFRESH_TOKEN") });
  return client;
}
