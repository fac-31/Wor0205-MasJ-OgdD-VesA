let apiData = {};

//variables for form input
let name;
let age;
let country;

//for selected user
const userList = document.getElementById("userList");
let userCountry;
let lat;
let lng;
let weather;

//function to load script
document.addEventListener("DOMContentLoaded", function () {
	// Makes api call and creates `apiData` object
	async function getCountries() {
		let countries = await fetch(
			"https://restcountries.com/v3.1/all?fields=name,latlng,flag"
		)
			.then((response) => response.json())
			.then((data) => {
				return data.map((val) => {
					apiData[val.name.common] = {
						name: val.name.common,
						latlng: val.latlng,
					};
				});
			});
		return countries;
	}

	// Populates drop down with list o
	async function createList() {
		console.log("create list");
		//allows you to select existing users
		loadUsers();

		await getCountries();
		let list = document.getElementById("countries");
		for (const [key, value] of Object.entries(apiData)) {
			let opt = document.createElement("option");
			opt.value = opt.textContent = value.name;
			list.appendChild(opt);
		}
	}

	//event listener for user input form
	//stores user input in variables (variables are sent to `/add-user` in server.js)
	//calls `loadUsers()` when `/add-user` data is fetched
	document
		.getElementById("userForm")
		.addEventListener("submit", async function (e) {
			e.preventDefault();

			name = document.getElementById("name").value;
			age = document.getElementById("age").value;
			country = document.getElementById("countries").value;

			const response = await fetch("/add-user", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, age, country }),
			});

			const data = await response.json();
			console.log("Once or twice?");
			if (response.ok) {
				loadUsers();
			} else {
				alert(data.message);
			}

			this.reset();
		});

	//fetches user data from 'users` route
	// AND displays data in HTML element
	async function loadUsers() {
		const response = await fetch("/users");
		const users = await response.json();
		console.log(users);

		userList.innerHTML = "";

		users.forEach((user) => {
			const ul = document.createElement("ul");
			const li = document.createElement("li");
			const a = document.createElement("a");

			a.textContent = `${user.name} (Age: ${user.age}) ${user.country}`;
			a.href = "#";
			a.id = user.country;
			a.className = "user-countries";
			let country;

			li.appendChild(a);
			userList.appendChild(li);
		});
	}

	//sets country variable to selected users country
	userList.addEventListener("click", setCountry);
	function setCountry(event) {
		event.preventDefault();
		userCountry = event.target.id;

		createHtml();
	}

	//makes api call to get weather info for users country
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

	//Uses api data to display the weather for the users chosen country
	function createHtml() {
		lat = apiData[userCountry].latlng[0];
		lng = apiData[userCountry].latlng[1];

		let flagUrl = apiData[userCountry].flag;
		console.log(flagUrl);

		const weatherDiv = document.getElementById("weatherData");

		return weatherCall(lat, lng).then((data) => {
			weatherDiv.classList.remove("hidden");
			weatherDiv.innerHTML = `
      <h2>Weather Info</h2>
      <p><strong>User:</strong> <span>${name}</span></p>
      <p><strong>Country:</strong> <span>${data.sys.country}</span></p>
      <p><img src="${flagUrl}" alt="Flag of ${userCountry}" style="width:100px; height:auto;"/></p>
      <p><strong>Latitude:</strong> <span>${data.coord.lat}</span></p>
      <p><strong>Longitude:</strong> <span>${data.coord.lon}</span></p>
      <p><strong>Max Temp:</strong> <span>${Math.floor(data.main.temp_max - 272.15)}°C</span></p>
      <p><strong>Min Temp:</strong> <span>${Math.floor(data.main.temp_min - 272.15)}°C</span></p>
      <p><strong>Current Temp:</strong> <span>${Math.floor(data.main.temp - 272.15)}°C</span></p>
      <p><strong>Weather:</strong> <span>${data.weather[0].description}</span></p>
      `;
		});
	}

	createList();
});
