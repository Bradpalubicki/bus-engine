// Complete Coach Works — Demo Data
// All data used when NEXT_PUBLIC_DEMO_MODE=true

export const demoLocations = [
  { id: 'loc-1', name: 'Riverside', city: 'Riverside', state: 'CA', type: 'hq', address: '1863 Service Court, Riverside, CA 92507', phone: '(951) 684-9585', activeWOs: 18, utilization: 94, alerts: 2 },
  { id: 'loc-2', name: 'Alameda', city: 'Alameda', state: 'CA', type: 'satellite', address: '2301 Monarch St, Alameda, CA 94501', phone: '(510) 555-0142', activeWOs: 11, utilization: 88, alerts: 0 },
  { id: 'loc-3', name: 'Seattle', city: 'Seattle', state: 'WA', type: 'field', address: '4821 East Marginal Way S, Seattle, WA 98134', phone: '(206) 555-0189', activeWOs: 4, utilization: 61, alerts: 1 },
  { id: 'loc-4', name: 'Memphis', city: 'Memphis', state: 'TN', type: 'field', address: '3200 Lamar Ave, Memphis, TN 38118', phone: '(901) 555-0156', activeWOs: 6, utilization: 79, alerts: 0 },
  { id: 'loc-5', name: 'El Paso', city: 'El Paso', state: 'TX', type: 'field', address: '11670 Gateway Blvd N, El Paso, TX 79934', phone: '(915) 555-0177', activeWOs: 5, utilization: 82, alerts: 0 },
  { id: 'loc-6', name: 'Del Rio', city: 'Del Rio', state: 'TX', type: 'field', address: '200 Industrial Blvd, Del Rio, TX 78840', phone: '(830) 555-0134', activeWOs: 3, utilization: 71, alerts: 0 },
  { id: 'loc-7', name: 'Laredo', city: 'Laredo', state: 'TX', type: 'field', address: '6919 Springfield Ave, Laredo, TX 78041', phone: '(956) 555-0198', activeWOs: 4, utilization: 77, alerts: 0 },
  { id: 'loc-8', name: 'San Benito', city: 'San Benito', state: 'TX', type: 'field', address: '900 W Business 77, San Benito, TX 78586', phone: '(956) 555-0211', activeWOs: 3, utilization: 76, alerts: 0 },
  { id: 'loc-9', name: 'Phoenix', city: 'Phoenix', state: 'AZ', type: 'field', address: '4025 E Broadway Rd, Phoenix, AZ 85040', phone: '(602) 555-0167', activeWOs: 2, utilization: 58, alerts: 1 },
  { id: 'loc-10', name: 'Waukesha', city: 'Waukesha', state: 'WI', type: 'field', address: '1551 E Main St, Waukesha, WI 53186', phone: '(262) 555-0143', activeWOs: 5, utilization: 85, alerts: 0 },
  { id: 'loc-11', name: 'Von Ormy', city: 'Von Ormy', state: 'TX', type: 'field', address: 'Von Ormy, TX 78073', phone: '(210) 555-0231', activeWOs: 3, utilization: 74, alerts: 0 },
  { id: 'loc-12', name: 'Tucson', city: 'Tucson', state: 'AZ', type: 'field', address: 'Tucson, AZ 85701', phone: '(520) 555-0244', activeWOs: 2, utilization: 67, alerts: 0 },
  { id: 'loc-13', name: 'Taylor', city: 'Taylor', state: 'TX', type: 'field', address: 'Taylor, TX 76574', phone: '(512) 555-0258', activeWOs: 1, utilization: 55, alerts: 0 },
]

export const demoAgencies = [
  { id: 'ag-1', name: 'San Francisco Municipal Transportation Agency', shortName: 'SFMTA', state: 'CA', contact: 'Robert Haley', email: 'rhaley@sfmta.com' },
  { id: 'ag-2', name: 'Long Beach Transit', shortName: 'LBT', state: 'CA', contact: 'Maria Chen', email: 'mchen@lbtransit.com' },
  { id: 'ag-3', name: 'Indianapolis Public Transportation Corporation', shortName: 'IndyGo', state: 'IN', contact: 'James Porter', email: 'jporter@indygo.net' },
  { id: 'ag-4', name: 'Denver Regional Transportation District', shortName: 'Denver RTD', state: 'CO', contact: 'Sandra Williams', email: 'swilliams@rtd-denver.com' },
]

