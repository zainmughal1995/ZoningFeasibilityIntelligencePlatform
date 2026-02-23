import useParcelStore from "../store/parcelStore";
import useCityStore from "../store/cityStore";
import useFeasibilityStore from "../store/feasibilityStore";

function pointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0],
      yi = polygon[i][1];
    const xj = polygon[j][0],
      yj = polygon[j][1];

    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0000001) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

function getCentroid(coords) {
  let x = 0;
  let y = 0;

  coords.forEach(([lng, lat]) => {
    x += lng;
    y += lat;
  });

  return [x / coords.length, y / coords.length];
}

function useFeasibility() {
  const parcelGeometry = useParcelStore((state) => state.parcelGeometry);
  const { selectedCity } = useCityStore();
  const { setResult, setError } = useFeasibilityStore();

  const analyze = async () => {
    if (!parcelGeometry) {
      setError("Draw a parcel first.");
      return;
    }

    try {
      const res = await fetch(`/zoning/${selectedCity}.geojson`);
      const data = await res.json();

      const centroid = getCentroid(parcelGeometry.coordinates[0]);

      let foundZone = null;

      for (const feature of data.features) {
        const zoneCoords = feature.geometry.coordinates[0];

        if (pointInPolygon(centroid, zoneCoords)) {
          foundZone = feature;
          break;
        }
      }

      if (!foundZone) {
        setError("No zoning found.");
        return;
      }

      setResult(
        {
          score: 90,
          label: "Feasible",
          zone_code: foundZone.properties.zone_code,
          max_height: foundZone.properties.max_height,
          max_far: foundZone.properties.max_far,
        },
        foundZone,
      );
    } catch {
      setError("Analysis failed.");
    }
  };

  return { analyze };
}

export default useFeasibility;
