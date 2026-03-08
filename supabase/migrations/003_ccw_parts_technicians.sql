-- Complete Coach Works — Migration 003: Parts & Technicians

CREATE TABLE ccw_technicians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location_id UUID REFERENCES ccw_locations(id),
  email TEXT,
  phone TEXT,
  years_experience INTEGER,
  active_wo_count INTEGER DEFAULT 0,
  certifications JSONB DEFAULT '[]',
  cert_expiry DATE,
  status TEXT CHECK (status IN ('active','inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ccw_parts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  part_number TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  supplier TEXT,
  unit_cost NUMERIC(12,2),
  qty_on_hand INTEGER DEFAULT 0,
  reorder_point INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('ok','low_stock','out_of_stock')) DEFAULT 'ok',
  location_id UUID REFERENCES ccw_locations(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ccw_part_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_order_id UUID REFERENCES ccw_work_orders(id),
  part_id UUID REFERENCES ccw_parts(id),
  qty_used INTEGER NOT NULL,
  unit_cost_at_time NUMERIC(12,2),
  used_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ccw_technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_part_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role access technicians" ON ccw_technicians FOR ALL USING (true);
CREATE POLICY "Service role access parts" ON ccw_parts FOR ALL USING (true);
CREATE POLICY "Service role access part_usage" ON ccw_part_usage FOR ALL USING (true);
