import React, { useEffect, useRef} from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = ({ geojsonData, statisticData}) => {

  const geoJsonRef = useRef();

  const getColor = (d) => {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
  };

  const style = (feature) => {
    const stats = statisticData[feature.properties.name];
    return {
      fillColor: stats ? getColor(stats.NbNaissance) : '#FFEDA0',
      weight: 2,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name && statisticData) {
      const stats = statisticData[feature.properties.name];
      if (stats) {
        const tooltipContent = `
          <div>
            <h3>${feature.properties.name}</h3>
            <h5>Nombre de naissance: ${stats.NbNaissance}</h5>
          </div>
        `;
        layer.bindTooltip(tooltipContent, {
          permanent: false,
          direction: 'top',
          opacity: 0.9,
        });
      }
    }

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 5,
          color: 'black',
          dashArray: '',
          fillOpacity: 0.7
        });
      },
      mouseout: (e) => {
        geoJsonRef.current.resetStyle(e.target);
      }
    });
  };

  const Legend = () => {
    const map = useMap();

    useEffect(() => {
      const legend = L.control({ position: 'bottomright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
        const labels = [];

        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '">___</i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        div.style.color = 'black';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';

        return div;
      };

      legend.addTo(map);

      return () => {
        legend.remove();
      };
    }, [map]);

    return null;
  };

  return (
    <MapContainer center={[-18.8792, 47.5079]} zoom={6} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=7mQ6YCT1PO0Afnn1L5LP"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} style={style} ref={geoJsonRef}/>
      <Legend />
    </MapContainer>
  );
};

export default MapComponent;
