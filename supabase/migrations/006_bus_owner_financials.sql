-- Migration 006: Owner Financial Dashboard (Dale-only) + Sage Intacct scaffold

CREATE TABLE IF NOT EXISTS bus_financials_snapshot (
  id bigserial PRIMARY KEY,
  period_year int NOT NULL,
  period_month int NOT NULL,
  company text NOT NULL DEFAULT 'CCW',
  -- Income Statement
  revenue_total numeric(14,2) DEFAULT 0,
  revenue_refurb numeric(14,2) DEFAULT 0,
  revenue_zeps numeric(14,2) DEFAULT 0,
  revenue_parts_sales numeric(14,2) DEFAULT 0,
  cogs_total numeric(14,2) DEFAULT 0,
  gross_profit numeric(14,2) DEFAULT 0,
  gross_margin_pct numeric(5,2) DEFAULT 0,
  operating_expenses numeric(14,2) DEFAULT 0,
  ebitda numeric(14,2) DEFAULT 0,
  net_income numeric(14,2) DEFAULT 0,
  -- Balance Sheet
  cash_on_hand numeric(14,2) DEFAULT 0,
  accounts_receivable numeric(14,2) DEFAULT 0,
  accounts_payable numeric(14,2) DEFAULT 0,
  total_assets numeric(14,2) DEFAULT 0,
  total_debt numeric(14,2) DEFAULT 0,
  -- ESOP
  esop_loan_balance numeric(14,2) DEFAULT 0,
  esop_annual_payment numeric(14,2) DEFAULT 0,
  esop_payoff_year int,
  -- Source
  source text DEFAULT 'manual',
  synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(period_year, period_month, company)
);

CREATE TABLE IF NOT EXISTS bus_sage_config (
  id bigserial PRIMARY KEY,
  sender_id text,
  company_id text,
  user_id text,
  client_secret_encrypted text,
  connected_at timestamptz,
  last_sync_at timestamptz,
  sync_status text DEFAULT 'not_connected',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_financials_snapshot ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_sage_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON bus_financials_snapshot TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_sage_config TO service_role USING (true) WITH CHECK (true);
