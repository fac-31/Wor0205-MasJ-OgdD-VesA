const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = app.Router();

app.use("/", router);

app.use((req, res, next) => {
	console.log(`Request: ${req.method} ${req.url}`);
	next();
});

app.use(express.static("public"));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default router;