export const demoContracts = [
  {
    id: 'con-1',
    contractNumber: 'CCW-2024-SFMTA-001',
    agencyId: 'ag-1',
    agencyName: 'SFMTA',
    title: 'Mid-Life Overhaul — Hybrid Electric Fleet',
    value: 4200000,
    busCount: 21,
    startDate: '2024-06-01',
    endDate: '2026-06-30',
    status: 'active',
    percentComplete: 68,
    estimatedTotalCost: 3360000,
    costsIncurred: 2284800,
    revenueEarned: 2856000,
    invoiced: 2600000,
    collected: 2400000,
    milestones: [
      { id: 'm-1', title: 'Phase 1 — Buses 1-7 Complete', dueDate: '2024-12-15', billingAmount: 1400000, completedAt: '2024-12-10' },
      { id: 'm-2', title: 'Phase 2 — Buses 8-14 Complete', dueDate: '2025-06-30', billingAmount: 1400000, completedAt: '2025-06-28' },
      { id: 'm-3', title: 'Phase 3 — Buses 15-21 Complete', dueDate: '2026-06-30', billingAmount: 1400000, completedAt: null },
    ]
  },
  {
    id: 'con-2',
    contractNumber: 'CCW-2025-LBT-004',
    agencyId: 'ag-2',
    agencyName: 'Long Beach Transit',
    title: 'CNG Engine Repower Program',
    value: 1850000,
    busCount: 13,
    startDate: '2025-03-01',
    endDate: '2026-09-30',
    status: 'active',
    percentComplete: 34,
    estimatedTotalCost: 1480000,
    costsIncurred: 503200,
    revenueEarned: 629000,
    invoiced: 500000,
    collected: 312500,
    milestones: [
      { id: 'm-4', title: 'Phase 1 — Buses 1-4 Complete', dueDate: '2025-09-15', billingAmount: 616667, completedAt: '2025-09-12' },
      { id: 'm-5', title: 'Phase 2 — Buses 5-9 Complete', dueDate: '2026-03-31', billingAmount: 616667, completedAt: null },
      { id: 'm-6', title: 'Phase 3 — Buses 10-13 Complete', dueDate: '2026-09-30', billingAmount: 616666, completedAt: null },
    ]
  },
  {
    id: 'con-3',
    contractNumber: 'CCW-2024-INDY-002',
    agencyId: 'ag-3',
    agencyName: 'IndyGo',
    title: 'ZEPS Zero-Emission Electric Conversion',
    value: 3100000,
    busCount: 18,
    startDate: '2024-01-15',
    endDate: '2026-04-30',
    status: 'active',
    percentComplete: 91,
    estimatedTotalCost: 2480000,
    costsIncurred: 2256800,
    revenueEarned: 2821000,
    invoiced: 2900000,
    collected: 2900000,
    milestones: [
      { id: 'm-7', title: 'Phase 1 — 6 Buses Converted', dueDate: '2024-07-31', billingAmount: 1033333, completedAt: '2024-07-25' },
      { id: 'm-8', title: 'Phase 2 — 12 Buses Converted', dueDate: '2025-06-30', billingAmount: 1033333, completedAt: '2025-06-20' },
      { id: 'm-9', title: 'Phase 3 — Final 6 Buses + Delivery', dueDate: '2026-04-30', billingAmount: 1033334, completedAt: null },
    ]
  },
  {
    id: 'con-4',
    contractNumber: 'CCW-2026-RTD-001',
    agencyId: 'ag-4',
    agencyName: 'Denver RTD',
    title: 'Interior Rehabilitation Program',
    value: 780000,
    busCount: 8,
    startDate: '2026-01-10',
    endDate: '2026-12-15',
    status: 'active',
    percentComplete: 12,
    estimatedTotalCost: 624000,
    costsIncurred: 74880,
    revenueEarned: 93600,
    invoiced: 0,
    collected: 0,
    milestones: [
      { id: 'm-10', title: 'Phase 1 — Buses 1-4 Complete', dueDate: '2026-07-15', billingAmount: 390000, completedAt: null },
      { id: 'm-11', title: 'Phase 2 — Buses 5-8 Complete', dueDate: '2026-12-15', billingAmount: 390000, completedAt: null },
    ]
  },
]

export const demoVehicles = [
  { id: 'v-1', vin: 'CCW-001', agencyId: 'ag-1', agencyName: 'SFMTA', contractId: 'con-1', locationId: 'loc-1', make: 'New Flyer', model: 'D40LF', year: 2012, lengthFt: 40, fuelType: 'hybrid', status: 'in_progress', intakeDate: '2026-01-15', targetCompletion: '2026-03-28', techAssigned: 'Mike Reyes', daysInShop: 51 },
  { id: 'v-2', vin: 'CCW-002', agencyId: 'ag-1', agencyName: 'SFMTA', contractId: 'con-1', locationId: 'loc-1', make: 'Gillig', model: 'Phantom', year: 2011, lengthFt: 40, fuelType: 'diesel', status: 'qa_hold', intakeDate: '2026-01-20', targetCompletion: '2026-03-25', techAssigned: 'Sarah Kim', daysInShop: 46 },
  { id: 'v-3', vin: 'CCW-003', agencyId: 'ag-2', agencyName: 'Long Beach Transit', contractId: 'con-2', locationId: 'loc-2', make: 'MCI', model: 'D4500', year: 2013, lengthFt: 45, fuelType: 'cng', status: 'in_progress', intakeDate: '2026-02-01', targetCompletion: '2026-04-10', techAssigned: 'James Wilson', daysInShop: 34 },
  { id: 'v-4', vin: 'CCW-004', agencyId: 'ag-3', agencyName: 'IndyGo', contractId: 'con-3', locationId: 'loc-1', make: 'Nova Bus', model: 'LFS', year: 2014, lengthFt: 40, fuelType: 'diesel', status: 'complete', intakeDate: '2026-01-05', targetCompletion: '2026-03-01', techAssigned: 'Carlos Mendez', daysInShop: 61 },
  { id: 'v-5', vin: 'CCW-005', agencyId: 'ag-3', agencyName: 'IndyGo', contractId: 'con-3', locationId: 'loc-1', make: 'New Flyer', model: 'XDE40', year: 2013, lengthFt: 40, fuelType: 'diesel', status: 'delivered', intakeDate: '2025-12-01', targetCompletion: '2026-02-15', deliveredAt: '2026-02-12', techAssigned: 'Mike Reyes', daysInShop: 73 },
  { id: 'v-6', vin: 'CCW-006', agencyId: 'ag-1', agencyName: 'SFMTA', contractId: 'con-1', locationId: 'loc-2', make: 'Gillig', model: 'Advantage', year: 2012, lengthFt: 40, fuelType: 'hybrid', status: 'queued', intakeDate: '2026-03-01', targetCompletion: '2026-05-15', techAssigned: 'Tom Bradley', daysInShop: 6 },
  { id: 'v-7', vin: 'CCW-007', agencyId: 'ag-4', agencyName: 'Denver RTD', contractId: 'con-4', locationId: 'loc-3', make: 'MCI', model: 'D4500CT', year: 2015, lengthFt: 45, fuelType: 'cng', status: 'intake', intakeDate: '2026-03-05', targetCompletion: '2026-06-20', techAssigned: 'Lisa Park', daysInShop: 2 },
  { id: 'v-8', vin: 'CCW-008', agencyId: 'ag-2', agencyName: 'Long Beach Transit', contractId: 'con-2', locationId: 'loc-2', make: 'Nova Bus', model: 'LFS Artic', year: 2014, lengthFt: 60, fuelType: 'cng', status: 'in_progress', intakeDate: '2026-02-10', targetCompletion: '2026-04-20', techAssigned: 'James Wilson', daysInShop: 25 },
  { id: 'v-9', vin: 'CCW-009', agencyId: 'ag-1', agencyName: 'SFMTA', contractId: 'con-1', locationId: 'loc-1', make: 'New Flyer', model: 'DE60LF', year: 2011, lengthFt: 60, fuelType: 'hybrid', status: 'qa_hold', intakeDate: '2026-01-25', targetCompletion: '2026-03-30', techAssigned: 'Sarah Kim', daysInShop: 41 },
  { id: 'v-10', vin: 'CCW-010', agencyId: 'ag-3', agencyName: 'IndyGo', contractId: 'con-3', locationId: 'loc-1', make: 'Gillig', model: 'Phantom', year: 2012, lengthFt: 40, fuelType: 'electric', status: 'complete', intakeDate: '2026-01-08', targetCompletion: '2026-03-05', techAssigned: 'Carlos Mendez', daysInShop: 58 },
  { id: 'v-11', vin: 'CCW-011', agencyId: 'ag-4', agencyName: 'Denver RTD', contractId: 'con-4', locationId: 'loc-4', make: 'MCI', model: 'D4500', year: 2016, lengthFt: 45, fuelType: 'diesel', status: 'queued', intakeDate: '2026-02-28', targetCompletion: '2026-05-30', techAssigned: 'Maria Santos', daysInShop: 7 },
  { id: 'v-12', vin: 'CCW-012', agencyId: 'ag-2', agencyName: 'Long Beach Transit', contractId: 'con-2', locationId: 'loc-2', make: 'New Flyer', model: 'D40LF', year: 2013, lengthFt: 40, fuelType: 'cng', status: 'intake', intakeDate: '2026-03-04', targetCompletion: '2026-06-15', techAssigned: null, daysInShop: 3 },
]

