import useParcelStore from "../store/parcelStore";
import useCityStore from "../store/cityStore";
import useFeasibilityStore from "../store/feasibilityStore";

/* ---- Market Assumptions ---- */

const marketData = {
  nyc: {
    salePrice: 9000,
    constructionCost: 3500,
    landCost: 2500,
    softCostRate: 0.2,
  },
  la: {
    salePrice: 7000,
    constructionCost: 3000,
    landCost: 1800,
    softCostRate: 0.18,
  },
  chicago: {
    salePrice: 5000,
    constructionCost: 2500,
    landCost: 1200,
    softCostRate: 0.15,
  },
};

function useFeasibility() {
  const parcel = useParcelStore((state) => state.parcel);
  const { selectedCity } = useCityStore();
  const { setResult, setError } = useFeasibilityStore();

  const analyze = async () => {
    if (!parcel) {
      setError("Draw a parcel first.");
      return;
    }

    try {
      const res = await fetch(`/zoning/${selectedCity}.geojson`);
      const data = await res.json();

      const centroid = parcel.centroid;

      let foundZone = null;

      for (const feature of data.features) {
        const zoneCoords = feature.geometry.coordinates[0];

        const inside = zoneCoords.some(
          ([lng, lat]) =>
            Math.abs(lng - centroid[0]) < 0.01 &&
            Math.abs(lat - centroid[1]) < 0.01,
        );

        if (inside) {
          foundZone = feature;
          break;
        }
      }

      if (!foundZone) {
        setError("No zoning found.");
        return;
      }

      const maxFAR = foundZone.properties.max_far;
      const buildableArea = parcel.area * maxFAR;

      const cityMarket = marketData[selectedCity];

      const baseRevenue = buildableArea * cityMarket.salePrice;

      const constructionCost = buildableArea * cityMarket.constructionCost;

      const landCost = parcel.area * cityMarket.landCost;

      const softCosts = (constructionCost + landCost) * cityMarket.softCostRate;

      const totalCost = constructionCost + landCost + softCosts;

      const baseProfit = baseRevenue - totalCost;
      const baseROI = (baseProfit / totalCost) * 100;

      /* ---- Stress Tests ---- */

      const revenueDown10 = buildableArea * cityMarket.salePrice * 0.9;

      const profitRevenueDrop = revenueDown10 - totalCost;

      const roiRevenueDrop = (profitRevenueDrop / totalCost) * 100;

      const constructionUp10 =
        buildableArea * cityMarket.constructionCost * 1.1;

      const totalCostStress =
        constructionUp10 +
        landCost +
        (constructionUp10 + landCost) * cityMarket.softCostRate;

      const profitCostRise = baseRevenue - totalCostStress;

      const roiCostRise = (profitCostRise / totalCostStress) * 100;

      const breakEvenPrice = totalCost / buildableArea;

      const rating =
        baseROI > 25
          ? "Excellent"
          : baseROI > 15
            ? "Strong"
            : baseROI > 5
              ? "Marginal"
              : "Not Viable";

      setResult(
        {
          zone_code: foundZone.properties.zone_code,
          parcel_area: Math.round(parcel.area),
          buildable_area: Math.round(buildableArea),
          revenue: Math.round(baseRevenue),
          total_cost: Math.round(totalCost),
          profit: Math.round(baseProfit),
          roi: baseROI.toFixed(1),
          roi_revenue_drop: roiRevenueDrop.toFixed(1),
          roi_cost_rise: roiCostRise.toFixed(1),
          break_even_price: breakEvenPrice.toFixed(0),
          rating,
        },
        foundZone,
      );
    } catch {
      setError("Financial analysis failed.");
    }
  };

  return { analyze };
}

export default useFeasibility;
