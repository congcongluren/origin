(
  <h1 id="title">
    <span>
      hello
    </span>
    world
  </h1>
)


React.createElement('h1', {
  id: "title"
}, React.createElement("span", null, "hello"), "world")