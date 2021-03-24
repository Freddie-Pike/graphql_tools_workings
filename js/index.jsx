import React, { useState } from "react";
import { render } from "react-dom";
import Button from "./components/Button/Button";
import styles from "./app.scss";

function App() {
  console.dir(styles);
  console.log(styles.mainPageWrapper);
  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.classSidebar}></div>
      <div className={styles.messageSection}></div>
      <div className={styles.classList}></div>
    </div>
  );
}

render(<App />, document.getElementById("root"));
