import router from "./server.cjs";

router.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
router.get("/about", (req, res) => {
	res.sendFile(__dirname + "/public/about.html");
});
router.get("/about-jaz", (req, res) => {
	res.sendFile(__dirname + "/public/about-jaz.html");
});

//export default router;
