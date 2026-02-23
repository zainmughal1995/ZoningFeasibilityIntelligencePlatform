import React, { useRef } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  FeatureGroup,
  useMap,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import useParcelStore from "../../store/parcelStore";
import useCityStore from "../../store/cityStore";
import ZoningLayer from "../../features/zoning/ZoningLayer";

import L from "leaflet";

/* 🔹 This component forces map to update when city changes */
function MapUpdater({ center, zoom, onCityChange }) {
  const map = useMap();

  React.useEffect(() => {
    map.setView(center, zoom);
    if (onCityChange) onCityChange();
  }, [center, zoom]);

  return null;
}

function MapContainer() {
  const featureGroupRef = useRef(null);

  const setParcel = useParcelStore((state) => state.setParcel);
  const clearParcel = useParcelStore((state) => state.clearParcel);

  const { selectedCity, cities } = useCityStore();
  const cityData = cities[selectedCity];

  const onCreated = (e) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON();

    const latlngs = layer.getLatLngs()[0];

    const area = L.GeometryUtil
      ? L.GeometryUtil.geodesicArea(latlngs)
      : L.GeometryUtil;

    const centroid = [
      latlngs.reduce((sum, p) => sum + p.lng, 0) / latlngs.length,
      latlngs.reduce((sum, p) => sum + p.lat, 0) / latlngs.length,
    ];

    setParcel({
      geometry: geojson.geometry,
      area,
      centroid,
    });
  };

  const onDeleted = () => {
    clearParcel();
  };

  return (
    <div className="w-full h-full">
      <LeafletMap
        center={cityData.center}
        zoom={cityData.zoom}
        className="w-full h-full"
      >
        <MapUpdater
          center={cityData.center}
          zoom={cityData.zoom}
          onCityChange={clearParcel}
        />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoningLayer />

        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={onCreated}
            onDeleted={onDeleted}
            draw={{
              rectangle: true,
              polygon: true,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
            }}
          />
        </FeatureGroup>
      </LeafletMap>
    </div>
  );
}

export default MapContainer;
