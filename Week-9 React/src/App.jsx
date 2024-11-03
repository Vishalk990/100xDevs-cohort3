import { logo } from "./assets";
import PostComponent from "./PostComponent";
import ToggleMessage from "./ToggleMessage";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#dfe6e9",
        height: "95vh",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
		<ToggleMessage/>
		<ToggleMessage/>
		<ToggleMessage/>
        {/* <PostComponent
          name={"Vishal"}
          subtitle={"21,200 followers"}
          time={"36m ago"}
          imageUrl={logo}
          description={"Want to know how to get remote Jobs?"}
        />
        <PostComponent
          name={"Harkirat"}
          subtitle={"Promotion"}
          imageUrl={"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png"}
          description={"Buy my course"}
        /> */}
      </div>
    </div>
  );
}

export default App;
