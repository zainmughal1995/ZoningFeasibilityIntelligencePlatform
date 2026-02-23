import { useRef } from "react";
import React from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import useParcelStore from "../../store/parcelStore";

// Fix Leaflet marker icon issue in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapContainer() {
  const featureGroupRef = useRef(null);
  const setParcel = useParcelStore((state) => state.setParcel);
  const clearParcel = useParcelStore((state) => state.clearParcel);

  const onCreated = (e) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON();
    setParcel(geojson.geometry);
  };

  const onDeleted = () => {
    clearParcel();
  };

  return (
    <LeafletMap
      center={[40.7128, -74.006]} // NYC default
      zoom={13}
      className="w-full h-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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
  );
}

export default MapContainer;
