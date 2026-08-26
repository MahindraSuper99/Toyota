// Vercel serverless function: proxies survey submissions to the Pabbly Connect
// webhook. This keeps the Pabbly webhook URL server-side and avoids CORS
// issues that would occur calling Pabbly directly from the browser.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.PABBLY_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('PABBLY_WEBHOOK_URL is not configured');
    return res.status(500).json({ error: 'Survey submission is not configured' });
  }

  let body = req.body;
  if (!body || typeof body !== 'object') {
    try {
      body = JSON.parse(req.body || '{}');
    } catch {
      return res.status(400).json({ error: 'Invalid request body' });
    }
  }

  try {
    const pabblyResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!pabblyResponse.ok) {
      const text = await pabblyResponse.text().catch(() => '');
      console.error('Pabbly webhook error', pabblyResponse.status, text);
      return res.status(502).json({ error: 'Failed to record submission' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error forwarding to Pabbly webhook', err);
    return res.status(502).json({ error: 'Failed to record submission' });
  }
}
