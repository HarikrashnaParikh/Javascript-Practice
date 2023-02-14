const { Engine, World, Runner, Render, Bodies, MouseConstraint, Mouse } =
  Matter;
const width = 800;
const height = 600;
const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);
for (let i = 0; i < 20; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
        50,
        50
      )
    );
  } else {
    World.add(
      world,
      Bodies.circle(
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
        30
      )
    );
  }
}

// walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
];
World.add(world, walls);
