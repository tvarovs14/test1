export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const TG_BOT_TOKEN = '9097595355:AAFGt22Tt9AUVKAQteoY39bMu3CdCV4X1Fg';
  const TG_CHAT_ID = '8359205021';

  const { text } = req.body || {};
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ ok: false, error: 'Empty text' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      return res.status(502).json({
        ok: false,
        error: data.description || 'Telegram API error'
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}