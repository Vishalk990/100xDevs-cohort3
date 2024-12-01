import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      {count}
      <br></br>
      <button onClick={() => setCount((c) => c + 1)}>Increase counter</button>
    </>
  );
}

export default App;
