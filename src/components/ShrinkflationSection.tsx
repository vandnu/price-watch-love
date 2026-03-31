import { products } from "@/data/priceData";

const ShrinkflationSection = () => {
  const shrinkProducts = products.filter((p) => p.shrinkflation);

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Shrinkflation — den skjulte prisstigning
        </h2>
        <p className="font-body text-muted-foreground mb-8 max-w-2xl">
          Shrinkflation sker, når producenter reducerer mængden i et produkt uden at sænke prisen.
          Du betaler det samme — men får mindre. Her er de produkter, vi har spottet.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {shrinkProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl border border-border p-5 hover:border-accent/40 transition-colors"
            >
              <span className="text-3xl">{product.emoji}</span>
              <h3 className="font-display text-lg font-bold text-foreground mt-3">
                {product.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground">{product.brand}</p>

              <div className="flex items-center gap-3 mt-4">
                <div className="bg-secondary rounded-lg px-3 py-2 text-center">
                  <p className="font-body text-xs text-muted-foreground">Før</p>
                  <p className="font-display text-lg font-bold text-foreground">
                    {product.shrinkflation!.oldSize}
                  </p>
                </div>
                <span className="text-accent text-xl font-bold">→</span>
                <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 text-center">
                  <p className="font-body text-xs text-accent">Nu</p>
                  <p className="font-display text-lg font-bold text-accent">
                    {product.shrinkflation!.newSize}
                  </p>
                </div>
              </div>

              <p className="font-display text-2xl font-bold text-accent mt-4">
                +{product.shrinkflation!.effectivePriceIncrease}%
              </p>
              <p className="font-body text-xs text-muted-foreground">
                skjult prisstigning i {product.shrinkflation!.yearChanged}
              </p>

              <p className="font-body text-xs text-muted-foreground mt-3 leading-relaxed">
                {product.shrinkflation!.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShrinkflationSection;
