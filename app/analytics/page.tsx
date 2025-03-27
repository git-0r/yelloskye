"use client";

import { AreaChart } from "@/components/charts/area-chart";
import { BarChartMultiVertical } from "@/components/charts/bar-chart-multiple";
import { LineChartMultiple } from "@/components/charts/line-chart-multiple";
import { PieChartLabels } from "@/components/charts/pie-chart";
import withAuth from "@/components/with-auth";

function AnalyticsPage() {
  return (
    <main className="space-y-8 pb-8">
      <div>
        <p className="text-lg font-bold">Vertical Multi Bars</p>
        <p>This is a vertical bar chart with multiple sub-bars</p>
      </div>
      <BarChartMultiVertical />
      <div>
        <p className="text-lg font-bold">Multiple Line Chart</p>
        <p>This is a multi-line chart with curved lines</p>
      </div>
      <LineChartMultiple />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div>
            <p className="text-lg font-bold">Pie Chart</p>
            <p>This is a simple pie chart 🍰</p>
          </div>
          <PieChartLabels />
        </div>
        <div>
          <div>
            <p className="text-lg font-bold">Area Chart</p>
            <p>This is a simple area chart</p>
          </div>
          <AreaChart />
        </div>
      </div>
    </main>
  );
}

export default withAuth(AnalyticsPage);
