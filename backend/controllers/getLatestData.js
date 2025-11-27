
const db = require('../config/database');
module.exports=async (req, res, next)=> {
  try {
    const query = `
      SELECT
        metric,
        value_tonnes,
        source_count,
        sources,
        TO_CHAR(timestamp, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') as timestamp
      FROM sustainability_data
      ORDER BY timestamp DESC
      FETCH FIRST 1 ROW ONLY
    `;

    const result = await db.execute(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No data found'
      });
    }

    const row = result.rows[0];
    const data = {
      metric: row.METRIC,
      value_tonnes: row.VALUE_TONNES,
      source_count: row.SOURCE_COUNT,
      sources: row.SOURCES.split(','),
      timestamp: row.TIMESTAMP
    };

    res.json(data);
  } catch (error) {
    next(error);
  }
}