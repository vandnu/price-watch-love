import { useState, useMemo, useRef } from "react";
import { products, inflationData } from "@/data/priceData";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "@/hooks/use-toast";
import InflationWrappedCard from "@/components/InflationWrappedCard";

const defaultSelected = new Set([
  "olivenolie", "havregryn", "bananer", "rugbroed", "pasta",
  "ris", "sukker", "mel", "tomatsovs", "kaffe",
]);

const InflationCalculator = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(defaultSelected));

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(products.map((p) => p.id)));
  const selectNone = () => setSelected(new Set());

  const selectedProducts = useMemo(
    () => products.filter((p) => selected.has(p.id)),
    [selected]
  );

  const personalInflation = useMemo(() => {
    if (selectedProducts.length === 0) return 0;
    return Math.round(
      selectedProducts.reduce((sum, p) => sum + p.priceChange, 0) / selectedProducts.length
    );
  }, [selectedProducts]);

  const chartData = useMemo(() => {
    if (selectedProducts.length === 0) return [];
    return inflationData.map((inf) => {
      let totalIndex = 0;
      let count = 0;
      selectedProducts.forEach((product) => {
        const entry = product.priceHistory.find((p) => p.year === inf.year);
        const base = product.priceHistory[0]?.price;
        if (entry && base) {
          totalIndex += (entry.price / base) * 100;
          count++;
        }
      });
      return {
        year: inf.year,
        personal: count > 0 ? Math.round((totalIndex / count) * 10) / 10 : 100,
        officiel: inf.cumulative,
      };
    });
  }, [selectedProducts]);

  const shareText = `Min personlige inflation er +${personalInflation}% siden 2015 — mens den officielle er +19,6%. Tjek din egen på detkoster.dk/beregner`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast({ title: "Kopieret!", description: "Teksten er kopieret til din udklipsholder." });
    } catch {
      toast({ title: "Kunne ikke kopiere", description: "Prøv at markere teksten manuelt." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <head>
        <title>Beregn din personlige inflation — detkoster.dk</title>
        <meta name="description" content="Vælg de varer du køber og se din personlige inflation sammenlignet med den officielle. Data fra Danmarks Statistik." />
      </head>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Personlig inflationsberegner
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Beregn din egen inflation
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-10 max-w-2xl">
            Vælg de varer du typisk køber, og se hvor meget <em>din</em> indkøbskurv
            reelt er steget i pris sammenlignet med den officielle inflation.
          </p>

          {/* Result card */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-10 mb-10">
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mb-8">
              <div>
                <p className="font-body text-sm text-muted-foreground mb-1">
                  Din personlige inflation (2015–2024)
                </p>
                <p className="font-display text-5xl md:text-7xl font-bold text-accent">
                  +{personalInflation}%
                </p>
              </div>
              <div>
                <p className="font-body text-sm text-muted-foreground mb-1">
                  Officiel inflation
                </p>
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  +19,6%
                </p>
              </div>
              <div className="md:ml-auto">
                <p className="font-body text-xs text-muted-foreground mb-2">
                  Baseret på {selectedProducts.length} valgte varer
                </p>
                <Button onClick={handleShare} variant="outline" size="sm">
                  📋 Del dit resultat
                </Button>
              </div>
            </div>

            {/* Chart */}
            {chartData.length > 0 && (
              <div className="h-56 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(220,10%,45%)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(220,10%,45%)" }} axisLine={false} tickLine={false} width={40} domain={[90, "auto"]} />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value.toFixed(1)}`,
                        name === "personal" ? "Din inflation" : "Officiel inflation",
                      ]}
                      labelFormatter={(l) => `År ${l}`}
                      contentStyle={{
                        backgroundColor: "hsl(40,33%,97%)",
                        border: "1px solid hsl(30,15%,88%)",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                    <Line type="monotone" dataKey="officiel" stroke="hsl(220,10%,60%)" strokeWidth={2} strokeDasharray="6 4" dot={false} />
                    <Line type="monotone" dataKey="personal" stroke="hsl(12,80%,55%)" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="flex gap-5 mt-3 text-xs font-body text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 rounded bg-accent" />
                Din inflation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-muted-foreground" />
                Officiel inflation
              </span>
            </div>
          </div>

          {/* Product selector */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">
                Vælg dine varer
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAll}>Vælg alle</Button>
                <Button variant="outline" size="sm" onClick={selectNone}>Nulstil</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
              {products.map((product) => (
                <label
                  key={product.id}
                  className="flex items-center gap-3 py-2.5 px-2 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <Checkbox
                    checked={selected.has(product.id)}
                    onCheckedChange={() => toggle(product.id)}
                  />
                  <span className="text-lg">{product.emoji}</span>
                  <span className="font-body text-sm text-foreground flex-1">{product.name}</span>
                  <span className="font-display text-xs font-semibold text-accent">
                    +{product.priceChange}%
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InflationCalculator;
