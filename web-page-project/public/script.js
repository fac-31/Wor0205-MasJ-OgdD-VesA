document.addEventListener("DOMContentLoaded", function () {
	loadUsers();

	document
		.getElementById("userForm")
		.addEventListener("submit", async function (e) {
			e.preventDefault();

			const name = document.getElementById("name").value;
			const age = document.getElementById("age").value;

			const response = await fetch("/add-user", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, age }),
			});

			const data = await response.json();

			if (response.ok) {
				loadUsers();
			} else {
				alert(data.message);
			}

			this.reset();
		});

	async function loadUsers() {
		const response = await fetch("/users");
		const users = await response.json();

		const userList = document.getElementById("userList");
		userList.innerHTML = "";

		users.forEach((user) => {
			const li = document.createElement("li");
			li.textContent = `${user.name} (Age: ${user.age})`;
			userList.appendChild(li);
		});
	}

	//WEATHER MAP CALL

	let lat = 33.44;
	let lng = -94.04;

	let weather;

	function weatherCall(lat, lng) {
		let apiKey = "881a29970d23ca3dc651cab604f1690a";

		var WAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

		const response = fetch(WAPI)
			.then((response) => response.json())
			.then((data) => {
				weather = data;
				return weather;
			});
		return response;
	}

	function createHtml() {
        const weatherDiv = document.getElementById("weatherData")
		return weatherCall(lat, lng).then((data) => {
			weatherDiv.innerHTML = `
            <h2>Weather Info</h2>
            <p><strong>Country:</strong> ${data.sys.country}</p>
            <p><strong>Latitude:</strong> ${data.coord.lat}</p>
            <p><strong>Longitude:</strong> ${data.coord.lon}</p>
            <p><strong>Max Temp:</strong> ${data.main.temp_max}°C</p>
            <p><strong>Min Temp:</strong> ${data.main.temp_min}°C</p>
            <p><strong>Current Temp:</strong> ${data.main.temp}°C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        `
		});
	}

	createHtml();
});

//{
//    country: data.sys.country,
//    lat: data.coord.lat,
//    lon: data.coord.lon,
//    maxTemp: data.main.temp_max,
//    minTemp: data.main.temp_min,
//    temperature: data.main.temp,
//    weather: data.weather[0].description,
//};
