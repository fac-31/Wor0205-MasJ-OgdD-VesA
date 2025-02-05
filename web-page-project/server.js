const express = require("express");
const app = express();
const routes = require("./routes")
const PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
	console.log(`Request: ${req.method} ${req.url}`);
	next();
});
app.use(express.static("public"));
app.use('/', routes);
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

app.get("/annas-page", (req, res) => {
	res.sendFile(__dirname + "/public/annas-page.html");
});

app.get('/api/goodbye', (req, res) => {
    res.json({ message: 'Goodbye cruel world!' });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
