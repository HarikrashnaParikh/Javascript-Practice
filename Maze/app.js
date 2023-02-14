const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
const cellsHorizontal = 14;
const cellsVertical = 14;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;

const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

// walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 5, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 5, height, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 5, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 5, height, { isStatic: true }),
];
World.add(world, walls);

// Maze generation

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
  if (grid[row][column]) {
    return;
  }
  grid[row][column] = true;

  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
    [row, column + 1, "right"],
  ]);
  //   shuffle(neighbors);
  //   console.log(neighbors);

  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue;
    }
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    // console.log(verticals);
    if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "right") {
      verticals[row][column] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else if (direction === "down") {
      horizontals[row][column] = true;
    }

    stepThroughCell(nextRow, nextColumn);
  }
};
stepThroughCell(startRow, startColumn);
// console.log(grid);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      unitLengthX * columnIndex + unitLengthX / 2,
      unitLengthY * rowIndex + unitLengthY,
      unitLengthX,
      5,
      {
        label: "wall",
        isStatic: true,
      }
    );
    World.add(world, wall);
  });
});
verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      unitLengthX * columnIndex + unitLengthX,
      unitLengthY * rowIndex + unitLengthY / 2,
      5,
      unitLengthY,
      {
        label: "wall",
        isStatic: true,
      }
    );
    World.add(world, wall);
  });
});
// Creating Start state
const startStateRadius = Math.min(unitLengthX, unitLengthY);
const startState = Bodies.circle(
  unitLengthX / 2,
  unitLengthY / 2,
  startStateRadius / 4,
  {
    label: "startState",
  }
);
World.add(world, startState);

// Creating Goal
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  { isStatic: true, label: "goal" }
);
World.add(world, goal);

document.addEventListener("keydown", (e) => {
  const { x, y } = startState.velocity;
  //   console.log(x, y);
  //   console.log(e);
  if (e.keyCode === 87 || e.keyCode === 38) {
    // console.log("up");
    Body.setVelocity(startState, { x, y: y - 1 });
  }
  if (e.keyCode === 83 || e.keyCode === 40) {
    // console.log("down");
    Body.setVelocity(startState, { x, y: y + 1 });
  }
  if (e.keyCode === 65 || e.keyCode === 37) {
    // console.log("left");
    Body.setVelocity(startState, { x: x - 1, y });
  }
  if (e.keyCode === 68 || e.keyCode === 39) {
    // console.log("right");
    Body.setVelocity(startState, { x: x + 1, y });
  }
});

// Win detection
Events.on(engine, "collisionStart", (e) => {
  e.pairs.forEach((pair) => {
    const { bodyA, bodyB } = pair;
    const label = ["startState", "goal"];
    // console.log(pair);
    if (label.includes(bodyA.label) && label.includes(bodyB.label)) {
      //   console.log("Win");
      world.gravity.y = 1;
      world.bodies.forEach((item) => {
        if (
          item.label === "wall" ||
          item.label === "goal" ||
          item.label === "startState"
        ) {
          Body.setStatic(item, false);
        }
      });
    }
  });
});
