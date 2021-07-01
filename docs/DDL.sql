CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "restaurants" (
  "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name"          VARCHAR(255) NOT NULL,
  "photo_url"     VARCHAR(255) NOT NULL,
  "created_at"    TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at"    TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT restaurants_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_restaurants_id ON restaurants USING BTREE (id);

CREATE TABLE IF NOT EXISTS "addresses" (
  "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
  "restaurant_id" uuid NOT NULL,
  "street"        VARCHAR(255) NOT NULL,
  "number"        VARCHAR(16) NOT NULL,
  "postal_code"   VARCHAR(24) NOT NULL,
  "neighborhood"  VARCHAR(255) NOT NULL,
  "created_at"    TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at"    TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT addresses_pkey PRIMARY KEY (id),
  CONSTRAINT restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE
);

CREATE INDEX idx_addresses_id ON addresses USING BTREE (id);
CREATE INDEX idx_addresses_restaurant_id ON addresses USING BTREE (restaurant_id);

CREATE TABLE IF NOT EXISTS "categories" (
  "id"         uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name"       VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_categories_id ON categories USING BTREE (id);

CREATE TABLE IF NOT EXISTS "products" (
  "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
  "category_id"   uuid NOT NULL,
  "restaurant_id" uuid NOT NULL,
  "name"          VARCHAR(255) NOT NULL,
  "photo_url"     VARCHAR(255) NOT NULL,
  "price"         DECIMAL(10, 2) NOT NULL,
  "created_at"    TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at"    TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
  CONSTRAINT restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE
);

CREATE INDEX idx_products_id ON products USING BTREE (id);
CREATE INDEX idx_products_restaurant_id ON products USING BTREE (restaurant_id);
CREATE INDEX idx_products_category_id ON products USING BTREE (category_id);

CREATE TABLE IF NOT EXISTS "promotions" (
  "id"          uuid NOT NULL DEFAULT uuid_generate_v4(),
  "product_id"  uuid NOT NULL,
  "description" TEXT NOT NULL,
  "price"       DECIMAL(10, 2) NOT NULL,
  "created_at"  TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at"  TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT promotions_pkey PRIMARY KEY (id),
  CONSTRAINT product_id_fkey FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

CREATE INDEX idx_promotions_id ON promotions USING BTREE (id);
CREATE INDEX idx_promotions_product_id ON promotions USING BTREE (product_id);

CREATE TYPE "weekday_enum" AS ENUM(
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
);

CREATE TABLE IF NOT EXISTS "working_hours" (
  "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
  "restaurant_id" uuid,
  "promotion_id"  uuid,
  "weekday"       "weekday_enum" NOT NULL,
  "start_at"      TIME NOT NULL,
  "finish_at"     TIME NOT NULL,
  "created_at"    TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at"    TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT working_hours_pkey PRIMARY KEY (id),
  CONSTRAINT restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE,
  CONSTRAINT promotion_id_fkey FOREIGN KEY (promotion_id) REFERENCES promotions (id) ON DELETE CASCADE
);

CREATE INDEX idx_working_hours_id ON working_hours USING BTREE (id);
CREATE INDEX idx_working_hours_restaurant_id ON working_hours USING BTREE (restaurant_id);
CREATE INDEX idx_working_hours_promotion_id ON working_hours USING BTREE (promotion_id);
