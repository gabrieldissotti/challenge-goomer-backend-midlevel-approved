CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE something (
  id uuid DEFAULT uuid_generate_v4()
);
