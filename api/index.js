const msgpack = require('msgpack-lite');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST method is allowed' });
    return;
  }

  try {
    // Read the raw request body
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBody = Buffer.concat(chunks).toString();

    // Parse JSON body
    const { text } = JSON.parse(rawBody);

    // Encode to MessagePack
    const payload = { text };
    const buffer = msgpack.encode(payload);

    // Set response headers
    res.setHeader('Content-Type', 'application/msgpack');
    res.status(200).send(buffer);
  } catch (err) {
    res.status(400).json({ error: 'Invalid request body' });
  }
}
