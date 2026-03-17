-- Migration 008: TSI/SBL Bus Inventory (for-sale + lease fleet)

CREATE TABLE IF NOT EXISTS bus_inventory (
  id bigserial PRIMARY KEY,
  brand text NOT NULL DEFAULT 'TSI',
  year int NOT NULL,
  make text NOT NULL,
  model text,
  vin text,
  length_ft int,
  fuel_type text,
  seats int,
  mileage int,
  condition text DEFAULT 'refurbished',
  price numeric(12,2),
  price_display text,
  description text,
  features jsonb DEFAULT '[]',
  photos jsonb DEFAULT '[]',
  primary_photo_url text,
  status text DEFAULT 'draft',
  sbl_lease_type text,
  sbl_min_term_months int,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  sold_at timestamptz
);

ALTER TABLE bus_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_inventory TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "public_read_active" ON bus_inventory FOR SELECT TO anon USING (status = 'active');