export const demoTechnicians = [
  { id: 'tech-1', name: 'Mike Reyes', locationId: 'loc-1', locationName: 'Riverside', yearsExp: 12, activeWOs: 3, certs: ['ASE Master', 'CNG Certified', 'Hybrid Systems'], certExpiry: null },
  { id: 'tech-2', name: 'Sarah Kim', locationId: 'loc-1', locationName: 'Riverside', yearsExp: 8, activeWOs: 2, certs: ['Electrical Systems', 'ADA Equipment', 'OSHA 30'], certExpiry: null },
  { id: 'tech-3', name: 'Carlos Mendez', locationId: 'loc-1', locationName: 'Riverside', yearsExp: 15, activeWOs: 2, certs: ['Structural Specialist', 'Paint & Body', 'ASE'], certExpiry: null },
  { id: 'tech-4', name: 'James Wilson', locationId: 'loc-2', locationName: 'Alameda', yearsExp: 10, activeWOs: 2, certs: ['ASE Master', 'Hybrid Systems', 'ZEPS Certified'], certExpiry: null },
  { id: 'tech-5', name: 'Tom Bradley', locationId: 'loc-2', locationName: 'Alameda', yearsExp: 6, activeWOs: 1, certs: ['CNG Certified', 'CARB Certified'], certExpiry: '2026-04-15' },
  { id: 'tech-6', name: 'Lisa Park', locationId: 'loc-3', locationName: 'Seattle', yearsExp: 4, activeWOs: 1, certs: ['Electrical Systems', 'ADA Equipment'], certExpiry: null },
  { id: 'tech-7', name: 'David Chen', locationId: 'loc-5', locationName: 'El Paso', yearsExp: 9, activeWOs: 2, certs: ['ASE', 'CNG Certified', 'Welding Cert'], certExpiry: null },
  { id: 'tech-8', name: 'Maria Santos', locationId: 'loc-4', locationName: 'Memphis', yearsExp: 7, activeWOs: 1, certs: ['Structural Specialist', 'Interior Systems', 'ASE'], certExpiry: null },
]

