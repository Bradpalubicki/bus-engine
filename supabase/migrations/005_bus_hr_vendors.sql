-- Migration 005: HR Module (job postings, applications, policies) + Vendor Management
-- bus_ prefix enforced

CREATE TABLE IF NOT EXISTS bus_job_postings (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  department text,
  location text,
  type text DEFAULT 'full_time',
  description text,
  requirements text,
  salary_min numeric(10,2),
  salary_max numeric(10,2),
  status text DEFAULT 'draft',
  posted_at timestamptz,
  filled_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bus_applications (
  id bigserial PRIMARY KEY,
  job_posting_id bigint REFERENCES bus_job_postings(id),
  applicant_name text NOT NULL,
  applicant_email text NOT NULL,
  applicant_phone text,
  resume_url text,
  cover_letter text,
  status text DEFAULT 'new',
  notes text,
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bus_policies (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  category text,
  description text,
  document_url text,
  version text DEFAULT '1.0',
  effective_date date,
  review_date date,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bus_vendors (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  category text,
  contact_name text,
  contact_email text,
  contact_phone text,
  address text,
  website text,
  contract_number text,
  contract_value numeric(12,2),
  contract_start date,
  contract_end date,
  status text DEFAULT 'active',
  payment_terms text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_vendors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON bus_job_postings TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_applications TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_policies TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_vendors TO service_role USING (true) WITH CHECK (true);
