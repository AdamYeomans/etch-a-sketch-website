const makeGrid = (rows, cols) => {
  const container = document.getElementById('etch');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  const divsCount = rows * cols;
  for (let index = 0; index < divsCount; index++) {
    const element = document.createElement("div");
    element.onmouseenter = function(){mouseEnter(element)};
    container.appendChild(element);
  }
}

const mouseEnter = (element) => {
  element.style.backgroundColor = currentColor;
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
    // console.log(colorInput.value);
    currentColor = colorInput.value;
  });
  const gridInput = document.getElementById("grid-size");
  gridInput.addEventListener("input", function(){
    // console.log(colorInput.value);
    makeGrid(gridInput.value, gridInput.value);
  });
}

var currentColor = "#000000";



makeGrid(16,16);
bindInput();