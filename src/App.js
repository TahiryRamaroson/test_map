import React, { useEffect, useState } from 'react';
import MapComponent from './Map';
import geojsonData from './data/rewound-geojson.json';
import { MadagascarData } from './data/map-mg';
import { StatisticNaisance } from './data/statistic-naissance';

const App = () => {

  return (
    <div className="App">
      {MadagascarData ? <MapComponent geojsonData={MadagascarData} statisticData={StatisticNaisance} /> : <p>Loading...</p>}
    </div>
  );
};

export default App;
