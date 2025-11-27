exports=async (sources)=> {
  let totalInTonnes = 0;
  const processedSources = [];

  sources.forEach(source => {
    let valueInTonnes = 0;
    const data = source.data;

    for (const key in data) {
      const lowerKey = key.toLowerCase();
      const value = parseFloat(data[key]);

      if (lowerKey.includes('scope') && lowerKey.includes('1')) {
        if (lowerKey.includes('kg') || data[key].toString().includes('kg')) {
          valueInTonnes = value / 1000;
        } else if (lowerKey.includes('tonne') || lowerKey.includes('ton') || lowerKey.includes('mt')) {
          valueInTonnes = value;
        } else {
          valueInTonnes = value;
        }
      } else if (lowerKey.includes('carbon') || lowerKey.includes('co2') || lowerKey.includes('emission')) {
        if (lowerKey.includes('kg') || data[key].toString().includes('kg')) {
          valueInTonnes = value / 1000;
        } else if (lowerKey.includes('tonne') || lowerKey.includes('ton') || lowerKey.includes('mt')) {
          valueInTonnes = value;
        } else {
          valueInTonnes = value;
        }
      }
    }

    totalInTonnes += valueInTonnes;
    processedSources.push(source.name);
  });

  return {
    metric: 'Scope 1 Emissions',
    value_tonnes: Math.round(totalInTonnes * 100) / 100,
    source_count: sources.length,
    sources: processedSources,
    timestamp: new Date().toISOString()
  };
}