export const demoParts = [
  { id: 'p-1', partNumber: 'CUM-ISL-ASM', description: 'Cummins ISL Engine Assembly (280HP)', category: 'Powertrain', supplier: 'Cummins Inc.', unitCost: 28500, qtyOnHand: 2, reorderPoint: 3, status: 'low_stock' },
  { id: 'p-2', partNumber: 'ALL-B400R-TX', description: 'Allison B400R Transmission', category: 'Powertrain', supplier: 'Allison Transmission', unitCost: 18200, qtyOnHand: 1, reorderPoint: 2, status: 'low_stock' },
  { id: 'p-3', partNumber: 'LUM-HRZ-SIGN', description: 'Luminator Horizon Destination Sign', category: 'Electronics', supplier: 'Luminator Technology', unitCost: 4800, qtyOnHand: 4, reorderPoint: 5, status: 'low_stock' },
  { id: 'p-4', partNumber: 'KNR-DOOR-ACT', description: 'Knorr-Bremse Door Actuator Assembly', category: 'Door Systems', supplier: 'Knorr-Bremse', unitCost: 2100, qtyOnHand: 12, reorderPoint: 6, status: 'ok' },
  { id: 'p-5', partNumber: 'ZF-AXLE-R', description: 'ZF Rear Drive Axle Assembly', category: 'Drivetrain', supplier: 'ZF Aftermarket', unitCost: 14500, qtyOnHand: 4, reorderPoint: 2, status: 'ok' },
  { id: 'p-6', partNumber: 'THM-AC-COMP', description: 'Thermo King AC Compressor Unit', category: 'HVAC', supplier: 'Thermo King', unitCost: 3200, qtyOnHand: 8, reorderPoint: 4, status: 'ok' },
  { id: 'p-7', partNumber: 'GIL-FLOOR-KIT', description: 'Gillig Flooring Kit (40ft)', category: 'Interior', supplier: 'Gillig LLC', unitCost: 1850, qtyOnHand: 6, reorderPoint: 3, status: 'ok' },
  { id: 'p-8', partNumber: 'BRU-SEAT-36', description: 'Buson Transit Seat w/ Armrests', category: 'Interior', supplier: 'Buson Seating', unitCost: 480, qtyOnHand: 48, reorderPoint: 20, status: 'ok' },
  { id: 'p-9', partNumber: 'VMS-LIFT-4000', description: 'Ricon Wheelchair Lift System K-Series', category: 'ADA', supplier: 'Ricon Corp', unitCost: 6800, qtyOnHand: 5, reorderPoint: 3, status: 'ok' },
  { id: 'p-10', partNumber: 'CUM-CNG-TANK', description: 'Cummins CNG Fuel Tank (GGE-equiv)', category: 'CNG Systems', supplier: 'Cummins Inc.', unitCost: 3400, qtyOnHand: 14, reorderPoint: 6, status: 'ok' },
  { id: 'p-11', partNumber: 'MOB-WIRING-H', description: 'Main Wiring Harness — 40ft Bus', category: 'Electrical', supplier: 'Mobilcom', unitCost: 2800, qtyOnHand: 9, reorderPoint: 4, status: 'ok' },
  { id: 'p-12', partNumber: 'SAF-MIRROR-EXT', description: 'Extended Side Mirror Assembly w/ Camera', category: 'Safety', supplier: 'Saf-Holland', unitCost: 890, qtyOnHand: 22, reorderPoint: 8, status: 'ok' },
  { id: 'p-13', partNumber: 'ALL-HYBRID-BAT', description: 'Allison EP System Battery Pack', category: 'Hybrid/Electric', supplier: 'Allison Transmission', unitCost: 42000, qtyOnHand: 3, reorderPoint: 2, status: 'ok' },
  { id: 'p-14', partNumber: 'NF-FRONT-CAP', description: 'New Flyer Front End Cap Assembly', category: 'Body/Structural', supplier: 'New Flyer Industries', unitCost: 7200, qtyOnHand: 5, reorderPoint: 2, status: 'ok' },
  { id: 'p-15', partNumber: 'PPG-BUS-PAINT', description: 'PPG Bus Exterior Paint (5-gal)', category: 'Paint', supplier: 'PPG Industries', unitCost: 385, qtyOnHand: 32, reorderPoint: 10, status: 'ok' },
  { id: 'p-16', partNumber: 'GEN-SUSPEN-KIT', description: 'Air Suspension Rebuild Kit', category: 'Suspension', supplier: 'Hendrickson', unitCost: 1650, qtyOnHand: 11, reorderPoint: 4, status: 'ok' },
  { id: 'p-17', partNumber: 'BON-BRAKE-SET', description: 'Bendix Full Brake System Kit', category: 'Brakes', supplier: 'Bendix Commercial', unitCost: 2200, qtyOnHand: 15, reorderPoint: 5, status: 'ok' },
  { id: 'p-18', partNumber: 'DEST-CTRL-UNIT', description: 'Mobitec Destination Sign Controller', category: 'Electronics', supplier: 'Mobitec', unitCost: 1200, qtyOnHand: 7, reorderPoint: 4, status: 'ok' },
  { id: 'p-19', partNumber: 'CNG-REG-VALVE', description: 'CNG Pressure Regulator Valve Assembly', category: 'CNG Systems', supplier: 'Chart Industries', unitCost: 960, qtyOnHand: 18, reorderPoint: 6, status: 'ok' },
  { id: 'p-20', partNumber: 'LED-INT-LIGHT', description: 'LED Interior Lighting Kit (full bus)', category: 'Electrical', supplier: 'Dialight', unitCost: 1100, qtyOnHand: 13, reorderPoint: 5, status: 'ok' },
]

export const demoPipeline = [
  { id: 'rfp-1', agencyName: 'Portland TriMet', rfpTitle: 'Bus Rehabilitation — 16 Coaches', deadline: '2026-04-15', estValue: 2400000, status: 'proposal_dev', winProbability: 72, bdOwner: 'Dale Carson', daysUntilDeadline: 39 },
  { id: 'rfp-2', agencyName: 'Denver RTD', rfpTitle: 'Phase 2 — Additional Interior Rehab', deadline: '2026-03-30', estValue: 1100000, status: 'submitted', winProbability: 85, bdOwner: 'Sarah Mitchell', daysUntilDeadline: 23 },
  { id: 'rfp-3', agencyName: 'VTA San Jose', rfpTitle: 'Hybrid Repower — 22 Coaches', deadline: '2026-06-01', estValue: 3800000, status: 'opportunity', winProbability: 45, bdOwner: 'Dale Carson', daysUntilDeadline: 86 },
  { id: 'rfp-4', agencyName: 'Sacramento RT', rfpTitle: 'ZEPS Electric Conversion Program', deadline: '2026-05-15', estValue: 5200000, status: 'bid_no_bid', winProbability: 60, bdOwner: 'Tom Richardson', daysUntilDeadline: 69 },
]

export const demoInsurance = [
  { id: 'ins-1', policyType: 'Commercial General Liability', carrier: 'Travelers Insurance', policyNumber: 'GL-4892-CCW', coverageLimit: 4000000, effectiveDate: '2025-11-01', expiryDate: '2026-11-01', status: 'active', daysUntilExpiry: 239 },
  { id: 'ins-2', policyType: 'Garage Keepers Legal Liability', carrier: 'Zurich North America', policyNumber: 'GK-7731-CCW', coverageLimit: 5000000, effectiveDate: '2025-04-08', expiryDate: '2026-04-08', status: 'expiring', daysUntilExpiry: 32 },
  { id: 'ins-3', policyType: 'Workers Compensation (10 States)', carrier: 'Liberty Mutual', policyNumber: 'WC-2209-CCW', coverageLimit: 0, effectiveDate: '2025-07-01', expiryDate: '2026-07-01', status: 'active', daysUntilExpiry: 116 },
  { id: 'ins-4', policyType: 'Commercial Auto', carrier: 'Progressive Commercial', policyNumber: 'CA-8814-CCW', coverageLimit: 1000000, effectiveDate: '2025-07-01', expiryDate: '2026-07-01', status: 'active', daysUntilExpiry: 116 },
  { id: 'ins-5', policyType: 'Umbrella / Excess Liability', carrier: 'AIG', policyNumber: 'UMB-3345-CCW', coverageLimit: 10000000, effectiveDate: '2025-11-01', expiryDate: '2026-11-01', status: 'active', daysUntilExpiry: 239 },
  { id: 'ins-6', policyType: 'Professional / E&O Liability', carrier: 'Chubb', policyNumber: 'EO-6621-CCW', coverageLimit: 2000000, effectiveDate: '2025-11-01', expiryDate: '2026-11-01', status: 'active', daysUntilExpiry: 239 },
]

