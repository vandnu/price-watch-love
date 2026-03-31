import HeroSection from "@/components/HeroSection";
import ProductPriceCard from "@/components/ProductPriceCard";
import InflationComparisonChart from "@/components/InflationComparisonChart";
import ShrinkflationSection from "@/components/ShrinkflationSection";
import MethodologySection from "@/components/MethodologySection";
import { products } from "@/data/priceData";

const Index = () => {
  return (
    <>
      <head>
        <title>Prisudvikling i Danmark — Dagligvarepriser, Inflation & Shrinkflation</title>
        <meta
          name="description"
          content="Følg prisudviklingen på udvalgte danske dagligvarer fra 2015 til i dag. Sammenlign med inflationen og opdag shrinkflation. Data fra Danmarks Statistik."
        />
      </head>
      <div className="min-h-screen bg-background">
        <HeroSection />

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Prisudvikling per produkt
            </h2>
            <p className="font-body text-muted-foreground mb-8 max-w-2xl">
              Hver vare sammenlignet med den officielle inflationsrate. Den stiplede linje viser, hvad prisen
              burde have været, hvis den kun fulgte inflationen.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product, i) => (
                <ProductPriceCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>

        <InflationComparisonChart />
        <ShrinkflationSection />
        <MethodologySection />

        <footer className="container mx-auto px-4 py-8 border-t border-border">
          <p className="font-body text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} Prisudvikling.dk — Data fra Danmarks Statistik og Forbrugerrådet Tænk
          </p>
        </footer>
      </div>
    </>
  );
};

export default Index;
