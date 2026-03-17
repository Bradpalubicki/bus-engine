-- Migration 009: Bus Production Agency Portal
CREATE TABLE IF NOT EXISTS bus_production_stages (
  id bigserial PRIMARY KEY,
  bus_id text NOT NULL,  -- references bus identifier (vehicle number or VIN)
  agency_name text NOT NULL,
  contract_number text,
  current_stage int DEFAULT 1 CHECK (current_stage BETWEEN 1 AND 8),
  -- Stage names: 1=Intake, 2=Teardown, 3=Body/Structure, 4=Mechanical, 5=Electrical, 6=Interior, 7=Testing, 8=Delivery
  stage_1_started_at timestamptz,
  stage_1_completed_at timestamptz,
  stage_2_started_at timestamptz,
  stage_2_completed_at timestamptz,
  stage_3_started_at timestamptz,
  stage_3_completed_at timestamptz,
  stage_4_started_at timestamptz,
  stage_4_completed_at timestamptz,
  stage_5_started_at timestamptz,
  stage_5_completed_at timestamptz,
  stage_6_started_at timestamptz,
  stage_6_completed_at timestamptz,
  stage_7_started_at timestamptz,
  stage_7_completed_at timestamptz,
  stage_8_started_at timestamptz,
  stage_8_completed_at timestamptz,
  estimated_completion date,
  notes text,
  status text DEFAULT 'in_progress',  -- in_progress, completed, on_hold
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bus_agency_users (
  id bigserial PRIMARY KEY,
  agency_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text UNIQUE NOT NULL,
  contact_phone text,
  role text DEFAULT 'fleet_manager',
  magic_link_token text,
  magic_link_expires_at timestamptz,
  last_login_at timestamptz,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_production_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_agency_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON bus_production_stages TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_agency_users TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "anon_read_stages" ON bus_production_stages FOR SELECT TO anon USING (true);
