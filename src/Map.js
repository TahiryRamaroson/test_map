import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ geojsonData, statisticData}) => {

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name && statisticData) {
      const stats = statisticData[feature.properties.name];
      if (stats) {
        const popupContent = `
          <div>
            <h3>${feature.properties.name}</h3>
            <p>Population: ${stats.NbNaissance}</p>
          </div>
        `;
        layer.bindPopup(popupContent);
      }
      layer.bindTooltip(feature.properties.name, {
        permanent: false,
        direction: 'top',
        opacity: 0.7,
      });
    }
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          color: 'black',
          fillColor: 'blue',
          fillOpacity: 0.5,
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          color: 'black',
          fillColor: 'black',
          fillOpacity: 0.2,
        });
      },
    });
  };

  const geoJsonStyle = {
    color: 'black',
    fillColor: 'black',
    fillOpacity: 0.2,
  };

  return (
    <MapContainer center={[-18.8792, 47.5079]} zoom={6} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=7mQ6YCT1PO0Afnn1L5LP"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <GeoJSON data={geojsonData} style={geoJsonStyle} onEachFeature={onEachFeature}/>
    </MapContainer>
  );
};

export default MapComponent;
