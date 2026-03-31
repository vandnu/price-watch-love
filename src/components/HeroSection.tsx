import heroImage from "@/assets/hero-inflation.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Dagligvarer med stigende priser illustreret med opadgående pile"
          width={1920}
          height={800}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="font-body text-sm md:text-base font-semibold uppercase tracking-widest text-accent mb-4">
            Prisudvikling i Danmark
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 leading-tight text-foreground mb-6">
            Hvad koster dine dagligvarer <em className="text-accent not-italic">egentlig?</em>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Vi tracker prisudviklingen på udvalgte hverdagsvarer og sammenligner med den officielle inflation.
            Oplev også <strong>shrinkflation</strong> — når produkterne bliver mindre, men prisen forbliver den samme.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 max-w-3xl">
          <StatCard label="Olivenolie" value="+133%" sublabel="siden 2015" />
          <StatCard label="Pingvin Stang" value="+100%" sublabel="siden 2015" />
          <StatCard label="KiMs Chips" value="+74%" sublabel="siden 2015" />
          <StatCard label="Officiel inflation" value="+19,6%" sublabel="kumulativ" />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value, sublabel }: { label: string; value: string; sublabel: string }) => (
  <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border p-4 md:p-5">
    <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
    <p className="font-display text-2xl md:text-3xl font-bold text-accent mt-1">{value}</p>
    <p className="font-body text-xs text-muted-foreground mt-1">{sublabel}</p>
  </div>
);

export default HeroSection;
