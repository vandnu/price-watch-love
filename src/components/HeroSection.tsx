const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-background to-background">
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="font-body text-sm md:text-base font-semibold uppercase tracking-widest text-accent mb-4">
            Prisudvikling i Danmark
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 leading-tight text-foreground mb-6">
            Hvad koster dine dagligvarer <em className="text-accent not-italic">egentlig?</em>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Vi tracker prisudviklingen på {productCount}+ hverdagsvarer og sammenligner med den officielle inflation.
            Oplev også <strong>shrinkflation</strong> — når produkterne bliver mindre, men prisen forbliver den samme.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 max-w-3xl">
          <StatCard label="Indkøbsposer" value="+400%" sublabel="siden 2015" />
          <StatCard label="Olivenolie" value="+133%" sublabel="siden 2015" />
          <StatCard label="Kaffe" value="+108%" sublabel="siden 2015" />
          <StatCard label="Officiel inflation" value="+19,6%" sublabel="kumulativ" />
        </div>

        <p className="font-body text-xs text-muted-foreground mt-8 max-w-2xl">
          Procenterne viser den samlede prisstigning fra første datapunkt (2015) til seneste (2024).
          Data opdateres manuelt — ikke i realtid — og er baseret på vejledende normalpriser, ikke tilbudspriser.
        </p>
      </div>
    </section>
  );
};

const productCount = 25;

const StatCard = ({ label, value, sublabel }: { label: string; value: string; sublabel: string }) => (
  <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border p-4 md:p-5">
    <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
    <p className="font-display text-2xl md:text-3xl font-bold text-accent mt-1">{value}</p>
    <p className="font-body text-xs text-muted-foreground mt-1">{sublabel}</p>
  </div>
);

export default HeroSection;
