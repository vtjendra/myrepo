export const ISSUE_CATEGORIES = {
  ecommerce: [
    { key: 'refund_return', subcategories: ['late_refund', 'refund_denied', 'partial_refund'] },
    { key: 'product_quality', subcategories: ['defective_product', 'wrong_item', 'counterfeit'] },
    { key: 'delivery', subcategories: ['late_delivery', 'lost_package', 'damaged_in_transit'] },
    { key: 'account', subcategories: ['account_locked', 'unauthorized_access', 'data_privacy'] },
    { key: 'seller_dispute', subcategories: ['misleading_listing', 'no_response', 'warranty'] },
  ],
  telecommunications: [
    { key: 'billing', subcategories: ['overcharge', 'hidden_fees', 'unauthorized_charges'] },
    { key: 'service_quality', subcategories: ['slow_internet', 'dropped_calls', 'no_signal'] },
    { key: 'contract', subcategories: ['early_termination', 'auto_renewal', 'misleading_terms'] },
    { key: 'customer_service', subcategories: ['long_wait', 'unhelpful', 'no_resolution'] },
  ],
  banking: [
    { key: 'fees_charges', subcategories: ['hidden_fees', 'excessive_interest', 'penalty_charges'] },
    { key: 'account_issues', subcategories: ['frozen_account', 'unauthorized_transaction', 'atm_error'] },
    { key: 'loan_credit', subcategories: ['loan_rejection', 'wrong_credit_score', 'harassment'] },
    { key: 'digital_banking', subcategories: ['app_error', 'failed_transfer', 'security_breach'] },
  ],
  insurance: [
    { key: 'claim_denial', subcategories: ['unjust_denial', 'delayed_processing', 'underpayment'] },
    { key: 'policy', subcategories: ['misleading_terms', 'cancellation_issue', 'premium_increase'] },
    { key: 'agent_misconduct', subcategories: ['mis_selling', 'forged_documents', 'no_disclosure'] },
  ],
  airline: [
    { key: 'flight_issues', subcategories: ['cancellation', 'delay', 'overbooking'] },
    { key: 'baggage', subcategories: ['lost_baggage', 'damaged_baggage', 'delayed_baggage'] },
    { key: 'refund', subcategories: ['ticket_refund', 'ancillary_refund', 'voucher_issue'] },
    { key: 'service', subcategories: ['rude_staff', 'seat_issue', 'food_quality'] },
  ],
  utilities: [
    { key: 'billing', subcategories: ['overcharge', 'meter_error', 'estimated_billing'] },
    { key: 'outage', subcategories: ['prolonged_outage', 'frequent_disruption', 'no_notice'] },
    { key: 'connection', subcategories: ['delayed_installation', 'wrongful_disconnection'] },
  ],
  government: [
    { key: 'service_delay', subcategories: ['permit_delay', 'document_processing', 'response_time'] },
    { key: 'corruption', subcategories: ['bribery_demand', 'nepotism', 'misuse_of_funds'] },
    { key: 'public_service', subcategories: ['healthcare_access', 'education_quality', 'infrastructure'] },
  ],
  healthcare: [
    { key: 'medical_service', subcategories: ['misdiagnosis', 'delayed_treatment', 'negligence'] },
    { key: 'billing', subcategories: ['overcharge', 'insurance_claim', 'hidden_costs'] },
    { key: 'pharmacy', subcategories: ['wrong_medication', 'expired_medicine', 'price_gouging'] },
  ],
  education: [
    { key: 'tuition', subcategories: ['fee_dispute', 'refund_policy', 'hidden_charges'] },
    { key: 'quality', subcategories: ['curriculum_issue', 'facility_problem', 'teacher_conduct'] },
    { key: 'certification', subcategories: ['delayed_certificate', 'invalid_accreditation'] },
  ],
  transportation: [
    { key: 'ride_hailing', subcategories: ['overcharge', 'safety_concern', 'driver_behavior'] },
    { key: 'public_transport', subcategories: ['schedule_issue', 'overcrowding', 'safety'] },
    { key: 'vehicle', subcategories: ['defect', 'warranty_issue', 'service_quality'] },
  ],
  food_beverage: [
    { key: 'food_safety', subcategories: ['contamination', 'expired_product', 'foreign_object'] },
    { key: 'delivery', subcategories: ['wrong_order', 'missing_items', 'cold_food'] },
    { key: 'quality', subcategories: ['misleading_ad', 'portion_size', 'allergen_info'] },
  ],
  technology: [
    { key: 'product_defect', subcategories: ['hardware_failure', 'software_bug', 'battery_issue'] },
    { key: 'warranty', subcategories: ['warranty_denial', 'repair_delay', 'replacement_issue'] },
    { key: 'data_privacy', subcategories: ['data_breach', 'unauthorized_sharing', 'deletion_request'] },
  ],
  other: [
    { key: 'general', subcategories: ['poor_service', 'misleading_advertising', 'contract_dispute'] },
  ],
} as const;

export const DESIRED_OUTCOMES = [
  'refund',
  'replacement',
  'repair',
  'apology',
  'policy_change',
  'compensation',
  'explanation',
  'other',
] as const;

export const CASE_STATUSES = [
  'drafting',
  'ready_to_send',
  'sent',
  'acknowledged',
  'in_progress',
  'resolved',
  'escalated',
  'closed',
] as const;

export const SUPPORTED_CURRENCIES = [
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
] as const;

export const MAX_EVIDENCE_FILES = 3;
export const MAX_EVIDENCE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_EVIDENCE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] as const;
