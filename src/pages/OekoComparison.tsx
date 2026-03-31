import { products, inflationData } from "@/data/priceData";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ecoProducts = products.filter((p) => p.organic);

const OekoComparison = () => {
  return (
    <>
      <head>
        <title>Konventionel vs. Økologisk — Prissammenligning i Danmark</title>
        <meta
          name="description"
          content="Se prisforskellen mellem konventionelle og økologiske dagligvarer i Danmark fra 2015 til 2024. Er øko altid dyrere — og hvor meget?"
        />
      </head>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-b from-secondary via-background to-background">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <Link
              to="/"
              className="font-body text-sm text-accent hover:underline mb-6 inline-block"
            >
              ← Tilbage til prisudvikling
            </Link>
            <div className="max-w-3xl">
              <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                Konventionel vs. Økologisk
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-800 leading-tight text-foreground mb-4">
                Er øko <em className="text-accent not-italic">virkelig</em> så dyrt?
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl">
                Vi sammenligner prisudviklingen på {ecoProducts.length} udvalgte varer, hvor både
                konventionelle og økologiske versioner er tilgængelige. Måske er forskellen mindre, end du tror.
              </p>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 max-w-2xl">
              <SummaryCard
                label="Gns. merpris i dag"
                value={`+${avgPriceDiff()}%`}
                sub="øko vs. konventionel"
              />
              <SummaryCard
                label="Gns. merpris 2015"
                value={`+${avgPriceDiff2015()}%`}
                sub="øko vs. konventionel"
              />
              <SummaryCard
                label="Varer med øko-data"
                value={`${ecoProducts.length}`}
                sub="produkter"
              />
            </div>
          </div>
        </section>

        {/* Product cards */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Prissammenligning per produkt
            </h2>
            <div className="grid gap-8">
              {ecoProducts.map((product) => (
                <EcoProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="font-body text-xs text-center text-muted-foreground">
              © {new Date().getFullYear()} Prisudvikling.dk — Data baseret på gennemsnitlige detailpriser
            </p>
            <Link to="/" className="font-body text-xs text-accent hover:underline">
              Alle produkter
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

function avgPriceDiff(): number {
  const diffs = ecoProducts.map((p) => {
    const eco = p.organic!.currentPrice;
    return ((eco - p.currentPrice) / p.currentPrice) * 100;
  });
  return Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length);
}

function avgPriceDiff2015(): number {
  const diffs = ecoProducts.map((p) => {
    const eco2015 = p.organic!.priceHistory[0].price;
    const conv2015 = p.priceHistory[0].price;
    return ((eco2015 - conv2015) / conv2015) * 100;
  });
  return Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length);
}

function EcoProductCard({ product }: { product: (typeof ecoProducts)[number] }) {
  const organic = product.organic!;
  const chartData = product.priceHistory.map((p, i) => ({
    year: p.year,
    konventionel: p.price,
    oeko: organic.priceHistory[i]?.price ?? null,
  }));

  const diffNow = Math.round(
    ((organic.currentPrice - product.currentPrice) / product.currentPrice) * 100
  );

  return (
    <div className="bg-card rounded-xl border border-border p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        {/* Info */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{product.emoji}</span>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">{product.name}</h3>
              <p className="font-body text-xs text-muted-foreground">{product.unit}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-secondary rounded-lg p-3">
              <p className="font-body text-[10px] uppercase tracking-wide text-muted-foreground">Konventionel</p>
              <p className="font-display text-xl font-bold text-foreground">{product.currentPrice} kr</p>
              <p className="font-body text-xs text-muted-foreground">{product.brand}</p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
              <p className="font-body text-[10px] uppercase tracking-wide text-accent">Økologisk</p>
              <p className="font-display text-xl font-bold text-accent">{organic.currentPrice} kr</p>
              <p className="font-body text-xs text-muted-foreground">{organic.brand}</p>
            </div>
          </div>

          <p className="font-body text-sm text-muted-foreground mt-3">
            Merpris øko: <strong className="text-foreground">+{diffNow}%</strong>
          </p>
        </div>

        {/* Chart */}
        <div className="md:w-2/3 h-56 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={`conv-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(220,60%,50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(220,60%,50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id={`eco-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(140,50%,42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(140,50%,42%)" stopOpacity={0} />
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
                  `${value.toFixed(2)} kr`,
                  name === "konventionel" ? "Konventionel" : "Økologisk",
                ]}
                labelFormatter={(l) => `År ${l}`}
                contentStyle={{
                  backgroundColor: "hsl(40,33%,97%)",
                  border: "1px solid hsl(30,15%,88%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Area
                type="monotone"
                dataKey="konventionel"
                stroke="hsl(220,60%,50%)"
                strokeWidth={2}
                fill={`url(#conv-${product.id})`}
                name="konventionel"
              />
              <Area
                type="monotone"
                dataKey="oeko"
                stroke="hsl(140,50%,42%)"
                strokeWidth={2}
                strokeDasharray="5 3"
                fill={`url(#eco-${product.id})`}
                name="oeko"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs font-body text-muted-foreground justify-center">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 rounded bg-[hsl(220,60%,50%)]" />
              Konventionel
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 rounded border-t-2 border-dashed border-[hsl(140,50%,42%)]" />
              Økologisk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SummaryCard = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border p-4">
    <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
    <p className="font-display text-2xl md:text-3xl font-bold text-accent mt-1">{value}</p>
    <p className="font-body text-xs text-muted-foreground mt-1">{sub}</p>
  </div>
);

export default OekoComparison;
