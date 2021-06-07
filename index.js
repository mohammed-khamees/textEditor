const express = require('express');
const http = require('http');
const socket = require('socket.io');
const app = express();
const port = 3500;

const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
	socket.on('codeText', (code) => {
		socket.broadcast.emit('code-update', code);
	});

	socket.on('themeChange', (theme) => {
		io.emit('theme-update', theme);
	});

	socket.on('languageChange', (language) => {
		io.emit('language-update', language);
	});
});

app.get('/', (req, res) => {
	res.json('hello');
});

server.listen(port, () => {
	console.log(`Heared from ${port}`);
});
