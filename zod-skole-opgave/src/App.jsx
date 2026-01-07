import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.sass";
import Formular from "./RegistrationForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Formular />
      </div>
    </>
  );
}

export default App;
