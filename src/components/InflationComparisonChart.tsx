import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { products, inflationData } from "@/data/priceData";

const colors = [
  "hsl(220, 60%, 50%)",
  "hsl(12, 80%, 55%)",
  "hsl(160, 50%, 42%)",
  "hsl(280, 45%, 55%)",
  "hsl(35, 85%, 55%)",
  "hsl(190, 60%, 45%)",
];

const InflationComparisonChart = () => {
  const chartData = inflationData.map((inf) => {
    const point: Record<string, number> = {
      year: inf.year,
      inflation: inf.cumulative,
    };
    products.forEach((product) => {
      const entry = product.priceHistory.find((p) => p.year === inf.year);
      const base = product.priceHistory[0].price;
      if (entry) {
        point[product.id] = Math.round((entry.price / base) * 100 * 10) / 10;
      }
    });
    return point;
  });

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Prisudvikling vs. inflation
        </h2>
        <p className="font-body text-muted-foreground mb-8 max-w-2xl">
          Alle varer indekseret til 100 i 2015. Den stiplede linje viser den officielle forbrugerprisinflation fra Danmarks Statistik.
          Alt over den linje er steget mere end inflationen.
        </p>

        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <div className="h-72 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 11, fill: "hsl(220,10%,45%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(220,10%,45%)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}`}
                  width={40}
                  domain={[90, 250]}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    const label = name === "inflation"
                      ? "Officiel inflation"
                      : products.find((p) => p.id === name)?.name ?? name;
                    return [`${value.toFixed(1)}`, label];
                  }}
                  labelFormatter={(l) => `År ${l}`}
                  contentStyle={{
                    backgroundColor: "hsl(40,33%,97%)",
                    border: "1px solid hsl(30,15%,88%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="inflation"
                  stroke="hsl(220,10%,60%)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                  name="inflation"
                />
                {products.map((product, i) => (
                  <Line
                    key={product.id}
                    type="monotone"
                    dataKey={product.id}
                    stroke={colors[i]}
                    strokeWidth={2}
                    dot={false}
                    name={product.id}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs font-body text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-muted-foreground" />
              Officiel inflation
            </span>
            {products.map((product, i) => (
              <span key={product.id} className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 rounded" style={{ backgroundColor: colors[i] }} />
                {product.emoji} {product.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InflationComparisonChart;
