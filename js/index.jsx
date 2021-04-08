import React, { useState } from "react";
import { render } from "react-dom";
import Button from "./components/Button/Button";

function App() {
  return <Button>Hello World</Button>;
}

render(<App />, document.getElementById("root"));
