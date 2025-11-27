const normalizeData=require('./normalizeData')
const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const dataSourcesPath = path.join(__dirname, '../../data');
module.exports=async(req, res, next) =>{
  try {
    const sourceA = JSON.parse(fs.readFileSync(path.join(dataSourcesPath, 'source_a.json'), 'utf8'));
    const sourceB = JSON.parse(fs.readFileSync(path.join(dataSourcesPath, 'source_b.json'), 'utf8'));
    const sourceC = JSON.parse(fs.readFileSync(path.join(dataSourcesPath, 'source_c.json'), 'utf8'));

    const sources = [
      { name: 'Source A', data: sourceA },
      { name: 'Source B', data: sourceB },
      { name: 'Source C', data: sourceC }
    ];

    const normalizedData = await normalizeData(sources);

    const insertQuery = `
      INSERT INTO sustainability_data
      (metric, value_tonnes, source_count, sources, timestamp)
      VALUES
      (:metric, :value_tonnes, :source_count, :sources, TO_TIMESTAMP(:timestamp, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))
    `;

    await db.execute(insertQuery, {
      metric: normalizedData.metric,
      value_tonnes: normalizedData.value_tonnes,
      source_count: normalizedData.source_count,
      sources: normalizedData.sources.join(','),
      timestamp: normalizedData.timestamp
    });

    res.json({
      success: true,
      message: `Synced ${normalizedData.source_count} sources`,
      data: normalizedData
    });
  } catch (error) {
    next(error);
  }
}