const OmData = () => (
  <div className="min-h-screen bg-background">
    <head>
      <title>Metode og kilder — detkoster.dk</title>
      <meta name="description" content="Læs om datagrundlaget bag detkoster.dk: kilder, metode, og hvad priserne dækker." />
    </head>
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto prose prose-neutral">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
          Gennemsigtighed
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Metode og kilder
        </h1>

        <div className="space-y-8 font-body text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Hvor kommer prisdata fra?</h2>
            <p>
              Priserne er baseret på gennemsnitlige detailpriser i danske supermarkeder og data fra
              <a href="https://www.dst.dk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">Danmarks Statistik (dst.dk)</a>,
              <a href="https://taenk.dk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">Forbrugerrådet Tænk</a>,
              og offentligt tilgængelige prissammenligninger.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Hvad betyder procenterne?</h2>
            <p>
              Den viste procentstigning (f.eks. +133 %) er den <strong className="text-foreground">samlede prisændring</strong> fra
              det første datapunkt (2015) til det seneste (2024). Det er <em>ikke</em> en årlig stigning,
              men den totale stigning over hele perioden.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Tilbudspriser</h2>
            <p>
              Der tages <strong className="text-foreground">ikke hensyn til tilbudspriser</strong>.
              Alle priser er baseret på vejledende normalpriser i danske supermarkeder.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Shrinkflation-data</h2>
            <p>
              Shrinkflation-observationerne er dokumenteret af
              <a href="https://taenk.dk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">Forbrugerrådet Tænk</a>
              samt egne observationer af produktstørrelser over tid. Bemærk at priserne kan variere mellem butikskæder og regioner.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Er data live?</h2>
            <p>
              Nej — prisdata opdateres manuelt og er ikke forbundet til et live-feed fra butikker eller
              Danmarks Statistik. Vi bestræber os på at holde data opdateret, men der kan være forsinkelser.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Inflationsdata</h2>
            <p>
              Inflationsdata stammer fra Danmarks Statistiks officielle forbrugerprisindeks (KPI) —
              tabel <a href="https://www.statistikbanken.dk/PRIS8" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">PRIS8</a>.
              Den kumulative officielle inflation fra 2015–2024 er +19,6 %.
            </p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-6">
            Sidst opdateret: marts 2025 · Priserne er vejledende og kan variere.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default OmData;
