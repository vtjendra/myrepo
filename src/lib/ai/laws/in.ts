import 'server-only';
import type { CountryLaws } from './types';

export const IN: CountryLaws = {
  banking: {
    plain_rights: [
      'You can file a free complaint at cms.rbi.org.in — the bank must respond within 30 days.',
      'Banks cannot charge fees not disclosed in your account terms.',
      'For unauthorized digital transactions, report to your bank within 3 days — limited liability rules protect you.',
      'The RBI Ombudsman can award compensation up to ₹20 lakh — free process.',
    ],
    plain_obligations: [
      'Banks must acknowledge your complaint within 5 working days.',
      'Banks must resolve complaints within 30 days.',
      'Banks must proactively notify you of all fee changes.',
    ],
    plain_escalation: [
      'File at cms.rbi.org.in or call RBI Helpline 14448.',
      'If unresolved in 30 days, escalate to the RBI Ombudsman — same portal, free.',
    ],
    primary_law: 'Consumer Protection Act 2019 + RBI Integrated Ombudsman Scheme 2021',
    statute_number: 'CPA 2019 + RBI IOS 2021',
    effective_date: '2021-11-12',
    regulator_name: 'Reserve Bank of India (RBI)',
    regulator_url: 'https://www.rbi.org.in',
    regulator_complaint_url: 'https://cms.rbi.org.in',
    source_url: 'https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12151',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  telecommunications: {
    plain_rights: [
      'Telecom providers cannot deduct money for unsolicited value-added services — report for a full refund.',
      'You can port your number to a new network within 7 days.',
      'Providers must resolve billing complaints within 5 working days.',
      'If unresolved, TRAI can direct your provider to refund you.',
    ],
    plain_obligations: [
      'Providers must acknowledge complaints within 3 working days.',
      'Providers must not deduct amounts for unsubscribed services.',
      'Providers must maintain complaint records for 3 years.',
    ],
    plain_escalation: [
      'File at tccr.trai.gov.in or call your provider\'s Appellate Authority.',
      'Escalate to the National Consumer Helpline at consumerhelpline.gov.in (1800-11-4000, free).',
    ],
    primary_law: 'Consumer Protection Act 2019 + TRAI Telecom Consumers Protection Regulations 2012',
    statute_number: 'CPA 2019 + TCCR 2012',
    effective_date: '2020-07-20',
    regulator_name: 'Telecom Regulatory Authority of India (TRAI)',
    regulator_url: 'https://www.trai.gov.in',
    regulator_complaint_url: 'https://tccr.trai.gov.in',
    source_url: 'https://www.trai.gov.in/regulations/regulations/telecom-consumers-protection-regulations-2012',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  ecommerce: {
    plain_rights: [
      'E-commerce platforms must allow you to return products within 14 days of delivery.',
      '13 specific dark patterns (hidden fees, trick questions, basket sneaking) are now illegal.',
      'Sellers cannot show fake ratings or countdown timers that create false urgency.',
      'Platforms must appoint a Grievance Officer who resolves complaints within 48 hours.',
    ],
    plain_obligations: [
      'Platforms must display complete seller information, prices, and return policies.',
      'Platforms must process refunds within 14 days of receiving returned goods.',
      'Platforms must appoint a Grievance Officer who responds within 48 hours.',
    ],
    plain_escalation: [
      'File at consumerhelpline.gov.in or call 1800-11-4000 (free, 24/7).',
      'File at E-Daakhil portal for fast online redressal at edaakhil.nic.in.',
    ],
    primary_law: 'Consumer Protection Act 2019 + Consumer Protection (E-Commerce) Rules 2020 + Dark Patterns Guidelines 2023',
    statute_number: 'CPA 2019 + E-Commerce Rules 2020 + CCPA Dark Patterns Guidelines 2023',
    effective_date: '2023-11-30',
    regulator_name: 'Central Consumer Protection Authority (CCPA)',
    regulator_url: 'https://consumeraffairs.nic.in',
    regulator_complaint_url: 'https://consumerhelpline.gov.in',
    source_url: 'https://consumeraffairs.gov.in/pages/consumer-protection-acts',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  insurance: {
    plain_rights: [
      'You have a 15-day free-look period after buying a life insurance policy to cancel for a full refund.',
      'If your claim is denied, the insurer must give a written explanation within 30 days.',
      'You can file a free complaint with the IRDAI Bima Bharosa portal.',
      'IRDAI can direct the insurer to settle valid claims.',
    ],
    plain_obligations: [
      'Insurers must settle claims within 30 days of receiving all required documents.',
      'Insurers must give you a policy document within 15 days of purchase.',
      'Insurers must clearly explain exclusions, waiting periods, and co-pay clauses.',
    ],
    plain_escalation: [
      'File at bimabharosa.irdai.gov.in or call IRDAI at 1800-4254-732 (free).',
      'Escalate to the Insurance Ombudsman at cioins.co.in — free, binding up to ₹30 lakh.',
    ],
    primary_law: 'Consumer Protection Act 2019 + IRDAI (Protection of Policyholders\' Interests) Regulations 2017',
    statute_number: 'CPA 2019 + IRDAI Regulations 2017',
    effective_date: '2020-07-20',
    regulator_name: 'Insurance Regulatory and Development Authority of India (IRDAI)',
    regulator_url: 'https://www.irdai.gov.in',
    regulator_complaint_url: 'https://bimabharosa.irdai.gov.in',
    source_url: 'https://www.irdai.gov.in/ADMINCMS/cms/NormalData_Layout.aspx?page=PageNo4137&mid=1',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  airline: {
    plain_rights: [
      'For delays over 2 hours on domestic flights, airlines must offer free meals and refreshments.',
      'For cancellations with less than 2 weeks\' notice, you get a full refund plus an alternate flight offer.',
      'For denied boarding (overbooking), you are entitled to ₱10,000–₹20,000 compensation plus a full refund.',
      'Airlines must resolve complaints filed on Air Sewa within 30 days.',
    ],
    plain_obligations: [
      'Airlines must inform passengers of delays before departure time.',
      'Airlines must process refunds within 7 business days.',
      'Airlines must display grievance mechanisms.',
    ],
    plain_escalation: [
      'File at airsewa.gov.in — airlines must respond within 30 days.',
      'Escalate to DGCA at dgca.gov.in or the consumer forum at edaakhil.nic.in.',
    ],
    primary_law: 'Consumer Protection Act 2019 + DGCA Civil Aviation Requirements on Passenger Rights',
    statute_number: 'CPA 2019 + DGCA CAR Section 3 Series M Part IV',
    effective_date: '2010-08-01',
    regulator_name: 'Directorate General of Civil Aviation (DGCA)',
    regulator_url: 'https://dgca.gov.in',
    regulator_complaint_url: 'https://airsewa.gov.in',
    source_url: 'https://dgca.gov.in/digigov-portal/staticpages/CAR-Section3-seriesM-partIV.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  utilities: {
    plain_rights: [
      'You can contest a billing error — the distribution company must investigate within 7 days.',
      'Meters must be tested free of charge if you suspect they are faulty.',
      'Electricity companies must compensate you for prolonged outages per SERC regulations.',
      'Disconnection requires 15 days\' written notice.',
    ],
    plain_obligations: [
      'Distribution companies must respond to billing disputes within 7 days.',
      'Utilities must give advance notice before planned maintenance outages.',
      'Utilities must have Consumer Grievance Redressal Forums (CGRF).',
    ],
    plain_escalation: [
      'File with your distribution company\'s CGRF — free, 30-day resolution.',
      'Escalate to the Electricity Ombudsman — free, binding, 60-day resolution.',
    ],
    primary_law: 'Consumer Protection Act 2019 + Electricity Act 2003',
    statute_number: 'CPA 2019 + Electricity Act 2003',
    effective_date: '2003-06-02',
    regulator_name: 'Central Electricity Regulatory Commission (CERC) + State Electricity Regulatory Commissions (SERCs)',
    regulator_url: 'https://cercind.gov.in',
    regulator_complaint_url: 'https://consumerhelpline.gov.in',
    source_url: 'https://cercind.gov.in/Acts.html',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  transportation: {
    plain_rights: [
      'Ride-hailing apps must not charge more than the quoted fare at booking.',
      'Drivers must have a valid commercial driving licence and registered vehicle.',
      'You can report ride cancellations, overcharging, or unsafe drivers in-app or to the state transport department.',
      'For motor vehicle defects, manufacturers must offer a free remedy under the Consumer Protection Act 2019.',
    ],
    plain_obligations: [
      'Apps must display fare estimates upfront with no hidden charges.',
      'Platforms must resolve passenger complaints within 10 business days.',
      'Drivers must not discriminate or refuse rides based on destination.',
    ],
    plain_escalation: [
      'File complaints in-app, then escalate to the state transport authority.',
      'File at consumerhelpline.gov.in (National Consumer Helpline 1800-11-4000) for persistent issues.',
    ],
    primary_law: 'Consumer Protection Act 2019 + Motor Vehicles (Amendment) Act 2019',
    statute_number: 'CPA 2019 + MVA 2019',
    effective_date: '2019-09-01',
    regulator_name: 'Ministry of Road Transport and Highways (MoRTH)',
    regulator_url: 'https://morth.nic.in',
    regulator_complaint_url: 'https://consumerhelpline.gov.in',
    source_url: 'https://morth.nic.in/motor-vehicles-amendment-act-2019',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  healthcare: {
    plain_rights: [
      'Medical services are covered by consumer protection law — you can sue hospitals and doctors for negligence.',
      'You have the right to an itemized bill — hospitals must provide one on request.',
      'You must give informed consent before any surgery or major procedure.',
      'You can file for compensation at the National Consumer Forum — no lawyer required for smaller claims.',
    ],
    plain_obligations: [
      'Hospitals must display their fee schedule.',
      'Doctors must explain your diagnosis and treatment plan in language you understand.',
      'Clinical establishments must be registered under the Clinical Establishments Act.',
    ],
    plain_escalation: [
      'File at E-Daakhil (edaakhil.nic.in) or call 1800-11-4000.',
      'For doctor misconduct, file with the National Medical Commission (NMC) at nmc.org.in.',
    ],
    primary_law: 'Consumer Protection Act 2019 + Clinical Establishments (Registration and Regulation) Act 2010',
    statute_number: 'CPA 2019 + Clinical Establishments Act 2010',
    effective_date: '2020-07-20',
    regulator_name: 'National Consumer Disputes Redressal Commission (NCDRC)',
    regulator_url: 'https://consumerhelpline.gov.in',
    regulator_complaint_url: 'https://edaakhil.nic.in',
    source_url: 'https://consumeraffairs.gov.in/pages/consumer-protection-acts',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  retail: {
    plain_rights: [
      'Products must carry ISI/BIS marks where mandatory — substandard marked goods are illegal.',
      'Packaged goods must show MRP (maximum retail price) — retailers cannot charge more.',
      'You can return defective goods and demand repair, replacement, or refund.',
      'CCPA can recall unsafe products and issue public advisories.',
    ],
    plain_obligations: [
      'Retailers must not charge above MRP.',
      'Sellers must provide bills for goods above ₹200.',
      'Manufacturers must honour warranties as stated.',
    ],
    plain_escalation: [
      'File at consumerhelpline.gov.in or call 1800-11-4000 (free).',
      'File at E-Daakhil portal (edaakhil.nic.in) for fast digital redressal.',
    ],
    primary_law: 'Consumer Protection Act 2019 + Bureau of Indian Standards Act 2016 + Legal Metrology Act 2009',
    statute_number: 'CPA 2019 + BIS Act 2016 + Legal Metrology Act 2009',
    effective_date: '2020-07-20',
    regulator_name: 'Central Consumer Protection Authority (CCPA)',
    regulator_url: 'https://consumeraffairs.nic.in',
    regulator_complaint_url: 'https://consumerhelpline.gov.in',
    source_url: 'https://consumeraffairs.gov.in/pages/consumer-protection-acts',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },
};