export const demoWorkOrders = [
  { id: 'wo-1', woNumber: 'WO-2026-001', vehicleId: 'v-1', vin: 'CCW-001', agencyName: 'SFMTA', contractId: 'con-1', locationId: 'loc-1', locationName: 'Riverside', status: 'in_progress', openedAt: '2026-01-15', targetDate: '2026-03-28', techAssigned: 'Mike Reyes', serviceType: 'Midlife Overhaul', daysOpen: 51 },
  { id: 'wo-2', woNumber: 'WO-2026-002', vehicleId: 'v-2', vin: 'CCW-002', agencyName: 'SFMTA', contractId: 'con-1', locationId: 'loc-1', locationName: 'Riverside', status: 'qa_hold', openedAt: '2026-01-20', targetDate: '2026-03-25', techAssigned: 'Sarah Kim', serviceType: 'Electrical Overhaul', daysOpen: 46 },
  { id: 'wo-3', woNumber: 'WO-2026-003', vehicleId: 'v-3', vin: 'CCW-003', agencyName: 'Long Beach Transit', contractId: 'con-2', locationId: 'loc-2', locationName: 'Alameda', status: 'in_progress', openedAt: '2026-02-01', targetDate: '2026-04-10', techAssigned: 'James Wilson', serviceType: 'CNG Repower', daysOpen: 34 },
  { id: 'wo-4', woNumber: 'WO-2026-004', vehicleId: 'v-4', vin: 'CCW-004', agencyName: 'IndyGo', contractId: 'con-3', locationId: 'loc-1', locationName: 'Riverside', status: 'complete', openedAt: '2026-01-05', targetDate: '2026-03-01', techAssigned: 'Carlos Mendez', serviceType: 'ZEPS Conversion', daysOpen: 61 },
  { id: 'wo-5', woNumber: 'WO-2026-005', vehicleId: 'v-6', vin: 'CCW-006', agencyName: 'SFMTA', contractId: 'con-1', locationId: 'loc-2', locationName: 'Alameda', status: 'queued', openedAt: '2026-03-01', targetDate: '2026-05-15', techAssigned: 'Tom Bradley', serviceType: 'Midlife Overhaul', daysOpen: 6 },
  { id: 'wo-6', woNumber: 'WO-2026-006', vehicleId: 'v-7', vin: 'CCW-007', agencyName: 'Denver RTD', contractId: 'con-4', locationId: 'loc-3', locationName: 'Seattle', status: 'intake', openedAt: '2026-03-05', targetDate: '2026-06-20', techAssigned: 'Lisa Park', serviceType: 'Interior Rehab', daysOpen: 2 },
  { id: 'wo-7', woNumber: 'WO-2026-007', vehicleId: 'v-8', vin: 'CCW-008', agencyName: 'Long Beach Transit', contractId: 'con-2', locationId: 'loc-2', locationName: 'Alameda', status: 'in_progress', openedAt: '2026-02-10', targetDate: '2026-04-20', techAssigned: 'James Wilson', serviceType: 'CNG Repower', daysOpen: 25 },
  { id: 'wo-8', woNumber: 'WO-2026-008', vehicleId: 'v-9', vin: 'CCW-009', agencyName: 'SFMTA', contractId: 'con-1', locationId: 'loc-1', locationName: 'Riverside', status: 'qa_hold', openedAt: '2026-01-25', targetDate: '2026-03-30', techAssigned: 'Sarah Kim', serviceType: 'Hybrid Systems', daysOpen: 41 },
]

export const demoInvoices = [
  { id: 'inv-1', invoiceNumber: 'INV-2026-001', contractId: 'con-1', agencyName: 'SFMTA', amount: 700000, invoiceType: 'milestone', status: 'paid', issuedAt: '2025-12-15', dueDate: '2026-01-14', paidAt: '2026-01-10' },
  { id: 'inv-2', invoiceNumber: 'INV-2026-002', contractId: 'con-2', agencyName: 'Long Beach Transit', amount: 187500, invoiceType: 'milestone', status: 'overdue', issuedAt: '2026-01-15', dueDate: '2026-02-14', paidAt: null },
  { id: 'inv-3', invoiceNumber: 'INV-2026-003', contractId: 'con-3', agencyName: 'IndyGo', amount: 1033333, invoiceType: 'milestone', status: 'paid', issuedAt: '2026-01-01', dueDate: '2026-01-31', paidAt: '2026-01-28' },
  { id: 'inv-4', invoiceNumber: 'INV-2026-004', contractId: 'con-1', agencyName: 'SFMTA', amount: 1400000, invoiceType: 'milestone', status: 'sent', issuedAt: '2026-02-15', dueDate: '2026-03-17', paidAt: null },
  { id: 'inv-5', invoiceNumber: 'INV-2026-005', contractId: 'con-4', agencyName: 'Denver RTD', amount: 0, invoiceType: 'milestone', status: 'draft', issuedAt: null, dueDate: null, paidAt: null },
]

export const demoComplianceDocs = [
  { id: 'cd-1', vin: 'CCW-004', agencyName: 'IndyGo', contractId: 'con-3', docType: 'Certificate of Completion', status: 'signed', updatedAt: '2026-03-01' },
  { id: 'cd-2', vin: 'CCW-004', agencyName: 'IndyGo', contractId: 'con-3', docType: 'FTA Inspection Record', status: 'signed', updatedAt: '2026-03-01' },
  { id: 'cd-3', vin: 'CCW-004', agencyName: 'IndyGo', contractId: 'con-3', docType: 'Buy America Checklist', status: 'submitted', updatedAt: '2026-03-02' },
  { id: 'cd-4', vin: 'CCW-001', agencyName: 'SFMTA', contractId: 'con-1', docType: 'FTA Inspection Record', status: 'in_progress', updatedAt: '2026-02-20' },
  { id: 'cd-5', vin: 'CCW-001', agencyName: 'SFMTA', contractId: 'con-1', docType: 'Buy America Checklist', status: 'not_started', updatedAt: null },
  { id: 'cd-6', vin: 'CCW-002', agencyName: 'SFMTA', contractId: 'con-1', docType: 'ADA Sign-Off', status: 'pending_signature', updatedAt: '2026-03-04' },
  { id: 'cd-7', vin: 'CCW-003', agencyName: 'Long Beach Transit', contractId: 'con-2', docType: 'CNG Certification', status: 'in_progress', updatedAt: '2026-02-28' },
  { id: 'cd-8', vin: 'CCW-010', agencyName: 'IndyGo', contractId: 'con-3', docType: 'CARB Compliance', status: 'signed', updatedAt: '2026-03-03' },
]

