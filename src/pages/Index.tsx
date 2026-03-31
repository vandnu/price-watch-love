import { useState, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import ProductPriceCard from "@/components/ProductPriceCard";
import ProductFilters from "@/components/ProductFilters";
import InflationComparisonChart from "@/components/InflationComparisonChart";
import ShrinkflationSection from "@/components/ShrinkflationSection";
import MethodologySection from "@/components/MethodologySection";
import { products, type SortOption } from "@/data/priceData";
import { Link } from "react-router-dom";
import { products as allProducts } from "@/data/priceData";

const Index = () => {
  const [category, setCategory] = useState("Alle");
  const [sort, setSort] = useState<SortOption>("priceChange");

  const filtered = useMemo(() => {
    let list = category === "Alle" ? products : products.filter((p) => p.category === category);
    switch (sort) {
      case "priceChange":
        return [...list].sort((a, b) => b.priceChange - a.priceChange);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name, "da"));
      case "category":
        return [...list].sort((a, b) => a.category.localeCompare(b.category, "da"));
      case "currentPrice":
        return [...list].sort((a, b) => b.currentPrice - a.currentPrice);
      default:
        return list;
    }
  }, [category, sort]);

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

            <ProductFilters
              category={category}
              sort={sort}
              onCategoryChange={setCategory}
              onSortChange={setSort}
              resultCount={filtered.length}
            />

            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((product, i) => (
                <ProductPriceCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>

        <InflationComparisonChart />

        {/* Shrinkflation teaser */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <ShrinkflationSection />
            <div className="text-center mt-8">
              <Link
                to="/shrinkflation"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-body font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Se alle i Hall of Shame →
              </Link>
            </div>
          </div>
        </section>

        {/* Eco comparison CTA */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-card rounded-xl border border-border p-8 md:p-12">
              <span className="text-4xl mb-4 block">🌱</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Konventionel vs. Økologisk
              </h2>
              <p className="font-body text-muted-foreground mb-6 max-w-lg mx-auto">
                Er prisforskellen mellem konventionelle og økologiske varer egentlig så stor?
                Vi sammenligner prisudviklingen side om side.
              </p>
              <Link
                to="/oeko"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-body font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Se øko-sammenligning →
              </Link>
            </div>
          </div>
        </section>

        <MethodologySection />

        <footer className="container mx-auto px-4 py-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="font-body text-xs text-center text-muted-foreground">
              © {new Date().getFullYear()} Prisudvikling.dk — Data fra Danmarks Statistik og Forbrugerrådet Tænk
            </p>
            <Link to="/oeko" className="font-body text-xs text-accent hover:underline">
              Øko-sammenligning
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
