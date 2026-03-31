import { useState } from "react";
import { products } from "@/data/priceData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const shrinkProducts = products.filter((p) => p.shrinkflation);

const getShameLevel = (pct: number) => {
  if (pct >= 25) return 5;
  if (pct >= 20) return 4;
  if (pct >= 15) return 3;
  if (pct >= 10) return 2;
  return 1;
};

const ShameMeter = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1 mt-3">
    <span className="font-body text-xs text-muted-foreground mr-1">SKAM-METER</span>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className={`h-3 flex-1 rounded-sm transition-colors ${
          i <= level ? "bg-accent" : "bg-secondary"
        }`}
      />
    ))}
  </div>
);

const ShrinkflationHallOfShame = () => {
  const [tipForm, setTipForm] = useState({ product: "", brand: "", before: "", after: "", note: "" });

  const handleShare = async (product: typeof shrinkProducts[0]) => {
    const s = product.shrinkflation!;
    const text = `Vidste du at ${product.brand} har gjort ${product.name} ${s.effectivePriceIncrease}% dyrere via shrinkflation? (${s.oldSize} → ${s.newSize}) Se flere på detkoster.dk/shrinkflation`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Kopieret!", description: "Del det med dine venner." });
    } catch {
      toast({ title: "Kunne ikke kopiere" });
    }
  };

  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Tak for dit tip! 🙏",
      description: "Vi kigger på det hurtigst muligt.",
    });
    setTipForm({ product: "", brand: "", before: "", after: "", note: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <head>
        <title>Shrinkflation Hall of Shame — detkoster.dk</title>
        <meta name="description" content="Se de værste tilfælde af shrinkflation i Danmark. Producenter der giver dig mindre for pengene." />
      </head>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Afsløret
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Hall of Shame — Shrinkflation i Danmark
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-4 max-w-2xl">
            Når producenter reducerer mængden uden at sænke prisen. Du betaler det samme — men får mindre.
          </p>

          {/* Counter */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-10">
            <span className="font-display text-2xl font-bold text-accent">{shrinkProducts.length}</span>
            <span className="font-body text-sm text-accent">tilfælde af shrinkflation afsløret</span>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {shrinkProducts.map((product) => {
              const s = product.shrinkflation!;
              const level = getShameLevel(s.effectivePriceIncrease);
              return (
                <div
                  key={product.id}
                  className="bg-card rounded-xl border border-border p-6 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-3xl">{product.emoji}</span>
                      <h3 className="font-display text-lg font-bold text-foreground mt-2">
                        {product.name}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">{product.brand}</p>
                    </div>
                    <p className="font-display text-3xl font-bold text-accent">
                      +{s.effectivePriceIncrease}%
                    </p>
                  </div>

                  <div className="flex items-center gap-3 my-4">
                    <div className="bg-secondary rounded-lg px-4 py-2 text-center flex-1">
                      <p className="font-body text-xs text-muted-foreground">Før</p>
                      <p className="font-display text-lg font-bold text-foreground">{s.oldSize}</p>
                    </div>
                    <span className="text-accent text-2xl font-bold">→</span>
                    <div className="bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 text-center flex-1">
                      <p className="font-body text-xs text-accent">Nu</p>
                      <p className="font-display text-lg font-bold text-accent">{s.newSize}</p>
                    </div>
                  </div>

                  <p className="font-body text-xs text-muted-foreground mb-1">
                    Ændret i {s.yearChanged}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>

                  <ShameMeter level={level} />

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => handleShare(product)}
                  >
                    📋 Del denne shrinkflation
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Tip form */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-10 mt-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              🔍 Tip os!
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Har du spottet shrinkflation? Fortæl os — vi tilføjer det til listen.
            </p>
            <form onSubmit={handleTipSubmit} className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder="Produktnavn"
                value={tipForm.product}
                onChange={(e) => setTipForm({ ...tipForm, product: e.target.value })}
                required
              />
              <Input
                placeholder="Mærke / producent"
                value={tipForm.brand}
                onChange={(e) => setTipForm({ ...tipForm, brand: e.target.value })}
                required
              />
              <Input
                placeholder="Mængde før (f.eks. 200g)"
                value={tipForm.before}
                onChange={(e) => setTipForm({ ...tipForm, before: e.target.value })}
                required
              />
              <Input
                placeholder="Mængde nu (f.eks. 175g)"
                value={tipForm.after}
                onChange={(e) => setTipForm({ ...tipForm, after: e.target.value })}
                required
              />
              <div className="sm:col-span-2">
                <Textarea
                  placeholder="Evt. noter — hvornår opdagede du det, link til billede osv."
                  value={tipForm.note}
                  onChange={(e) => setTipForm({ ...tipForm, note: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full sm:w-auto">
                  Send tip →
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShrinkflationHallOfShame;
