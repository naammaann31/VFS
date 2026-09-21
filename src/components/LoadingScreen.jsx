import logo from "../assets/VFS-removebg-preview.png";
import "./LoadingScreen.css";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-logo-wrapper">
      <img
        src={logo}
        alt="Vectra Foreign Services"
        className="loading-logo"
        width="500"
        height="500"
      />
    </div>
  </div>
);

export default LoadingScreen;
