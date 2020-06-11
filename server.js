const express = require('express');


const server = express();

server.use(express.json());

const Socks = [];
let nextSockId = 1;
// Sock Signature
// { color: aColor, number: anInt, clean: aBoolean }

server.post('/socks', (req, res) => {
  const sock = req.body;
  if (sock.color && sock.number) {

    sock.clean = sock.clean || true;
    sock.id = nextSockId;
    nextSockId += 1;

    Socks.push(sock);
    res.status(201).json(sock);
  } else {
    res.status(500).json({ message: 'Failed to create Sock' });
  }
});

server.delete('/socks/:id', (req, res) => {
  const sockId = req.params.id;
  const sockIndex = Socks.findIndex(sock => sock.id === sockId);
  if (sockIndex > -1) {
    Socks.splice(index, 1);
    res.json({ removed: sockId });
  } else {
    res.status(500).json({ message: `Sock with id ${req.params.id} not found.` });
  }

  // Delete a Sock
});

module.exports = server;
