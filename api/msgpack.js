const msgpack = require('msgpack-lite');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  // Collect raw body data
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const rawBody = Buffer.concat(chunks).toString();
  const { text } = JSON.parse(rawBody); // Make sure client sends JSON

  const payload = { text };
  const buffer = msgpack.encode(payload);

  res.setHeader('Content-Type', 'application/msgpack');
  res.status(200).send(buffer);
}
export default function home(req, res){
  res.send("hello worl')}
