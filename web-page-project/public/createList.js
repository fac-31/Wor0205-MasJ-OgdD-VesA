// Move createList function to its own file. Import / require getcountries module. Probs don't need latlng setAttr?
/*
let countries = require('./getCountries.js')
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
