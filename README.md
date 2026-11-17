# India Demand Forecasting: React dashboard

Vite + React + TypeScript + Tailwind 4 + React Router + GSAP + Recharts.

```bash
python web/scripts/export_data.py   # from the repo root: results/ -> web/public/data/dashboard.json
cd web && npm install && npm run dev
```
Re-run the export script whenever notebooks 06 or 07 are re-run.

## Structure
```
src/
  lib/          types, data loading, CSV export, formatting, series and chart colours
  context/      DashProvider: loads dashboard.json once
  hooks/        useWindow (date window), useReveal (GSAP entrance)
  constants/    routes, method-page content
  components/
    layout/     Navbar, Footer, Layout
    ui/         Button, Card, Stat, Segmented, Field, DataTable, CodeBlock, TextLink, Empty, Skeleton
    controls/   HorizonToggle, WindowPicker, ModelPicker
    charts/     ForecastChart, ComparisonChart, HistoryChart, Heatmap, WarningChart, SeriesSwatch
  pages/        ForecastPage, ComparePage, HistoryPage, WarningsPage, MethodPage
```
Design tokens (9px spacing, one radius, tinted neutrals) are in `src/index.css`; data colours are in `src/lib/chartTheme.ts` and `src/lib/series.ts`.