export const demoRecentActivity = [
  { id: 'act-1', type: 'delivery', message: 'Bus CCW-005 delivered to IndyGo — 3 days early', time: '2 hours ago', icon: 'truck' },
  { id: 'act-2', type: 'invoice', message: 'IndyGo paid INV-2026-003 — $1,033,333', time: '1 day ago', icon: 'dollar' },
  { id: 'act-3', type: 'wo_complete', message: 'WO-2026-004 completed — CCW-004 ZEPS conversion done', time: '2 days ago', icon: 'check' },
  { id: 'act-4', type: 'qa_hold', message: 'CCW-002 moved to QA Hold — wiring inspection required', time: '3 days ago', icon: 'alert' },
  { id: 'act-5', type: 'contract', message: 'Denver RTD contract CCW-2026-RTD-001 activated', time: '4 days ago', icon: 'file' },
  { id: 'act-6', type: 'parts', message: 'Received: 8x Knorr-Bremse Door Actuators at Riverside', time: '5 days ago', icon: 'package' },
  { id: 'act-7', type: 'rfp', message: 'Portland TriMet RFP — proposal 60% complete', time: '5 days ago', icon: 'trending' },
  { id: 'act-8', type: 'tech', message: 'Lisa Park ZEPS certification renewed — valid through 2028', time: '6 days ago', icon: 'award' },
]

// Dashboard KPIs
export const demoDashboardKPIs = {
  contractBacklog: 9930000,
  earnedRevenueMTD: 847000,
  earnedRevenuePlan: 1100000,
  cashPosition: 3800000,
  dso: 38,
  pipelineValue: 12500000,
  activeBids: 4,
  busesInProduction: 47,
  busesByStatus: {
    intake: 2,
    queued: 4,
    in_progress: 8,
    qa_hold: 3,
    complete: 3,
    delivered: 2,
  },
  unbilledRevenue: 234000,
  overbilled: 0,
}

// Revenue chart data (6 months)
export const demoRevenueChart = [
  { month: 'Oct', earned: 920000, invoiced: 700000, collected: 700000 },
  { month: 'Nov', earned: 1050000, invoiced: 1033333, collected: 1033333 },
  { month: 'Dec', earned: 980000, invoiced: 700000, collected: 700000 },
  { month: 'Jan', earned: 1120000, invoiced: 1033333, collected: 1033333 },
  { month: 'Feb', earned: 890000, invoiced: 1400000, collected: 312500 },
  { month: 'Mar', earned: 847000, invoiced: 187500, collected: 0 },
]

// Production throughput (12 months)
export const demoThroughputChart = [
  { month: 'Apr 25', buses: 4 }, { month: 'May 25', buses: 6 }, { month: 'Jun 25', buses: 5 },
  { month: 'Jul 25', buses: 7 }, { month: 'Aug 25', buses: 8 }, { month: 'Sep 25', buses: 6 },
  { month: 'Oct 25', buses: 9 }, { month: 'Nov 25', buses: 7 }, { month: 'Dec 25', buses: 5 },
  { month: 'Jan 26', buses: 8 }, { month: 'Feb 26', buses: 6 }, { month: 'Mar 26', buses: 3 },
]

// HR — Job Postings (6 demo jobs)
export const demoJobPostings = [
  { id: 1, title: 'Transit Bus Technician — Level II', department: 'Production', location: 'Riverside, CA', type: 'full_time', status: 'active', posted_at: '2026-03-01', salary_min: 62000, salary_max: 82000 },
  { id: 2, title: 'ZEPS Electric Systems Technician', department: 'ZEPS', location: 'Riverside, CA', type: 'full_time', status: 'active', posted_at: '2026-03-10', salary_min: 72000, salary_max: 95000 },
  { id: 3, title: 'Bus Sales Representative — Pacific Northwest', department: 'TSI', location: 'Remote', type: 'full_time', status: 'active', posted_at: '2026-02-20', salary_min: 65000, salary_max: 90000 },
  { id: 4, title: 'Fleet Lease Manager', department: 'SBL', location: 'Riverside, CA', type: 'full_time', status: 'active', posted_at: '2026-03-05', salary_min: 68000, salary_max: 88000 },
  { id: 5, title: 'Body & Paint Technician', department: 'Production', location: 'Riverside, CA', type: 'full_time', status: 'filled', posted_at: '2026-02-01', filled_at: '2026-03-12', salary_min: 52000, salary_max: 70000 },
  { id: 6, title: 'Federal Contracts Administrator', department: 'Business Development', location: 'Riverside, CA', type: 'full_time', status: 'draft', posted_at: null, salary_min: 75000, salary_max: 100000 },
]

// HR — Vendor Management (8 demo vendors)
export const demoVendors = [
  { id: 1, name: 'Cummins Inc.', category: 'parts_supplier', contact_name: 'Mark T.', contact_email: 'mark.t@cummins.com', status: 'active', contract_end: '2027-06-30', contract_value: 2400000 },
  { id: 2, name: 'Voith GmbH', category: 'parts_supplier', contact_name: 'Klaus R.', contact_email: 'k.r@voith.com', status: 'active', contract_end: '2027-12-31', contract_value: 1800000 },
  { id: 3, name: 'Muncie Power Products', category: 'parts_supplier', contact_name: 'Sarah J.', status: 'active', contract_end: '2026-09-30', contract_value: 560000 },
  { id: 4, name: 'Wilson Electric', category: 'subcontractor', contact_name: 'Dave W.', status: 'active', contract_end: '2026-12-31', contract_value: 380000 },
  { id: 5, name: 'Industrial Safety Supplies Co.', category: 'service_provider', contact_name: 'Tom H.', status: 'active', contract_end: '2026-06-30', contract_value: 95000 },
  { id: 6, name: 'AutoCad Fleet Systems', category: 'service_provider', contact_name: 'Lisa M.', status: 'under_review', contract_end: '2026-04-30', contract_value: 48000 },
  { id: 7, name: 'Pacific Metal Works', category: 'parts_supplier', contact_name: 'Ray C.', status: 'active', contract_end: '2027-03-31', contract_value: 720000 },
  { id: 8, name: 'National Transit Training', category: 'service_provider', contact_name: 'Ann B.', status: 'active', contract_end: '2026-12-31', contract_value: 125000 },
]

