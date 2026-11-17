import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashProvider } from "./context/DashContext";
import ComparePage from "./pages/ComparePage";
import ForecastPage from "./pages/ForecastPage";
import HistoryPage from "./pages/HistoryPage";
import MethodPage from "./pages/MethodPage";
import WarningsPage from "./pages/WarningsPage";

export default function App() {
  return (
    <DashProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<ForecastPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="warnings" element={<WarningsPage />} />
            <Route path="method" element={<MethodPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </DashProvider>
  );
}
