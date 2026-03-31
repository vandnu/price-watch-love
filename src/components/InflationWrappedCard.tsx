import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/data/priceData";

type Format = "story" | "post";

type Props = {
  personalInflation: number;
  selectedProducts: Product[];
};

const InflationWrappedCard = ({ personalInflation, selectedProducts }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState<Format>("story");

  const factor = (personalInflation / 19.6).toFixed(1).replace(".", ",");

  const top3 = [...selectedProducts]
    .sort((a, b) => b.priceChange - a.priceChange)
    .slice(0, 3);

  const bgGradient =
    personalInflation < 30
      ? "from-emerald-600 to-emerald-800"
      : personalInflation < 60
        ? "from-amber-500 to-orange-700"
        : "from-red-600 to-rose-900";

  const dimensions: Record<Format, { w: string; h: string; aspect: string }> = {
    story: { w: "w-[340px]", h: "h-[604px]", aspect: "aspect-[9/16]" },
    post: { w: "w-[480px]", h: "h-[252px]", aspect: "aspect-[1200/630]" },
  };

  const dim = dimensions[format];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `min-inflation-${format}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast({ title: "Downloadt! 📸", description: "Del det på sociale medier." });
    } catch {
      toast({ title: "Kunne ikke generere billede" });
    }
  };

  const shareText = `Min personlige inflation er +${personalInflation}% siden 2015 — ${factor}× højere end den officielle. Hvad er din? detkoster.dk/beregner`;

  const handleTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast({ title: "Kopieret! 📋" });
    } catch {
      toast({ title: "Kunne ikke kopiere" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Format toggle */}
      <div className="flex items-center gap-3">
        <span className={`font-body text-sm ${format === "story" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
          Story (9:16)
        </span>
        <Switch
          checked={format === "post"}
          onCheckedChange={(checked) => setFormat(checked ? "post" : "story")}
        />
        <span className={`font-body text-sm ${format === "post" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
          Post (1200×630)
        </span>
      </div>

      {/* The card */}
      <div className="flex justify-center overflow-x-auto">
        <div
          ref={cardRef}
          className={`${dim.w} ${dim.aspect} bg-gradient-to-br ${bgGradient} rounded-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden`}
          style={{ minHeight: format === "story" ? 604 : 252 }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />

          {/* Top */}
          <div className="relative z-10">
            <p className="text-sm font-bold tracking-widest uppercase opacity-80">
              detkoster.dk
            </p>
            {format === "story" && (
              <p className="text-xs opacity-60 mt-1">Din Inflation Wrapped</p>
            )}
          </div>

          {/* Center */}
          <div className="relative z-10 text-center flex-1 flex flex-col justify-center">
            <p className={`font-bold leading-none ${format === "story" ? "text-8xl" : "text-6xl"}`}>
              +{personalInflation}%
            </p>
            <p className={`opacity-80 mt-2 ${format === "story" ? "text-lg" : "text-sm"}`}>
              Min personlige inflation 2015–2024
            </p>
            <div className="mt-4 inline-flex items-center justify-center gap-2 mx-auto bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5">
              <span className={`${format === "story" ? "text-base" : "text-sm"}`}>
                Officiel: +19,6%
              </span>
              <span className="font-bold">·</span>
              <span className={`font-bold ${format === "story" ? "text-base" : "text-sm"}`}>
                {factor}× højere
              </span>
            </div>

            {/* Top 3 */}
            {top3.length > 0 && (
              <div className={`mt-6 space-y-1 ${format === "post" ? "hidden" : ""}`}>
                <p className="text-xs uppercase tracking-wider opacity-60 mb-2">
                  Dyreste varer
                </p>
                {top3.map((p) => (
                  <p key={p.id} className="text-sm">
                    {p.emoji} {p.name} <span className="font-bold">+{p.priceChange}%</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="relative z-10 text-center">
            <p className="text-xs opacity-50">
              Beregn din egen → detkoster.dk/beregner
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={handleDownload} className="gap-2">
          📸 Download som billede
        </Button>
        <Button onClick={handleTwitter} variant="outline" className="gap-2">
          🐦 Del på X / Twitter
        </Button>
        <Button onClick={handleCopy} variant="outline" className="gap-2">
          📋 Kopiér tekst
        </Button>
      </div>
    </div>
  );
};

export default InflationWrappedCard;
