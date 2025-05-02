const express = require('express');
const msgpack = require('msgpack-lite');

const app = express();
const PORT = 3000;

app.get('/msgpack', (req, res) => {
    const text = req.body.text
  const payload = { text: text };
  const buffer = msgpack.encode(payload);

  res.set('Content-Type', 'application/msgpack');
  res.send(buffer);
});

app.get('/', (req, res) => {
res.send("hello")
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
