// router.jsx → Defines all routes (Dashboard, Analysis, History).
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Analysis from "../pages/Analysis";
import History from "../pages/History";
import NotFound from "../pages/NotFound";
import React from "react";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="history" element={<History />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
