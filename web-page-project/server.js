const express = require("express");
const app = express();
const browserSync = require('browser-sync');
const PORT = process.env.PORT || 3000;

app.use(express.json());




//Form
// Middleware to parse JSON data from requests

app.get("/form", (req, res) => {
	res.sendFile(__dirname + "/public/form.html");
});
const users = [];
app.post("/add-user", (req, res) => {

	const { name, age } = req.body;
	
	if (!name || !age) {
	  return res.status(400).json({ message: "Both name and age are required!" });
	}


  
	const newUser = { id: users.length + 1, name, age };
	users.push(newUser);
  
	res.status(201).json({ message: "User added!", user: newUser });
  });
  
  
  app.get("/users", (req, res) => {
	res.json(users);
  });

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

app.get('/storytime', (req, res) => {
    res.sendFile(__dirname + '/public/storytime.html');
});



app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

browserSync.init({
	proxy: `http://localhost:${PORT}`,
	files: ['public/*/.*'], 
	reloadDelay: 50,
  });
