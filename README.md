# Toyota New Vehicle Delivery Experience Survey

React + Vite single-page survey with a Vercel serverless proxy (`/api/submit.js`) that
forwards responses to a Pabbly Connect webhook.

## Stack

- React 18 + Vite
- Deployed on Vercel
- Data capture: Pabbly Connect webhook, called server-side via `/api/submit.js` to avoid
  browser CORS issues

## Local development

```bash
npm install
cp .env.example .env.local   # then set PABBLY_WEBHOOK_URL
npm run dev
```

`vite dev` alone does not run the `/api` serverless function locally. To test the full
submit flow locally, use the Vercel CLI instead:

```bash
npm i -g vercel
vercel dev
```

## Environment variables

| Variable             | Where              | Purpose                                   |
| --------------------- | ------------------ | ------------------------------------------ |
| `PABBLY_WEBHOOK_URL`  | Vercel (server-side) | Pabbly Connect webhook the survey posts to |

Set this under Vercel → Project Settings → Environment Variables. It is only read inside
`api/submit.js`, so it is never sent to the browser.

## URL parameters

The survey link is generated per-dealer/per-customer and accepts:

- `?dealer=` — dealership name, shown on the Overall Experience (OSAT) question and sent
  with the submission. Defaults to "your Toyota dealership" if omitted.
- `?id=` — a survey/customer identifier, sent with the submission so responses can be
  matched back to the delivery record.
- `?expires=YYYY-MM-DD` — the link stops accepting responses after 23:59:59 on this date
  and shows an expiry message instead of the survey. Generate this as "delivery date + 7
  days" when creating links.

Example:

```
https://mahindra-sales-survey.vercel.app/?dealer=Toyota%20Sandton&id=SV-10231&expires=2026-09-02
```

(Replace the domain with wherever this project is deployed — the placeholder above matches
the original spec's example domain.)

## Survey flow

1. **Welcome** — Toyota logo, title, live date/time bar, POPIA privacy notice, required
   consent checkbox.
2. **NPS** — 0–10 recommend score, red→yellow→green colour-coded.
3. **Vehicle Satisfaction** — 5-point scale.
4. **OSAT** — 5-point Overall Experience rating at the dealership named in `?dealer=`.
5. **Dissatisfaction Reasons** — shown only when OSAT is "Poor" or "Unacceptable". Multi-select,
   at least one required; each selected reason reveals an elaboration box; "Dealership
   Facilities" reveals facility sub-options; "Other" requires free text.
6. **Additional Feedback** — required Yes/No; a comment box is required if Yes; a final
   POPIA consent checkbox is always required before submitting.
7. **Thank You** — confirmation, with a note about possible follow-up if any dissatisfaction
   was indicated.

## Data sent to Pabbly

`api/submit.js` forwards this JSON body as-is to `PABBLY_WEBHOOK_URL`:

```json
{
  "surveyId": "from ?id=",
  "dealer": "from ?dealer=",
  "npsScore": 0,
  "vehicleSatisfaction": "Satisfied",
  "osat": "Poor",
  "dissatisfactionReasons": ["documentation_issues", "other"],
  "elaborations": { "documentation_issues": "..." },
  "facilitiesDetail": ["Parking", "Restrooms"],
  "otherReasonText": "...",
  "wantsAdditionalFeedback": "yes",
  "additionalFeedbackText": "...",
  "popiaConsentWelcome": true,
  "popiaConsentFinal": true,
  "startedAt": "2026-08-26T09:00:00.000Z",
  "completedAt": "2026-08-26T09:02:15.000Z",
  "device": { "userAgent": "...", "platform": "...", "language": "en-ZA", "screen": "390x844" }
}
```

## Branding note

The oval mark in the header (`src/components/Header.jsx`) is a hand-drawn placeholder
approximating Toyota's logo shape, not the official logo artwork. Replace it with an
inlined official SVG/PNG asset before going live — swap the `<svg>` block in `Header.jsx`
for an `<img>` pointing at the licensed logo file (or an inlined `<svg>` if you have vector
source, so it can still pick up `currentColor` for the dark header background).

Visual design (black/white with red used sparingly as an accent, pill-shaped buttons, the
Oswald condensed headline font, the oval logo mark) was based on reference screenshots of
toyota.co.za the user supplied directly, since this project could not fetch toyota.co.za
itself — outbound access to that domain is blocked in the build environment. Cross-check
against the live site before shipping, particularly the exact reds/greys and the header
layout on mobile.
