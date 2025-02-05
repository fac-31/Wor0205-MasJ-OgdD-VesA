// On page load
document.addEventListener('DOMContentLoaded', (_event) => {
    if (localStorage.getItem('display-mode') === 'enabled') {
      document.body.classList.add('dark-mode')
    }
  })
  
  // Toggle hidden information
  const toggleButton = document.getElementById('btn-toggle1')
  const hiddenInfo = document.querySelector('.hidden-info')
  
  toggleButton.addEventListener('click', () => {
    hiddenInfo.classList.toggle('hidden-info')
  })
  
  // Change background color of the box
  const colorButton = document.getElementById('btn-change-color')
  const colorBox = document.getElementById('color-box')
  
  let check = true
  colorButton.addEventListener('click', () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    colorBox.style.backgroundColor = randomColor
    colorBox.style.transition = 'ease-in 4s'
    colorBox.style.transform = `rotate(${check ? '360deg' : '0deg'})`
    check = !check
  })
  
  // Dark Mode toggle button
  const darkModeButton = document.createElement('button')
  darkModeButton.id = 'btn-dark-mode'
  darkModeButton.textContent = 'Dark Mode'
  
  const section2 = document.querySelector('#section2')
  section2.appendChild(darkModeButton)
  
  darkModeButton.addEventListener('click', () => {
    toggleDarkMode()
  })
  
  const toggleDarkMode = () => {
    let isDarkMode = document.body.classList.toggle('dark-mode')
    localStorage.setItem('display-mode', isDarkMode ? 'enabled' : 'disabled')
  }
  
  // Form submission handling
  const form = document.getElementById('feedback-form')
  const formResponse = document.getElementById('form-response')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = document.getElementById('name').value
    const feedback = document.getElementById('feedback').value
    const button = document.querySelector('button[value=Submit]')
    if (!name || !feedback) {
      alert('Name or feedback cannot be empty! :)')
    } else {
      const checker = new FormData(form, button)
      for (const [key, value] of checker) {
        formResponse.innerText += `${key}: ${value}\n`
      }
      form.reset()
    }
  })
  // joke api
  let sec3 = document.getElementById('section3')
  let jokeDiv = document.createElement('div')
  jokeDiv.id = 'joker'
  jokeDiv.style.padding = '5px'
  sec3.appendChild(jokeDiv)
  let jokeButt = document.createElement('button')
  jokeButt.innerText = 'Tell me a joke'
  jokeButt.style.width = '100%'
  sec3.appendChild(jokeButt)
  
  async function jokeList() {
    let response = await fetch(
      'https://gist.githubusercontent.com/cynthiateeters/7acb6e858cd803835f917bb7572deeaf/raw/e3bb03b6773f58bd8c66073f9ef5757479725236/jokes.json'
    )
    let jokes = await response.json()
    return jokes
  }
  function jokeFunc() {
    return jokeList().then((jokes) => {
      let len = jokes.length
      let random = Math.floor(Math.random() * len)
      jokeDiv.style.border = 'black solid 2px'
      jokeDiv.innerText = jokes[random].joke
    })
  }
  jokeButt.addEventListener('click', jokeFunc)
  
  // Maze game
  let mazeDiv = document.createElement('div');
  let mazeCanvas = document.createElement('canvas');
  mazeCanvas.id = 'mazeCanvas'
  let ctx = mazeCanvas.getContext('2d');
  mazeCanvas.style.width = '400px';
  mazeCanvas.style.height = '400px';
  let scale = window.devicePixelRatio;
  mazeCanvas.width = Math.floor(400 * scale)
  mazeCanvas.height = Math.floor(400 * scale)
  ctx.scale(scale, scale)
  mazeCanvas.style.border = 'solid black 2px'
  sec3.appendChild(mazeDiv.appendChild(mazeCanvas));
  const maze = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1],
      [1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,1],
      [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,1],
      [1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,0,1],
      [1,0,0,0,0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,1],
      [1,1,1,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1],
      [1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
      [1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,1,0,1,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1],
      [1,1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
    let pos = [1, 0]
  function drawWalls(i, j) {
      ctx.fillStyle = 'red'
      ctx.fillRect((j * 20), (i * 20), 20, 20)
  }
  function drawMe() {
      ctx.fillStyle = 'purple';
      ctx.fillRect((pos[1] * 20), (pos[0] * 20), 20, 20)
  }
  function drawMaze() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < maze.length; i++) {
          for (let j = 0; j < maze[i].length; j++) {
              if (maze[i][j] === 1) {
                  drawWalls(i, j)
              }
          }
      }
      drawMe();
  }
  function directions(event) {
      switch(true) {
          case event.key === 'a' : maze[pos[0]][pos[1] - 1] === 0 ? pos[1] -= 1 : null;
          break;
          case event.key === 'w' : maze[pos[0] - 1][pos[1]] === 0 ? pos[0] -= 1 : null;
          break;
          case event.key === 'd' : maze[pos[0]][pos[1] + 1] === 0 ? pos[1] += 1 : null;
          break;
          case event.key === 's' : maze[pos[0] + 1][pos[1]] === 0 ? pos[0] += 1 : null;
          break;
          default: null;
      }
      console.log(pos)
  }
  document.addEventListener('keypress', directions, false)
  window.setInterval(drawMaze, 1000)
  // Button to show the current weather
  const getWeather = async () => {
    const url = `http://api.weatherapi.com/v1/current.json?key=ab1c8308025e428498b161444250402&q=London&aqi=no`
  
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('HTTP error!')
      }
      const data = await response.json()
      console.log('Weather data, ' + JSON.stringify(data))
    } catch (error) {
      console.error('Error fetching')
    }
  }
  
  const weatherButton = document.createElement('button')
  weatherButton.textContent = 'Show me the weather'
  weatherButton.style.width = '100%'
  weatherButton.style.marginTop = '11px'
  sec3.appendChild(weatherButton)
  weatherButton.addEventListener('click', () => getWeather())
  
  /* PROMPTS FOR ADDITIONAL INTERACTIONS
  
  1. Add functionality to highlight the navigation link of the current section as the user scrolls.
  2. Implement a light/dark mode toggle using CSS root variables.
  3. Create a dynamic list where users can add and remove items.
  4. Add validation to the feedback form to ensure name and feedback are not empty.
  5. Use localStorage to save the user's name for personalized greetings.
  6. Animate the color change of the box with a smooth transition.
  7. Display a live character counter for the feedback textarea.
  8. Implement drag-and-drop functionality for rearranging items in a list.
  9. Add a countdown timer to a section, resetting after it reaches zero.
  10. Fetch and display data from a public API (e.g., random jokes or quotes).
  
  */
  
  
  let gameState = "stopped";
  
  const gameTransitions = {
      stopped: "angling",
      angling: "powering",
      powering: "throwing",
      throwing: "throwing"
  }
  
  const keyDownHandler = (event) => {
      const spaceKey = 32;
      if (event.keyCode === spaceKey) {
          gameState = gameTransitions[gameState];
      }
  }
  
  document.addEventListener('keydown',keyDownHandler)
  
  let ball;
  let powerX;
  let powerY
  let powerChange;
  let angle;
  let angleMultiplier;
  let angleMultiplierChange;
  
  const maxPower = 22;
  const minPower = 2;
  
  const maxAngle = 0.95;
  const minAngle = 0.05;
  
  const gravity = 0.5;
  
  const animateBall = () => {
      ball.x += powerX*Math.cos(angle);
      ball.y += powerY*Math.sin(angle);
      powerY -= gravity;
      console.log(ball.y);
  
      if (ball.x > canvas.width || ball.y < 0) {
          gameState = "stopped";
          initialiseGame();
      }
  }
  
  const animatePowerBar = () => {
  
      powerX += powerChange;
      powerY += powerChange
  
      if (powerX >= maxPower || powerX <= minPower) {
          powerChange *= -1;
      }
  
  }
  
  const animateAngleLine = () => {
  
      angleMultiplier += angleMultiplierChange;
      angle = angleMultiplier*(Math.PI/2);
  
      if (angleMultiplier >= maxAngle || angleMultiplier <= minAngle) {
          angleMultiplierChange *= -1;
      }
  }
  
  const drawBall = (cvs, ctx) => {
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.ellipse(ball.x, cvs.height-ball.y, 20, 20, 0, 0, Math.PI * 2);
      ctx.fill();
  }
  
  const drawPowerBar = (cvs, ctx) => {
      ctx.fillStyle = "red";
      ctx.fillRect(20,(cvs.height-(20+powerX*10)),40,powerX*10)
      ctx.strokeStyle = "black";
      ctx.lineWidth = "3"
      ctx.beginPath();
      ctx.rect(20,(cvs.height-(20+maxPower*10)),40,maxPower*10);
      ctx.stroke();
  }
  
  const drawAngleLine = (cvs, ctx) => {
      ctx.strokeStyle = "black";
      ctx.lineWidth = "5"
      ctx.beginPath();
      ctx.moveTo(100, cvs.height-40);
      ctx.lineTo(100 + Math.cos(angle)*80, cvs.height-(40+Math.sin(angle)*80));
      ctx.stroke();
  }
  
  const drawBin = (cvs, ctx) => {
  
  }
  
  const initialiseGame = () => {
      ball = {
          x: 100,
          y: 40,
      }
  
      powerX = 2;
      powerY = 2;
      angle = 0;
      angleMultiplier = 0;
      powerChange = 2;
      angleMultiplierChange = 0.1;
  
  }
  
  const runGame = () => {
  
  }
  
  const canvasSection = document.createElement('section')
  canvasSection.classList.add('content-section')
  canvasSection.style.display = 'flex'
  canvasSection.style.justifyContent = 'center'
  document.querySelector('main').appendChild(canvasSection)
  
  const canvas = document.createElement('canvas')
  canvas.setAttribute('width', '700')
  canvas.setAttribute('height', '500')
  canvas.style.border = '1px black solid'
  canvasSection.appendChild(canvas)
  
  const context = canvas.getContext("2d");
  
  const test = () => {
      context.clearRect(0,0,canvas.width,canvas.height)
      drawPowerBar(canvas,context);
      drawAngleLine(canvas,context)
      drawBall(canvas,context)
      if (gameState === "angling") {
          animateAngleLine();
      } else if (gameState === "powering") {
          animatePowerBar();
      } else if (gameState === "throwing") {
          animateBall();
      }
  }
  
  initialiseGame();
  setInterval(test, 50);