const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.static('.')); // servidor de staticos como http-server .
app.get('/*', (req, res) => {
   res.sendFile(__dirname + '/');
});

app.listen(PORT, () => {
   console.log('Listening...');
});
