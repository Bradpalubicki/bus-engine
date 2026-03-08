-- Complete Coach Works — Migration 001: Agencies & Contracts
-- Table prefix: ccw_

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Agencies (transit clients)
CREATE TABLE ccw_agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  short_name TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  state TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contracts
CREATE TABLE ccw_contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_number TEXT UNIQUE NOT NULL,
  agency_id UUID REFERENCES ccw_agencies(id),
  title TEXT NOT NULL,
  description TEXT,
  contract_value NUMERIC(15,2) NOT NULL,
  bus_count INTEGER,
  start_date DATE,
  end_date DATE,
  status TEXT CHECK (status IN ('draft','active','completed','cancelled')) DEFAULT 'active',
  percent_complete NUMERIC(5,2) DEFAULT 0,
  estimated_total_cost NUMERIC(15,2),
  costs_incurred NUMERIC(15,2) DEFAULT 0,
  revenue_earned NUMERIC(15,2) DEFAULT 0,
  invoiced NUMERIC(15,2) DEFAULT 0,
  collected NUMERIC(15,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contract milestones
CREATE TABLE ccw_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES ccw_contracts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  due_date DATE,
  billing_amount NUMERIC(15,2),
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE ccw_agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to agencies" ON ccw_agencies FOR ALL USING (true);
CREATE POLICY "Service role full access to contracts" ON ccw_contracts FOR ALL USING (true);
CREATE POLICY "Service role full access to milestones" ON ccw_milestones FOR ALL USING (true);
