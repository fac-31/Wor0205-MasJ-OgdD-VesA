const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/about', (req, res) => {
	res.sendFile(__dirname + '/public/about.html');
});
app.get('/storytime', (req, res) => {
    res.sendFile(__dirname + '/public/storytime.html');
});
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});