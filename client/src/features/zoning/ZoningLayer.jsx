import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import useCityStore from "../../store/cityStore";
import useFeasibilityStore from "../../store/feasibilityStore";

function ZoningLayer() {
  const { selectedCity } = useCityStore();
  const highlightedZone = useFeasibilityStore((state) => state.highlightedZone);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/zoning/${selectedCity}.geojson`)
      .then((res) => res.json())
      .then((geojson) => {
        setData(geojson);
      });
  }, [selectedCity]);

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={(feature) => {
        if (
          highlightedZone &&
          feature.properties.zone_code === highlightedZone.properties.zone_code
        ) {
          return {
            color: "#16a34a",
            weight: 3,
            fillOpacity: 0.5,
          };
        }

        return {
          color: "#2563eb",
          weight: 1,
          fillOpacity: 0.2,
        };
      }}
    />
  );
}

export default ZoningLayer;
