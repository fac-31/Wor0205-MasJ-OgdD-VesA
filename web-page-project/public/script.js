document.addEventListener("DOMContentLoaded", function () {
  
  loadUsers();

  document.getElementById("userForm").addEventListener("submit", async function (e) {
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

  
      users.forEach(user => {
          const li = document.createElement("li");
          li.textContent = `${user.name} (Age: ${user.age})`;
          userList.appendChild(li);
      });
  }
});
