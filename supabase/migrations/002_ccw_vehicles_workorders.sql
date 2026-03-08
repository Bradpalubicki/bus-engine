-- Complete Coach Works — Migration 002: Vehicles & Work Orders

CREATE TABLE ccw_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  address TEXT,
  phone TEXT,
  type TEXT CHECK (type IN ('hq','satellite','field')) DEFAULT 'field',
  active_wo_count INTEGER DEFAULT 0,
  utilization_pct NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ccw_vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vin TEXT UNIQUE NOT NULL,
  agency_id UUID REFERENCES ccw_agencies(id),
  contract_id UUID REFERENCES ccw_contracts(id),
  location_id UUID REFERENCES ccw_locations(id),
  make TEXT,
  model TEXT,
  year INTEGER,
  length_ft INTEGER,
  fuel_type TEXT CHECK (fuel_type IN ('diesel','cng','lng','hybrid','electric')),
  status TEXT CHECK (status IN ('intake','queued','in_progress','qa_hold','complete','delivered')) DEFAULT 'intake',
  intake_date DATE,
  target_completion DATE,
  delivered_at TIMESTAMPTZ,
  tech_assigned TEXT,
  days_in_shop INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ccw_work_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wo_number TEXT UNIQUE NOT NULL,
  vehicle_id UUID REFERENCES ccw_vehicles(id),
  contract_id UUID REFERENCES ccw_contracts(id),
  location_id UUID REFERENCES ccw_locations(id),
  status TEXT CHECK (status IN ('intake','queued','in_progress','qa_hold','complete','delivered')) DEFAULT 'intake',
  service_type TEXT,
  tech_assigned TEXT,
  opened_at TIMESTAMPTZ DEFAULT NOW(),
  target_date DATE,
  completed_at TIMESTAMPTZ,
  labor_hours NUMERIC(8,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ccw_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_work_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role access locations" ON ccw_locations FOR ALL USING (true);
CREATE POLICY "Service role access vehicles" ON ccw_vehicles FOR ALL USING (true);
CREATE POLICY "Service role access work_orders" ON ccw_work_orders FOR ALL USING (true);
