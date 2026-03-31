import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import type { Product } from "@/data/priceData";
import { inflationData } from "@/data/priceData";

const chartColors = [
  "hsl(220, 60%, 50%)",
  "hsl(12, 80%, 55%)",
  "hsl(160, 50%, 42%)",
  "hsl(280, 45%, 55%)",
  "hsl(35, 85%, 55%)",
  "hsl(190, 60%, 45%)",
  "hsl(340, 65%, 50%)",
  "hsl(45, 70%, 50%)",
];

type Props = {
  product: Product;
  index: number;
};

const ProductPriceCard = ({ product, index }: Props) => {
  const color = chartColors[index % chartColors.length];
  const basePrice = product.priceHistory[0].price;
  const firstYear = product.priceHistory[0].year;
  const lastYear = product.priceHistory[product.priceHistory.length - 1].year;

  const chartData = product.priceHistory.map((p) => {
    const inf = inflationData.find((i) => i.year === p.year);
    const inflationAdjusted = basePrice * ((inf?.cumulative ?? 100) / 100);
    return {
      year: p.year,
      price: p.price,
      inflation: Math.round(inflationAdjusted * 100) / 100,
    };
  });

  return (
    <article className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-2xl mr-2">{product.emoji}</span>
            <h3 className="font-display text-xl font-bold text-foreground inline">{product.name}</h3>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {product.brand} · {product.unit}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-foreground">
              {product.currentPrice.toFixed(2).replace(".", ",")} kr
            </p>
            <p className="font-body text-sm font-semibold text-accent" title={`Prisstigning fra ${firstYear} til ${lastYear}`}>
              +{product.priceChange}%
            </p>
            <p className="font-body text-[10px] text-muted-foreground">
              {firstYear}–{lastYear}
            </p>
          </div>
        </div>

        <div className="h-48 md:h-56 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={`grad-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
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
                tickFormatter={(v) => `${v} kr`}
                width={55}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toFixed(2).replace(".", ",")} kr`,
                  name === "price" ? "Faktisk pris" : "Inflationsjusteret",
                ]}
                labelFormatter={(label) => `År ${label}`}
                contentStyle={{
                  backgroundColor: "hsl(40,33%,97%)",
                  border: "1px solid hsl(30,15%,88%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Area
                type="monotone"
                dataKey="inflation"
                stroke="hsl(220,10%,70%)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
                dot={false}
                name="inflation"
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#grad-${product.id})`}
                dot={{ fill: color, r: 3 }}
                activeDot={{ r: 5 }}
                name="price"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs font-body text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
            Faktisk pris
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded border border-muted-foreground border-dashed" />
            Inflationsjusteret
          </span>
        </div>

        {product.shrinkflation && (
          <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="font-body text-xs font-semibold text-accent uppercase tracking-wide mb-1">
              ⚠️ Shrinkflation
            </p>
            <p className="font-body text-sm text-foreground">
              {product.shrinkflation.oldSize} → {product.shrinkflation.newSize} ({product.shrinkflation.yearChanged})
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              {product.shrinkflation.description}
            </p>
          </div>
        )}

        <p className="font-body text-[10px] text-muted-foreground mt-3">
          Kilde:{" "}
          <a
            href={product.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            {product.source}
          </a>
        </p>
      </div>
    </article>
  );
};

export default ProductPriceCard;
