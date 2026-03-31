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
        <strong className="text-foreground">Hvad betyder procenterne?</strong> Den viste procentstigning (f.eks. +133 %)
        er den samlede prisændring fra det første datapunkt (2015) til det seneste (2024). Det er <em>ikke</em> en
        årlig stigning, men den totale stigning over hele perioden.
      </p>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
        Shrinkflation-observationerne er dokumenteret af Forbrugerrådet Tænk samt egne observationer
        af produktstørrelser over tid. Bemærk at priserne kan variere mellem butikskæder og regioner.
      </p>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
        Der tages <strong className="text-foreground">ikke hensyn til tilbudspriser</strong> — alle priser er baseret på
        vejledende normalpriser i danske supermarkeder.
      </p>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Er data live?</strong> Nej — prisdata opdateres manuelt og er ikke
        forbundet til et live-feed fra butikker eller Danmarks Statistik. Vi bestræber os på at holde data
        opdateret, men der kan være forsinkelser.
      </p>
      <p className="font-body text-xs text-muted-foreground">
        Sidst opdateret: marts 2025 · Priserne er vejledende og kan variere.
      </p>
    </div>
  </section>
);

export default MethodologySection;
