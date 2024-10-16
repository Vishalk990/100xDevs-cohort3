import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const val = setInterval(function () {
      console.log("inside interval");
      setCount(count+1)
    }, 1000);

    // return function () {
    //   clearInterval(val);
    // };
  },[]);

  return (
    <div>
      <button>{count}</button>
    </div>
  );
}

export default App;
