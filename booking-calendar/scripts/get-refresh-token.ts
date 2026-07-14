/**
 * One-time local setup script. Run with `npm run get-token`.
 *
 * Opens the Google OAuth consent screen, catches the redirect on a throwaway local server,
 * exchanges the auth code for tokens, and prints the refresh token to paste into .env.local
 * as GOOGLE_REFRESH_TOKEN. Never runs as part of the deployed app.
 */
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { google } from "googleapis";

/** Minimal .env.local loader — no dotenv dependency needed for a one-time local script. */
function loadEnvLocal() {
  const path = ".env.local";
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf-8").split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) continue;
    const [, key, rawValue = ""] = match;
    if (process.env[key] === undefined) {
      process.env[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  }
}
loadEnvLocal();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing ${name}. Copy .env.example to .env.local and fill in Google client id/secret first.`);
  }
  return value;
}

async function main() {
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3939/oauth2callback";
  const port = Number(new URL(redirectUri).port || 3939);

  const client = new google.auth.OAuth2(requireEnv("GOOGLE_CLIENT_ID"), requireEnv("GOOGLE_CLIENT_SECRET"), redirectUri);

  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // forces a refresh_token even if this account authorized before
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  console.log("\nOpen this URL, sign in with the Google account whose calendar should be used, and approve access:\n");
  console.log(authUrl);
  console.log(`\nWaiting for the redirect back to ${redirectUri} ...\n`);

  const code = await new Promise<string>((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url ?? "/", redirectUri);
      const authCode = url.searchParams.get("code");
      const error = url.searchParams.get("error");
      if (error) {
        res.end(`Google returned an error: ${error}. You can close this tab.`);
        server.close();
        reject(new Error(error));
        return;
      }
      if (!authCode) {
        res.end("No code in redirect — you can close this tab.");
        return;
      }
      res.end("Got it — you can close this tab and go back to the terminal.");
      server.close();
      resolve(authCode);
    });
    server.listen(port);
  });

  const { tokens } = await client.getToken(code);
  if (!tokens.refresh_token) {
    throw new Error(
      "Google didn't return a refresh token. This usually means the account already granted access " +
        "before — go to https://myaccount.google.com/permissions, remove access for this app, and run this script again.",
    );
  }

  console.log("\nAdd this to .env.local:\n");
  console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
