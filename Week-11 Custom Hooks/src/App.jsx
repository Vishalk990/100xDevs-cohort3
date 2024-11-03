import "./App.css";
import { useFetch, usePrev } from "../hooks/useFetch";
import { useRef, useState } from "react";

function useDebounce(originalFn) {
  const clock = useRef();

  const fn = () => {
    clearTimeout(clock.current);
    clock.current = setTimeout(originalFn, 200);
  };

  return fn;
}

function App() {
  // const [currentPost, setCurrentPost] = useState(1);
  // const { data, loading } = useFetch(
  //   "https://jsonplaceholder.typicode.com/posts/" + currentPost
  // );

  // const [count, setCount] = useState(0);
  // const prev = usePrev(count);
  function sendDataToBackend() {
    fetch("https://www.google.com/");
  }

  const debouncedFn = useDebounce(sendDataToBackend);

  // if (loading) return "Loading......";
  return (
    <div>
      {/* <button onClick={() => setCurrentPost(1)}>1</button>
      <button onClick={() => setCurrentPost(2)}>2</button>
      <button onClick={() => setCurrentPost(3)}>3</button>
      <br />
      <div style={{ margin: 10 }}></div>
      {JSON.stringify(data)}

      <div>
        <p>{count}</p>
        <button onClick={() => setCount((curr) => curr + 1)}>Click me</button>
        <p>Previous val: {prev}</p>
      </div> */}

      <div>
        <input type="text" placeholder="search.." onChange={debouncedFn} />
      </div>
    </div>
  );
}

export default App;