// Owner Financials — Demo P&L (Consolidated, 2025 full year)
export const demoFinancials = {
  company: 'CONSOLIDATED',
  period: '2025 Full Year',
  revenue_total: 102000000,
  revenue_refurb: 68000000,
  revenue_zeps: 22000000,
  revenue_parts_sales: 12000000,
  cogs_total: 72000000,
  gross_profit: 30000000,
  gross_margin_pct: 29.4,
  operating_expenses: 14000000,
  ebitda: 18000000,
  net_income: 15000000,
  cash_on_hand: 8500000,
  accounts_receivable: 12300000,
  accounts_payable: 4200000,
  total_assets: 45000000,
  total_debt: 26500000,
  esop_loan_balance: 22000000,
  esop_annual_payment: 2200000,
  esop_payoff_year: 2036,
}

// SAM.gov Federal Opportunities (5 matching CCW NAICS codes)
export const demoSAMOpportunities = [
  { id: 1, notice_id: 'SAM-2026-001', title: 'Bus Rehabilitation Services — Tri-County Transit Authority', naics_code: '336999', department: 'FTA Grant Program', posted_date: '2026-03-10', response_deadline: '2026-04-10', estimated_value: 8500000, set_aside: 'Total Small Business', bid_decision: 'pursuing' },
  { id: 2, notice_id: 'SAM-2026-002', title: 'Zero Emission Bus Conversion Program — Pacific Northwest', naics_code: '336999', department: 'US Dept of Transportation', posted_date: '2026-03-05', response_deadline: '2026-04-30', estimated_value: 15200000, set_aside: null, bid_decision: 'pursuing' },
  { id: 3, notice_id: 'SAM-2026-003', title: 'CNG Repower Services IDIQ — Southwest Region', naics_code: '811310', department: 'Defense Logistics Agency', posted_date: '2026-02-20', response_deadline: '2026-03-25', estimated_value: 4200000, set_aside: 'SDVOSB', bid_decision: 'no_bid' },
  { id: 4, notice_id: 'SAM-2026-004', title: 'Transit Bus Parts and Accessories', naics_code: '336212', department: 'GSA Schedule', posted_date: '2026-03-12', response_deadline: '2026-05-15', estimated_value: null, set_aside: null, bid_decision: 'pending' },
  { id: 5, notice_id: 'SAM-2026-005', title: 'Pre-Owned Transit Bus Acquisition — 20 Units', naics_code: '336211', department: 'City of Phoenix', posted_date: '2026-03-14', response_deadline: '2026-04-14', estimated_value: 1800000, set_aside: null, bid_decision: 'pending' },
]

// TSI Inventory (12 demo pre-owned buses)
export const demoTSIInventory = [
  { id: 1, year: 2012, make: 'Gillig', model: 'Low Floor', length: 40, fuelType: 'diesel', seats: 40, mileage: 380000, condition: 'refurbished', status: 'available', price: 185000 },
  { id: 2, year: 2015, make: 'New Flyer', model: 'Xcelsior XD40', length: 40, fuelType: 'cng', seats: 38, mileage: 290000, condition: 'refurbished', status: 'available', price: 240000 },
  { id: 3, year: 2014, make: 'New Flyer', model: 'Xcelsior XDE40', length: 40, fuelType: 'diesel-electric', seats: 37, mileage: 315000, condition: 'as-is', status: 'available', price: 145000 },
  { id: 4, year: 2016, make: 'Gillig', model: 'Advantage', length: 35, fuelType: 'cng', seats: 35, mileage: 245000, condition: 'refurbished', status: 'available', price: 215000 },
  { id: 5, year: 2018, make: 'Proterra', model: 'Catalyst E2', length: 40, fuelType: 'electric', seats: 40, mileage: 180000, condition: 'refurbished', status: 'available', price: 320000 },
  { id: 6, year: 2013, make: 'Gillig', model: 'Low Floor', length: 30, fuelType: 'diesel', seats: 30, mileage: 420000, condition: 'as-is', status: 'available', price: 98000 },
  { id: 7, year: 2017, make: 'New Flyer', model: 'Xcelsior XD60', length: 60, fuelType: 'diesel', seats: 55, mileage: 310000, condition: 'refurbished', status: 'available', price: 295000 },
  { id: 8, year: 2015, make: 'Van Hool', model: 'AG300', length: 60, fuelType: 'cng', seats: 52, mileage: 280000, condition: 'refurbished', status: 'pending', price: 275000 },
  { id: 9, year: 2019, make: 'Gillig', model: 'Low Floor', length: 40, fuelType: 'diesel', seats: 40, mileage: 195000, condition: 'refurbished', status: 'available', price: 265000 },
  { id: 10, year: 2016, make: 'New Flyer', model: 'Xcelsior XHE40', length: 40, fuelType: 'hydrogen', seats: 37, mileage: 220000, condition: 'as-is', status: 'available', price: 195000 },
  { id: 11, year: 2014, make: 'Gillig', model: 'Advantage', length: 40, fuelType: 'cng', seats: 40, mileage: 355000, condition: 'refurbished', status: 'available', price: 198000 },
  { id: 12, year: 2020, make: 'BYD', model: 'K9M', length: 40, fuelType: 'electric', seats: 38, mileage: 120000, condition: 'refurbished', status: 'available', price: 385000 },
]

