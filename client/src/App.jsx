import "./App.css";
import { Outlet } from "react-router-dom";

// import Header from "./components/header/index";
// import Footer from "./components/footer/index";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
