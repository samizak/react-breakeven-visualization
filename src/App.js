import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './App.css';

require('highcharts/modules/exporting')(Highcharts);


function CalculateBreakEven (step) {
  let data = [];
  // G = L / (1 - 0.01L)
  const percentageGainRequired = L => L / (1 - 0.01 * L);

  for (let i=0; i<100; i+=step)
    data.push([-i, percentageGainRequired(i)])

  // Sort data before returning to fix weird charting bugs...
  return data.sort((a, b) => a[0]-b[0]);
}


const App = () => {
  const [step, setStep] = React.useState(10);

  const breakEven = CalculateBreakEven(+step);

  const options = {
    chart: {
      type: 'line',
      marginTop: 80,
      marginBottom: 80,
      animation: false,
      height: '80%',
      // width: '80%'
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Percentage Change Required to Break-Even'
    },
    xAxis: {
      title: {
          text: 'Loss (%)'
      }
    },
    yAxis: {
      title: {
          text: 'Gains (%)'
      }
    },
    legend: {
      // align: 'right',
      // verticalAlign: 'middle',
      // layout: 'vertical',
    },
    tooltip: {
      formatter: function () {
          return '<b>Loss (%): </b>' + this.x + '%' + '<br>' +
              '<b>Gain (%): </b>' + this.y.toFixed(2) + '%';
      },
      crosshairs: [true],
      animation: false
    },
    series: [{
        name: 'Break-Even',
        data: breakEven
    }],
    exporting: {
      buttons: [
        {
          text: 'Log Scale',
          onclick: function () { this.yAxis[0].update({ type: 'logarithmic' }); },
          y: 40
        },
        {
          text: 'Linear Scale',
          onclick: function () { this.yAxis[0].update({ type: 'linear' }); },
          y: 40
        },
      ]
    },
  };

  return (
    <div className='App'>

      <div className='chart'>
        <HighchartsReact
          className='chart'
          highcharts={Highcharts}
          options={options} />
      </div>

      <div className='slider-div'>
        <input
          className='slider'
          type="range" 
          alue="10"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(e.target.value)} />

        <b>Step: {step}</b>
      </div>
    </div>
    
  );
}

export default App;
