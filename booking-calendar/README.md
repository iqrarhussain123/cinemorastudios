# Booking Calendar

A self-hosted booking page (Cal.com-style: month calendar + time slots) that reads your real
Google Calendar availability and creates a Google Meet link when someone books a call. Single
Google account, your own branding, no third-party scheduling service.

## 1. Google Cloud setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project
   (or reuse one).
2. **APIs & Services > Library** — enable the **Google Calendar API**.
3. **APIs & Services > OAuth consent screen** — choose **External**, fill in the required
   fields, and add your own Google account under **Test users**. "Testing" publishing status
   is fine for personal use; you don't need Google's app review.
4. **APIs & Services > Credentials > Create Credentials > OAuth client ID**:
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:3939/oauth2callback`
5. Copy the generated **Client ID** and **Client secret**.

## 2. Local setup

```bash
npm install
cp .env.example .env.local
```

Fill in `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`, then run:

```bash
npm run get-token
```

This opens a Google consent screen in your terminal output — open the URL, sign in with the
Google account whose calendar you want to use, and approve access. It prints a
`GOOGLE_REFRESH_TOKEN` — paste that into `.env.local` too. This is a one-time step; the app
never needs your Google password or runs OAuth again after this.

## 3. Configure branding & hours

Edit `src/lib/config.ts` — host/company name, logo, meeting title/description, testimonials,
accent color, working hours, timezone, meeting duration, how far ahead people can book, and
minimum notice. No database, no admin UI — it's a plain config object.

Drop a logo image in `public/` and point `logoUrl` at it (e.g. `/logo.png`), or leave it as-is
to show an initial-letter avatar instead.

## 4. Run it

```bash
npm run dev
```

Open http://localhost:3000 — pick a date, pick a time, book. A real Google Calendar event is
created with a Google Meet link, and both you and the visitor get an email invite.

## 5. Deploy

Any Next.js host works (Vercel is the path of least resistance: `vercel deploy`). Set
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REFRESH_TOKEN` as environment variables
on the host — `GOOGLE_REDIRECT_URI` is only needed locally for `npm run get-token` and isn't
used by the deployed app.

If the refresh token ever stops working (e.g. you revoke access in your Google account), just
rerun `npm run get-token` locally and update the env var on your host.
