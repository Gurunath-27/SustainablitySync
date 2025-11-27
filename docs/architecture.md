# Sustainability Sync Board - Architecture Documentation

## System Architecture

### Overview
The Sustainability Sync Board is a full-stack application designed to ingest, normalize, and display carbon emissions data from multiple inconsistent sources.

### Technology Stack

**Frontend:**
- Angular 16
- TypeScript
- Reactive Forms and Services with RxJS Observables
- Lazy Loading for optimized performance
- CSS for styling

**Backend:**
- Node.js with Express
- Middleware architecture
- RESTful API design
- Oracle Database integration

**Database:**
- Oracle Database
- Structured schema for sustainability metrics

---

## System Components

### Frontend Architecture

#### Modules (Lazy Loaded)
1. **Dashboard Module** - Displays harmonized sustainability data
2. **Sync Module** - Initiates data synchronization process

#### Services
- **SustainabilityService** - Handles all API communications using Observables

#### Routing
- Lazy loading implemented for performance optimization
- Routes:
  - `/dashboard` - Main dashboard view
  - `/sync` - Data synchronization interface

---

## Data Flow

### Source → Normalization → Display

1. **Data Ingestion**
   - Three mock data sources simulate real-world inconsistent data
   - Source A: Carbon emissions in kilograms
   - Source B: Scope 1 emissions in tonnes
   - Source C: CO2 emissions in metric tons

2. **Normalization Process**
   - Backend controller analyzes field names and units
   - Rule-based detection:
     - Identifies keywords: "scope", "carbon", "co2", "emission"
     - Detects units: "kg", "tonnes", "ton", "mt"
   - Conversion logic:
     - kg → tonnes (divide by 1000)
     - All values standardized to tonnes
   - Aggregates data from all sources

3. **Storage**
   - Normalized data stored in Oracle database
   - Schema includes:
     - metric (VARCHAR2)
     - value_tonnes (NUMBER)
     - source_count (NUMBER)
     - sources (VARCHAR2)
     - timestamp (TIMESTAMP)

4. **Display**
   - Dashboard fetches harmonized data via REST API
   - Reactive updates using RxJS Observables
   - Visual cards showing unified metrics

---

## API Endpoints

### POST /api/sync
Triggers data synchronization from all sources
- Reads mock data files
- Applies normalization logic
- Stores unified record in database
- Returns success message with normalized data

### GET /api/data
Retrieves all sustainability records
- Returns array of all normalized data
- Ordered by timestamp (newest first)

### GET /api/data/latest
Fetches the most recent synchronized data
- Returns single record
- Used for quick status checks

---

## Normalization Logic

### Rule-Based Detection
The system uses intelligent pattern matching to handle inconsistent data:

```
For each data source:
  For each field in source:
    1. Convert field name to lowercase
    2. Check for sustainability keywords
    3. Extract numeric value
    4. Detect unit of measurement
    5. Apply conversion formula
    6. Accumulate in standard unit (tonnes)
```

### Unit Conversion Table
- Kilograms (kg) → Tonnes: value / 1000
- Tonnes/Tons/MT → Tonnes: value (no conversion)
- Default assumption: Tonnes

---

## Database Schema

### Table: sustainability_data

```sql
CREATE TABLE sustainability_data (
  id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  metric VARCHAR2(100) NOT NULL,
  value_tonnes NUMBER(10,2) NOT NULL,
  source_count NUMBER NOT NULL,
  sources VARCHAR2(500),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Scalability Considerations

### What Would Break if Data Changed

1. **Field Name Changes**
   - Current logic relies on keyword detection
   - New field names without keywords would fail
   - Solution: Machine learning for field mapping

2. **Unit Variations**
   - Unexpected units (pounds, grams) not handled
   - Solution: Expand conversion dictionary

3. **Data Format Changes**
   - JSON structure changes would break parsing
   - Solution: Schema validation layer

### Scaling to Multiple Companies

1. **Multi-tenancy**
   - Add company_id to database schema
   - Partition data by organization
   - Implement authentication/authorization

2. **Distributed Sources**
   - Replace file-based sources with API integrations
   - Implement queue system for async processing
   - Add retry logic for failed ingestions

3. **Performance**
   - Database indexing on timestamp and company_id
   - Caching layer (Redis) for frequently accessed data
   - Horizontal scaling of backend services

---

## AI Integration Opportunities

### Auto-Detect Field Mappings
- Train ML model on historical mappings
- Predict field types based on values and patterns
- Confidence scoring for suggestions

### Anomaly Detection
- Identify outlier values in emissions data
- Flag suspicious trends
- Alert on data quality issues

### Smart Recommendations
- Suggest optimization strategies
- Benchmark against industry standards
- Predict future emissions trends

---

## Running the Application

### Prerequisites
- Node.js 16+
- Oracle Database
- Angular CLI 16

### Backend Setup
```bash
cd backend
npm install
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
ng serve
```

### Database Setup
Execute the SQL schema creation script in your Oracle database to create the required table.

---

## Design Decisions

### Why Lazy Loading?
- Reduces initial bundle size
- Improves application performance
- Better user experience with faster load times

### Why Rule-Based Normalization?
- Transparent and debuggable
- No training data required
- Easily extensible with new rules
- Predictable behavior

### Why Oracle Database?
- Enterprise-grade reliability
- Strong ACID compliance
- Excellent for structured sustainability data
- Advanced analytics capabilities

---

## Future Enhancements

1. **Real-time Data Sync**
   - WebSocket connections for live updates
   - Streaming data processing

2. **Advanced Visualizations**
   - Time-series charts
   - Comparative analysis
   - Export to PDF/Excel

3. **Data Quality Metrics**
   - Completeness scores
   - Accuracy indicators
   - Source reliability ratings

4. **Multi-source Reconciliation**
   - Conflict resolution strategies
   - Weighted averaging
   - Source prioritization

