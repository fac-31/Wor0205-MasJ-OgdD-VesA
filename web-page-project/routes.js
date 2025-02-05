const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
router.get("/about", (req, res) => {
	res.sendFile(__dirname + "/public/about.html");
});
router.get("/about-jaz", (req, res) => {
	res.sendFile(__dirname + "/public/about-jaz.html");
});
router.get('/storytime', (req, res) => {
    res.sendFile(__dirname + '/public/storytime.html');
});

router.get("/annas-page", (req, res) => {
	res.sendFile(__dirname + "/public/annas-page.html");
});
module.exports = router