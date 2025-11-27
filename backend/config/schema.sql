CREATE TABLE sustainability_data (
  id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  metric VARCHAR2(100) NOT NULL,
  value_tonnes NUMBER(10,2) NOT NULL,
  source_count NUMBER NOT NULL,
  sources VARCHAR2(500),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sustainability_timestamp ON sustainability_data(timestamp);

