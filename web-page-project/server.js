const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const browserSync = require('browser-sync');

app.use((req, res, next) => {
	console.log(`Request: ${req.method} ${req.url}`);
	next();
});
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
app.get("/about", (req, res) => {
	res.sendFile(__dirname + "/public/about.html");
});
app.get("/about-jaz", (req, res) => {
	res.sendFile(__dirname + "/public/about-jaz.html");
});

app.get("/annas-page", (req, res) => {
	res.sendFile(__dirname + "/public/annas-page.html");
});

app.get("/about/:name", (req, res) => {
	const user = req.params.name;
	res.sendFile(__dirname + `/public/about-${user}.html`);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

browserSync.init({
	proxy: http://localhost:${PORT},
	files: ['public/*/.*'], 
	reloadDelay: 50,
  });
