
const response = await fetch("/add-user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, age, country }),
});



document.addEventListener("DOMContentLoaded", function () {
	loadUsers();

  //event listener for user input form
  //stores user input in variables
	document
		.getElementById("userForm")
		.addEventListener("submit", async function (e) {
			e.preventDefault();

      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const country = document.getElementById("countries").value;
// Jason said this should not be within the form event listener. Move to another file with associated var?


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
			li.textContent = `${user.name} (Age: ${user.age}) ${user.country}`;
			userList.appendChild(li);
		});
	}
// Move get countries to its own file. Then export it - modules.export etc. 
  async function getCountries() {
    let countries = await fetch("https://restcountries.com/v3.1/all?fields=name,latlng")
    .then((response) => response.json())
    .then((data) => {
        return data
    });
    return countries
  }
// Move createList function to its own file. Import / require getcountries module. Probs don't need latlng setAttr?
  async function createList(){
    let data = await getCountries();
    let list = document.getElementById("countries");
        data.map((val) => {
            let opt = document.createElement("option")
            opt.setAttribute("latlng", val.latlng)
            opt.value = val.name.common
            opt.textContent = val.name.common
            list.appendChild(opt)
        });
  };
  // Leave create list here. Import create list to use in dom content loaded.
 createList()

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
		const weatherDiv = document.getElementById("weatherData");
		return weatherCall(lat, lng).then((data) => {
			weatherDiv.innerHTML = `
            <h2>Weather Info</h2>
            <p><strong>Country:</strong> <span>${data.sys.country}</span></p>
            <p><strong>Latitude:</strong> <span>${data.coord.lat}</span></p>
            <p><strong>Longitude:</strong> <span>${data.coord.lon}</span></p>
            <p><strong>Max Temp:</strong> <span>${Math.floor(data.main.temp_max - 272.15)}°C</span></p>
            <p><strong>Min Temp:</strong> <span>${Math.floor(data.main.temp_min - 272.15)}°C</span></p>
            <p><strong>Current Temp:</strong> <span>${Math.floor(data.main.temp - 272.15)}°C</span></p>
            <p><strong>Weather:</strong> <span>${data.weather[0].description}</span></p>
        `;
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
