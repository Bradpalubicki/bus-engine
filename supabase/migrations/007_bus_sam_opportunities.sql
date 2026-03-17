-- Migration 007: SAM.gov Federal Opportunity Tracker

CREATE TABLE IF NOT EXISTS bus_sam_opportunities (
  id bigserial PRIMARY KEY,
  notice_id text UNIQUE NOT NULL,
  title text NOT NULL,
  solicitation_number text,
  department text,
  sub_tier text,
  naics_code text,
  posted_date date,
  response_deadline date,
  award_date date,
  estimated_value numeric(14,2),
  set_aside text,
  synopsis text,
  active boolean DEFAULT true,
  bid_decision text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bus_sam_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_sam_opportunities TO service_role USING (true) WITH CHECK (true);
