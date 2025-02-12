const { getFacts } = require('./public/api-1-data') 
const express = require("express");
const app = express();

const browserSync = require('browser-sync');

const routes = require("./routes")

const PORT = process.env.PORT || 3000;

const dotenv = require('dotenv').config();

const cors = require('cors');

const OpenAi = require('openai')

app.use(express.json());

app.use(cors());

const country_facts = new OpenAi({
	apiKey: process.env.API_KEY
});
//Form
// Middleware to parse JSON data from requests

app.get("/form", (req, res) => {
	res.sendFile(__dirname + "/public/form.html");
});
const users = [];
// \/:name?
app.post("/add-user", (req, res) => {
    
	const { name, age, country, flag } = req.body;
	console.log(req.body)
	if (!name || !age) {
	  return res.status(400).json({ message: "Both name and age are required!" });
	}

	const userExists = users.some(user => user.name.toLowerCase() === name.toLowerCase() )
	if (userExists) {
        return res.status(400).json({ message: "User already exists!" });
    }

  
	const newUser = { id: users.length + 1, name, age, country, flag };
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
app.use('/', routes);
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});


app.get('/api/goodbye', (req, res) => {
    res.json({ message: 'Goodbye cruel world!' });
});
// openai;

app.post("/api/country-facts", async (req, res) => {
		let jsonObject = req.body
		let name = jsonObject.name;
		let age = jsonObject.age;
		let country = jsonObject.country;
		console.log("making open ai call")
		const openaiRes = await getFacts(country_facts, name, age, country);
		res.send(openaiRes)
		console.log("complete")
});


app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});


browserSync.init({
	proxy: `http://localhost:${PORT}`,
	files: ['public/*/.*'], 
	reloadDelay: 50,
  });

