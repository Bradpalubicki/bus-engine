export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bus_activity_log: {
        Row: { created_at: string | null; description: string; entity_id: string | null; entity_type: string | null; event_type: string; id: string; performed_by: string | null }
        Insert: { created_at?: string | null; description: string; entity_id?: string | null; entity_type?: string | null; event_type: string; id?: string; performed_by?: string | null }
        Update: { created_at?: string | null; description?: string; entity_id?: string | null; entity_type?: string | null; event_type?: string; id?: string; performed_by?: string | null }
        Relationships: []
      }
      bus_agencies: {
        Row: { clerk_org_id: string | null; contact_email: string | null; contact_name: string | null; contact_phone: string | null; created_at: string | null; id: string; name: string; state: string | null }
        Insert: { clerk_org_id?: string | null; contact_email?: string | null; contact_name?: string | null; contact_phone?: string | null; created_at?: string | null; id?: string; name: string; state?: string | null }
        Update: { clerk_org_id?: string | null; contact_email?: string | null; contact_name?: string | null; contact_phone?: string | null; created_at?: string | null; id?: string; name?: string; state?: string | null }
        Relationships: []
      }
      bus_certifications: {
        Row: { cert_number: string | null; cert_type: string; created_at: string | null; expiry_date: string | null; id: string; issued_date: string | null; technician_id: string | null }
        Insert: { cert_number?: string | null; cert_type: string; created_at?: string | null; expiry_date?: string | null; id?: string; issued_date?: string | null; technician_id?: string | null }
        Update: { cert_number?: string | null; cert_type?: string; created_at?: string | null; expiry_date?: string | null; id?: string; issued_date?: string | null; technician_id?: string | null }
        Relationships: []
      }
      bus_compliance_docs: {
        Row: { agency_signed_at: string | null; ccw_signed_at: string | null; contract_id: string | null; created_at: string | null; doc_type: string; file_url: string | null; id: string; sign_token: string | null; status: string | null; vehicle_id: string | null }
        Insert: { agency_signed_at?: string | null; ccw_signed_at?: string | null; contract_id?: string | null; created_at?: string | null; doc_type: string; file_url?: string | null; id?: string; sign_token?: string | null; status?: string | null; vehicle_id?: string | null }
        Update: { agency_signed_at?: string | null; ccw_signed_at?: string | null; contract_id?: string | null; created_at?: string | null; doc_type?: string; file_url?: string | null; id?: string; sign_token?: string | null; status?: string | null; vehicle_id?: string | null }
        Relationships: []
      }
      bus_contract_milestones: {
        Row: { billing_amount: number | null; completed_at: string | null; contract_id: string | null; created_at: string | null; due_date: string | null; id: string; title: string; weight_pct: number | null }
        Insert: { billing_amount?: number | null; completed_at?: string | null; contract_id?: string | null; created_at?: string | null; due_date?: string | null; id?: string; title: string; weight_pct?: number | null }
        Update: { billing_amount?: number | null; completed_at?: string | null; contract_id?: string | null; created_at?: string | null; due_date?: string | null; id?: string; title?: string; weight_pct?: number | null }
        Relationships: []
      }
      bus_contracts: {
        Row: { agency_id: string | null; bus_count: number | null; contract_number: string | null; costs_incurred: number | null; created_at: string | null; end_date: string | null; estimated_total_cost: number | null; id: string; notes: string | null; revenue_recognized: number | null; start_date: string | null; status: string | null; title: string; value: number | null }
        Insert: { agency_id?: string | null; bus_count?: number | null; contract_number?: string | null; costs_incurred?: number | null; created_at?: string | null; end_date?: string | null; estimated_total_cost?: number | null; id?: string; notes?: string | null; revenue_recognized?: number | null; start_date?: string | null; status?: string | null; title: string; value?: number | null }
        Update: { agency_id?: string | null; bus_count?: number | null; contract_number?: string | null; costs_incurred?: number | null; created_at?: string | null; end_date?: string | null; estimated_total_cost?: number | null; id?: string; notes?: string | null; revenue_recognized?: number | null; start_date?: string | null; status?: string | null; title?: string; value?: number | null }
        Relationships: []
      }
      bus_insurance_policies: {
        Row: { carrier: string | null; coverage_limit: number | null; created_at: string | null; effective_date: string | null; expiry_date: string | null; id: string; notes: string | null; policy_number: string | null; policy_type: string; status: string | null }
        Insert: { carrier?: string | null; coverage_limit?: number | null; created_at?: string | null; effective_date?: string | null; expiry_date?: string | null; id?: string; notes?: string | null; policy_number?: string | null; policy_type: string; status?: string | null }
        Update: { carrier?: string | null; coverage_limit?: number | null; created_at?: string | null; effective_date?: string | null; expiry_date?: string | null; id?: string; notes?: string | null; policy_number?: string | null; policy_type?: string; status?: string | null }
        Relationships: []
      }
      bus_inventory: {
        Row: { id: string; location_id: string | null; part_id: string | null; quantity_on_hand: number | null; reorder_point: number | null; reorder_qty: number | null }
        Insert: { id?: string; location_id?: string | null; part_id?: string | null; quantity_on_hand?: number | null; reorder_point?: number | null; reorder_qty?: number | null }
        Update: { id?: string; location_id?: string | null; part_id?: string | null; quantity_on_hand?: number | null; reorder_point?: number | null; reorder_qty?: number | null }
        Relationships: []
      }
      bus_inventory_txns: {
        Row: { created_at: string | null; id: string; location_id: string | null; part_id: string | null; performed_by: string | null; quantity: number; reference: string | null; txn_type: string; work_order_id: string | null }
        Insert: { created_at?: string | null; id?: string; location_id?: string | null; part_id?: string | null; performed_by?: string | null; quantity: number; reference?: string | null; txn_type: string; work_order_id?: string | null }
        Update: { created_at?: string | null; id?: string; location_id?: string | null; part_id?: string | null; performed_by?: string | null; quantity?: number; reference?: string | null; txn_type?: string; work_order_id?: string | null }
        Relationships: []
      }
      bus_invoices: {
        Row: { amount: number | null; contract_id: string | null; created_at: string | null; due_date: string | null; id: string; invoice_number: string | null; invoice_type: string | null; issued_at: string | null; notes: string | null; paid_at: string | null; status: string | null }
        Insert: { amount?: number | null; contract_id?: string | null; created_at?: string | null; due_date?: string | null; id?: string; invoice_number?: string | null; invoice_type?: string | null; issued_at?: string | null; notes?: string | null; paid_at?: string | null; status?: string | null }
        Update: { amount?: number | null; contract_id?: string | null; created_at?: string | null; due_date?: string | null; id?: string; invoice_number?: string | null; invoice_type?: string | null; issued_at?: string | null; notes?: string | null; paid_at?: string | null; status?: string | null }
        Relationships: []
      }
      bus_locations: {
        Row: { active: boolean | null; address: string | null; city: string | null; created_at: string | null; id: string; name: string; phone: string | null; state: string | null; type: string | null }
        Insert: { active?: boolean | null; address?: string | null; city?: string | null; created_at?: string | null; id?: string; name: string; phone?: string | null; state?: string | null; type?: string | null }
        Update: { active?: boolean | null; address?: string | null; city?: string | null; created_at?: string | null; id?: string; name?: string; phone?: string | null; state?: string | null; type?: string | null }
        Relationships: []
      }
      bus_parts: {
        Row: { active: boolean | null; category: string | null; created_at: string | null; description: string; id: string; part_number: string; supplier_name: string | null; unit_cost: number | null }
        Insert: { active?: boolean | null; category?: string | null; created_at?: string | null; description: string; id?: string; part_number: string; supplier_name?: string | null; unit_cost?: number | null }
        Update: { active?: boolean | null; category?: string | null; created_at?: string | null; description?: string; id?: string; part_number?: string; supplier_name?: string | null; unit_cost?: number | null }
        Relationships: []
      }
      bus_qa_checkpoints: {
        Row: { checkpoint_name: string; created_at: string | null; id: string; notes: string | null; signed_at: string | null; signed_off_by: string | null; status: string | null; work_order_id: string | null }
        Insert: { checkpoint_name: string; created_at?: string | null; id?: string; notes?: string | null; signed_at?: string | null; signed_off_by?: string | null; status?: string | null; work_order_id?: string | null }
        Update: { checkpoint_name?: string; created_at?: string | null; id?: string; notes?: string | null; signed_at?: string | null; signed_off_by?: string | null; status?: string | null; work_order_id?: string | null }
        Relationships: []
      }
      bus_rfp_pipeline: {
        Row: { agency_name: string; bd_owner: string | null; created_at: string | null; deadline: string | null; est_value: number | null; id: string; notes: string | null; rfp_title: string | null; source: string | null; status: string | null; win_probability: number | null }
        Insert: { agency_name: string; bd_owner?: string | null; created_at?: string | null; deadline?: string | null; est_value?: number | null; id?: string; notes?: string | null; rfp_title?: string | null; source?: string | null; status?: string | null; win_probability?: number | null }
        Update: { agency_name?: string; bd_owner?: string | null; created_at?: string | null; deadline?: string | null; est_value?: number | null; id?: string; notes?: string | null; rfp_title?: string | null; source?: string | null; status?: string | null; win_probability?: number | null }
        Relationships: []
      }
      bus_technicians: {
        Row: { active: boolean | null; created_at: string | null; email: string | null; hire_date: string | null; id: string; location_id: string | null; name: string; phone: string | null; years_experience: number | null }
        Insert: { active?: boolean | null; created_at?: string | null; email?: string | null; hire_date?: string | null; id?: string; location_id?: string | null; name: string; phone?: string | null; years_experience?: number | null }
        Update: { active?: boolean | null; created_at?: string | null; email?: string | null; hire_date?: string | null; id?: string; location_id?: string | null; name?: string; phone?: string | null; years_experience?: number | null }
        Relationships: []
      }
      bus_vehicles: {
        Row: { agency_id: string | null; contract_id: string | null; created_at: string | null; delivered_at: string | null; fuel_type: string | null; id: string; intake_date: string | null; length_ft: number | null; location_id: string | null; make: string | null; model: string | null; notes: string | null; status: string | null; target_completion: string | null; vin: string; warranty_expiry: string | null; year: number | null }
        Insert: { agency_id?: string | null; contract_id?: string | null; created_at?: string | null; delivered_at?: string | null; fuel_type?: string | null; id?: string; intake_date?: string | null; length_ft?: number | null; location_id?: string | null; make?: string | null; model?: string | null; notes?: string | null; status?: string | null; target_completion?: string | null; vin: string; warranty_expiry?: string | null; year?: number | null }
        Update: { agency_id?: string | null; contract_id?: string | null; created_at?: string | null; delivered_at?: string | null; fuel_type?: string | null; id?: string; intake_date?: string | null; length_ft?: number | null; location_id?: string | null; make?: string | null; model?: string | null; notes?: string | null; status?: string | null; target_completion?: string | null; vin?: string; warranty_expiry?: string | null; year?: number | null }
        Relationships: []
      }
      bus_wo_assignments: {
        Row: { assigned_at: string | null; id: string; technician_id: string | null; work_order_id: string | null }
        Insert: { assigned_at?: string | null; id?: string; technician_id?: string | null; work_order_id?: string | null }
        Update: { assigned_at?: string | null; id?: string; technician_id?: string | null; work_order_id?: string | null }
        Relationships: []
      }
      bus_wo_line_items: {
        Row: { actual_hours: number | null; created_at: string | null; description: string; est_hours: number | null; id: string; service_type: string | null; status: string | null; work_order_id: string | null }
        Insert: { actual_hours?: number | null; created_at?: string | null; description: string; est_hours?: number | null; id?: string; service_type?: string | null; status?: string | null; work_order_id?: string | null }
        Update: { actual_hours?: number | null; created_at?: string | null; description?: string; est_hours?: number | null; id?: string; service_type?: string | null; status?: string | null; work_order_id?: string | null }
        Relationships: []
      }
      bus_wo_time_logs: {
        Row: { created_at: string | null; hours: number; id: string; log_date: string; notes: string | null; technician_id: string | null; technician_name: string | null; work_order_id: string | null }
        Insert: { created_at?: string | null; hours: number; id?: string; log_date: string; notes?: string | null; technician_id?: string | null; technician_name?: string | null; work_order_id?: string | null }
        Update: { created_at?: string | null; hours?: number; id?: string; log_date?: string; notes?: string | null; technician_id?: string | null; technician_name?: string | null; work_order_id?: string | null }
        Relationships: []
      }
      bus_work_orders: {
        Row: { closed_at: string | null; contract_id: string | null; created_at: string | null; id: string; location_id: string | null; notes: string | null; opened_at: string | null; service_type: string | null; status: string | null; target_date: string | null; vehicle_id: string | null; wo_number: string | null }
        Insert: { closed_at?: string | null; contract_id?: string | null; created_at?: string | null; id?: string; location_id?: string | null; notes?: string | null; opened_at?: string | null; service_type?: string | null; status?: string | null; target_date?: string | null; vehicle_id?: string | null; wo_number?: string | null }
        Update: { closed_at?: string | null; contract_id?: string | null; created_at?: string | null; id?: string; location_id?: string | null; notes?: string | null; opened_at?: string | null; service_type?: string | null; status?: string | null; target_date?: string | null; vehicle_id?: string | null; wo_number?: string | null }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
