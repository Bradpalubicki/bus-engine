-- Complete Coach Works — Migration 004: Finance, Insurance & Compliance

CREATE TABLE ccw_invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT UNIQUE NOT NULL,
  contract_id UUID REFERENCES ccw_contracts(id),
  milestone_id UUID REFERENCES ccw_milestones(id),
  invoice_type TEXT CHECK (invoice_type IN ('milestone','progress','final','change_order')),
  amount NUMERIC(15,2) NOT NULL,
  status TEXT CHECK (status IN ('draft','sent','paid','overdue','void')) DEFAULT 'draft',
  issued_at TIMESTAMPTZ,
  due_date DATE,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ccw_insurance_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_type TEXT NOT NULL,
  carrier TEXT,
  policy_number TEXT,
  coverage_limit NUMERIC(15,2),
  effective_date DATE,
  expiry_date DATE,
  status TEXT CHECK (status IN ('active','expiring','expired')) DEFAULT 'active',
  days_until_expiry INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ccw_compliance_docs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES ccw_vehicles(id),
  contract_id UUID REFERENCES ccw_contracts(id),
  doc_type TEXT NOT NULL,
  status TEXT CHECK (status IN ('not_started','in_progress','pending_signature','submitted','signed')) DEFAULT 'not_started',
  document_url TEXT,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ccw_pipeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_name TEXT NOT NULL,
  rfp_title TEXT,
  deadline DATE,
  est_value NUMERIC(15,2),
  status TEXT CHECK (status IN ('opportunity','bid_no_bid','proposal_dev','submitted','awarded','lost')) DEFAULT 'opportunity',
  win_probability INTEGER DEFAULT 50,
  bd_owner TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ccw_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_compliance_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_pipeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role access invoices" ON ccw_invoices FOR ALL USING (true);
CREATE POLICY "Service role access insurance" ON ccw_insurance_policies FOR ALL USING (true);
CREATE POLICY "Service role access compliance" ON ccw_compliance_docs FOR ALL USING (true);
CREATE POLICY "Service role access pipeline" ON ccw_pipeline FOR ALL USING (true);
