import React from "react";
import "./App.css";
import PlotGraph from "./components/PlotGraph";

const App = () => {
  const [step, setStep] = React.useState(10);

  return (
    <div className="App">
      <div className="chart">
        <PlotGraph step={step} />
      </div>

      <div className="slider-div">
        <input
          className="slider"
          type="range"
          alue="10"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(e.target.value)}
        />

        <b>Step: {step}</b>
      </div>
    </div>
  );
};

export default App;
