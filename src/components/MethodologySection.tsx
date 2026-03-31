const MethodologySection = () => (
  <section className="container mx-auto px-4 py-12 md:py-16 border-t border-border">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="font-display text-2xl font-bold text-foreground mb-4">Om datagrundlaget</h2>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
        Priserne er baseret på gennemsnitlige detailpriser i danske supermarkeder og data fra
        Danmarks Statistik (dst.dk), Forbrugerrådet Tænk og offentligt tilgængelige prissammenligninger.
        Inflationsdata stammer fra Danmarks Statistiks officielle forbrugerprisindeks (KPI).
      </p>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
        Shrinkflation-observationerne er dokumenteret af Forbrugerrådet Tænk samt egne observationer
        af produktstørrelser over tid. Bemærk at priserne kan variere mellem butikskæder og regioner.
      </p>
      <p className="font-body text-xs text-muted-foreground">
        Sidst opdateret: marts 2025 · Priserne er vejledende og kan variere.
      </p>
    </div>
  </section>
);

export default MethodologySection;
