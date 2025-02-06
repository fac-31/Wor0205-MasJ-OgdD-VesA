document.addEventListener("DOMContentLoaded", function () {
  
  loadUsers();

  document.getElementById("userForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const country = document.getElementById("countries").value;
// Jason said this should not be within the form event listener. Move to another file with associated var?
      const response = await fetch("/add-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age, country }),
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
  
      users.forEach(user => {
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
});