// TSI Sales Pipeline
export const demoTSISalesPipeline = [
  { id: 'tsi-rfq-1', agency: 'Greater Cleveland RTA', busType: '40ft Diesel', qty: 8, estValue: 1480000, status: 'quoted', contact: 'Tom Byrd', daysInStage: 12 },
  { id: 'tsi-rfq-2', agency: 'Omaha Metro Transit', busType: '40ft CNG', qty: 5, estValue: 1200000, status: 'negotiating', contact: 'Sandra Lee', daysInStage: 8 },
  { id: 'tsi-rfq-3', agency: 'RATP Dev USA', busType: '60ft Articulated', qty: 3, estValue: 885000, status: 'won', contact: 'Pierre Martin', daysInStage: 0 },
  { id: 'tsi-rfq-4', agency: 'Laketran Lake County', busType: '35ft Diesel', qty: 4, estValue: 580000, status: 'prospect', contact: 'Jim Novak', daysInStage: 3 },
  { id: 'tsi-rfq-5', agency: 'First Transit Phoenix', busType: '40ft Electric', qty: 6, estValue: 1920000, status: 'lost', contact: 'Amy Ruiz', daysInStage: 0 },
]

// TSI Buyer Leads
export const demoBuyerLeads = [
  { id: 'lead-1', agency: 'Champaign-Urbana MTD', state: 'IL', contact: 'Rachel Torres', email: 'rtorres@cumtd.com', busesNeeded: '6–8 × 40ft diesel', budget: '$1.2M', notes: 'Seeking FTA-compliant, 2015+, under 250k miles', status: 'hot' },
  { id: 'lead-2', agency: 'Flagstaff Pulliam Transit', state: 'AZ', contact: 'Chris Valdez', email: 'cvaldez@flagstaff.az.gov', busesNeeded: '4 × 35ft any fuel', budget: '$600K', notes: 'Budget approved, needs Q2 delivery', status: 'warm' },
  { id: 'lead-3', agency: 'Macon-Bibb County Transit', state: 'GA', contact: 'Deanna Fox', email: 'dfox@maconbibb.us', busesNeeded: '10 × 40ft CNG', budget: '$2.4M', notes: 'Converting depot to CNG — prefers CNG fleet', status: 'warm' },
  { id: 'lead-4', agency: 'Redding Area Bus Authority', state: 'CA', contact: 'Kevin Marsh', email: 'kmarsh@rabaride.com', busesNeeded: '3 × 40ft electric', budget: '$900K', notes: 'CARB mandate compliance by 2027', status: 'cold' },
]

// SBL Active Leases
export const demoSBLLeases = [
  { id: 'lease-1', lessee: 'Olympic Committee — LA28', busCount: 12, busType: '40ft Diesel', monthlyPayment: 54000, startDate: '2025-07-01', endDate: '2026-09-30', status: 'active', daysRemaining: 197 },
  { id: 'lease-2', lessee: 'Coachella Music Festival', busCount: 8, busType: '35ft Diesel', monthlyPayment: 28800, startDate: '2026-04-01', endDate: '2026-04-30', status: 'upcoming', daysRemaining: 15 },
  { id: 'lease-3', lessee: 'University of Southern California', busCount: 5, busType: '40ft CNG', monthlyPayment: 18500, startDate: '2025-09-01', endDate: '2026-08-31', status: 'active', daysRemaining: 167 },
  { id: 'lease-4', lessee: 'Warner Bros. Studios', busCount: 3, busType: '35ft Diesel', monthlyPayment: 9600, startDate: '2026-01-15', endDate: '2026-07-15', status: 'active', daysRemaining: 120 },
  { id: 'lease-5', lessee: 'Anaheim Convention Center', busCount: 6, busType: '40ft Diesel', monthlyPayment: 21600, startDate: '2025-11-01', endDate: '2026-10-31', status: 'active', daysRemaining: 228 },
]

// SBL Fleet Utilization
export const demoSBLFleetUtilization = [
  { vin: 'SBL-001', make: 'Gillig', model: 'Low Floor 40ft', lessee: 'Olympic Committee — LA28', utilization: 94, status: 'on_lease' },
  { vin: 'SBL-002', make: 'Gillig', model: 'Low Floor 40ft', lessee: 'Olympic Committee — LA28', utilization: 91, status: 'on_lease' },
  { vin: 'SBL-003', make: 'New Flyer', model: 'Xcelsior 40ft', lessee: 'USC', utilization: 88, status: 'on_lease' },
  { vin: 'SBL-004', make: 'Gillig', model: 'Advantage 35ft', lessee: 'Warner Bros.', utilization: 72, status: 'on_lease' },
  { vin: 'SBL-005', make: 'New Flyer', model: 'Xcelsior 40ft', lessee: 'Anaheim Convention', utilization: 85, status: 'on_lease' },
  { vin: 'SBL-006', make: 'Gillig', model: 'Low Floor 40ft', lessee: null, utilization: 0, status: 'available' },
  { vin: 'SBL-007', make: 'Gillig', model: 'Advantage 35ft', lessee: null, utilization: 0, status: 'maintenance' },
]

// Website Health Scores
export const websiteHealthScores = {
  lastUpdated: '2026-03-14',
  scores: [
    { label: 'SEO Score', current: 42, target: 88, status: 'critical', note: 'No title tags, meta descriptions, or keyword targeting on any page' },
    { label: 'Schema Markup', current: 0, target: 92, status: 'critical', note: 'Zero structured data — required for Google AI Overviews and rich results' },
    { label: 'Image SEO', current: 0, target: 96, status: 'critical', note: '250+ images with no SEO filenames or alt text — Google Image Search disabled' },
    { label: 'Performance', current: 61, target: 91, status: 'warning', note: 'Core Web Vitals below threshold — affects ranking and user experience' },
    { label: 'Accessibility', current: 55, target: 95, status: 'warning', note: 'WCAG 2.1 AA — government contractor digital standard' },
    { label: 'GBP Health', current: 0, target: 90, status: 'critical', note: '13 CCW locations with zero Google Business Profiles — no local search visibility' },
  ],
}

// Technicians with hourly rates
export const demoTechnicianRates: Record<string, number> = {
  'Mike Reyes': 42,
  'Sarah Kim': 45,
  'Carlos Mendez': 48,
  'James Wilson': 44,
  'Tom Bradley': 38,
  'Lisa Park': 36,
  'David Chen': 41,
  'Maria Santos': 40,
}
