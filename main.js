const makeGrid = (rows, cols) => {
  const container = document.getElementById('etch');
  // while (container.firstChild) {
  //   container.removeChild(container.firstChild);
  // }
  clearScreen();
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  const divsCount = rows * cols;
  // var currentCount = container.children.length;
  if (container.children.length < divsCount) {
    while (container.children.length < divsCount) {
      const element = document.createElement("div");
      element.onmouseenter = function(){mouseEnter(element)};
      container.appendChild(element);
    }
  }
  else {
    while (container.children.length > divsCount) {
      container.removeChild(container.firstChild);
    }
  }
}

const mouseEnter = (element) => {
  if (currentMode === 'Color') {
    element.style.backgroundColor = currentColor;
    element.className = "";
  } 
  else if (currentMode === 'Rainbow') {
    var currentRainbow = genHexCode();
    element.style.backgroundColor = currentRainbow;
    element.className = "";
  }
  else if (currentMode === 'Greyscale') {
    if (element.style.backgroundColor == "" || element.style.backgroundColor == undefined || element.className == "" || element.className == undefined) {
      element.style.backgroundColor = "#EEEEEE";
      element.className = "E";
      return;
    }
    let color = element.className;
    let indexOfColor = hexCodes.indexOf(color);
    let newColor =  (indexOfColor == 0) ? hexCodes[0] : hexCodes[indexOfColor - 1];
    let returnCol = "#" + newColor + newColor + newColor + newColor + newColor + newColor;
    element.className = newColor;
    element.style.backgroundColor = returnCol;
  }
}

const clearScreen = () => {
  const container = document.getElementById('etch');
  const children = container.children;
  for (let index = 0; index < children.length; index++) {
    const element = children[index];
    element.style.backgroundColor = "#FFFFFF";
  }
}

const bindInput = () => {
  const colorInput = document.getElementById("colorInput");
  colorInput.addEventListener("input", function(){
    currentColor = colorInput.value;
  });
  const gridInput = document.getElementById("grid-size");
  gridInput.addEventListener("input", debounce(() => {
    makeGrid(gridInput.value, gridInput.value);
  }, 1000));
  gridInput.value = 16;
}

const mode = (modeType) => {
  if (modeType === 'Color') {
    currentMode = 'Color';
  } 
  else if (modeType === 'Rainbow') {
    currentMode = 'Rainbow';
  }
  else if (modeType === 'Greyscale') {
    currentMode = 'Greyscale';
  }
}

const genHexCode = () => {
  let code = "#";
  for (let index = 0; index < 6; index++) {
    code += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return code;
}

function debounce(callback, wait) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

var currentColor = "#000000";
var currentMode = 'Color';
const hexCodes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

makeGrid(16,16);
bindInput();