-- Migration 010: Inspection Photos + PM Scheduling
-- Bus Engine Dashboard v2

-- Inspection records table
CREATE TABLE bus_inspections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES bus_vehicles(id),
  inspector_name TEXT NOT NULL,
  inspection_date DATE NOT NULL,
  odometer_mi INTEGER,
  overall_result TEXT CHECK (overall_result IN ('pass', 'conditional', 'fail')) NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Per-item results with photo
CREATE TABLE bus_inspection_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inspection_id UUID REFERENCES bus_inspections(id) ON DELETE CASCADE,
  section_id TEXT NOT NULL,
  item_label TEXT NOT NULL,
  result TEXT CHECK (result IN ('pass', 'fail', 'na')) NOT NULL DEFAULT 'na',
  notes TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PM schedule templates
CREATE TABLE bus_pm_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_class TEXT NOT NULL,
  fuel_type TEXT,
  task_name TEXT NOT NULL,
  interval_miles INTEGER,
  interval_days INTEGER,
  estimated_hours NUMERIC(5,2),
  notes TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PM work order triggers
CREATE TABLE bus_pm_triggers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES bus_vehicles(id),
  pm_schedule_id UUID REFERENCES bus_pm_schedules(id),
  last_completed_at DATE,
  last_odometer_at_service INTEGER,
  next_due_date DATE,
  next_due_miles INTEGER,
  status TEXT CHECK (status IN ('ok', 'due_soon', 'overdue', 'completed')) DEFAULT 'ok',
  work_order_id UUID REFERENCES bus_work_orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add labor cost columns to work orders
ALTER TABLE bus_work_orders
  ADD COLUMN IF NOT EXISTS labor_hours NUMERIC(8,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS labor_cost NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS parts_cost NUMERIC(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_cost NUMERIC(12,2) DEFAULT 0;

-- Add hourly_rate to technicians
ALTER TABLE bus_technicians
  ADD COLUMN IF NOT EXISTS hourly_rate NUMERIC(8,2) DEFAULT 0;

-- RLS
ALTER TABLE bus_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_inspection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_pm_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_pm_triggers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role access inspections" ON bus_inspections FOR ALL USING (true);
CREATE POLICY "Service role access inspection_items" ON bus_inspection_items FOR ALL USING (true);
CREATE POLICY "Service role access pm_schedules" ON bus_pm_schedules FOR ALL USING (true);
CREATE POLICY "Service role access pm_triggers" ON bus_pm_triggers FOR ALL USING (true);

-- Default PM schedule seed data
INSERT INTO bus_pm_schedules (vehicle_class, fuel_type, task_name, interval_miles, interval_days, estimated_hours, notes) VALUES
  ('transit_40ft', 'diesel', 'Engine Oil & Filter Change', 25000, NULL, 2, 'Cummins ISL standard interval'),
  ('transit_40ft', 'diesel', 'Transmission Fluid Service', 100000, NULL, 3, 'Allison B400R'),
  ('transit_40ft', NULL, 'Brake System Inspection', NULL, 90, 4, 'FMCSA quarterly requirement'),
  ('transit_40ft', NULL, 'Full Pre-Delivery Inspection', NULL, NULL, 8, 'FTA pre-revenue service'),
  ('transit_60ft', 'diesel', 'Engine Oil & Filter Change', 25000, NULL, 2.5, 'Cummins ISL9 — articulated'),
  ('transit_60ft', NULL, 'Brake System Inspection', NULL, 90, 6, 'FMCSA quarterly — all axles'),
  ('transit_40ft', 'cng', 'CNG Tank Visual Inspection', NULL, 30, 1.5, 'NFPA 52 — monthly visual'),
  ('transit_40ft', 'cng', 'CNG System Pressure Test', NULL, 365, 4, 'Annual hydrostatic or hydro-proof'),
  ('transit_40ft', 'hybrid', 'HV Battery System Check', NULL, 90, 2, 'Allison EP systems'),
  ('transit_40ft', NULL, 'ADA Lift Functional Check', NULL, 30, 1, 'FTA ADA — monthly operational test');
