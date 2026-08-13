import logo from "../assets/VFS-removebg-preview.png";
import "./LoadingScreen.css";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-logo-wrapper">
      <img src={logo} alt="Vectra Loading..." className="loading-logo" />
    </div>
  </div>
);

export default LoadingScreen;
