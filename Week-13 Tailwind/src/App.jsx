import "./App.css";
import { Home } from "./Home";
import { OtpPage } from "./components/OtpPage";

function App() {
  return (
    <div className="w-screen bg-blue-700 h-screen flex justify-center items-start">
      {/* <Home /> */}
      <OtpPage />
    </div>
  );
}

export default App;
