import 'server-only';
import type { CountryLaws } from './types';

export const PH: CountryLaws = {
  banking: {
    plain_rights: [
      'You can file a free complaint with BSP — they must acknowledge within 10 working days.',
      'Your bank cannot charge fees not listed in your contract.',
      'For unauthorized transactions, the bank must respond within 10 business days and resolve within 45 days.',
      'You can appeal to the BSP Financial Consumer Protection Department (FCPD) if unsatisfied.',
    ],
    plain_obligations: [
      'Banks must acknowledge your complaint within 2 business days.',
      'Banks must resolve your complaint within 45 days.',
      'Banks must clearly disclose all fees, interest rates, and penalties before you sign anything.',
    ],
    plain_escalation: [
      'File at consumeraffairs.bsp.gov.ph or call the BSP hotline at (02) 8708-7087.',
      'For amounts below ₱10 million, use the BSP Adjudication Process — faster than courts.',
    ],
    primary_law: 'Financial Products and Services Consumer Protection Act',
    statute_number: 'RA 11765',
    effective_date: '2022-05-06',
    regulator_name: 'Bangko Sentral ng Pilipinas (BSP)',
    regulator_url: 'https://www.bsp.gov.ph',
    regulator_complaint_url: 'https://consumeraffairs.bsp.gov.ph',
    source_url: 'https://www.bsp.gov.ph/legislation/ra11765.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  telecommunications: {
    plain_rights: [
      'Telcos cannot charge you for services you did not subscribe to.',
      'You have the right to cancel a subscription service within 30 days if the service is poor.',
      'Telcos must refund charges for services not rendered.',
      'You have the right to be informed of outage durations and reasons.',
    ],
    plain_obligations: [
      'Telcos must respond to formal complaints within 5 business days.',
      'Telcos must credit your account for confirmed billing errors.',
      'Telcos must provide a working complaints channel.',
    ],
    plain_escalation: [
      'File a complaint at ntc.gov.ph or call (02) 8926-7722.',
      'If unresolved, escalate to the DTI for consumer protection remedies.',
    ],
    primary_law: 'Public Telecommunications Policy Act of the Philippines',
    statute_number: 'RA 7925',
    effective_date: '1995-03-01',
    regulator_name: 'National Telecommunications Commission (NTC)',
    regulator_url: 'https://ntc.gov.ph',
    regulator_complaint_url: 'https://ntc.gov.ph/file-a-complaint',
    source_url: 'https://ntc.gov.ph/ra7925',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  ecommerce: {
    plain_rights: [
      'Products sold online must be as described — you can return misrepresented items for a full refund.',
      'Sellers must honour warranty commitments.',
      'DTI can take action against online sellers who repeatedly defraud consumers.',
      'You can file a free complaint with DTI — they can mediate between you and the seller.',
    ],
    plain_obligations: [
      'Online sellers must display complete product information, price, and return policy.',
      'Sellers must acknowledge complaints within 5 business days.',
      'Platforms must provide a working dispute resolution channel.',
    ],
    plain_escalation: [
      'File at egate.dti.gov.ph or call the DTI hotline at 1-384.',
      'DTI mediation is free and typically resolved within 30 days.',
    ],
    primary_law: 'Consumer Act of the Philippines',
    statute_number: 'RA 7394',
    effective_date: '1992-04-13',
    regulator_name: 'Department of Trade and Industry (DTI)',
    regulator_url: 'https://www.dti.gov.ph',
    regulator_complaint_url: 'https://egate.dti.gov.ph',
    source_url: 'https://www.dti.gov.ph/ra7394',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  insurance: {
    plain_rights: [
      'The insurer must give you a written denial letter with clear reasons if your claim is rejected.',
      'You have 10 days after receiving a denial to request reconsideration.',
      'Insurers cannot cancel your policy mid-term without proper written notice.',
      'The Insurance Commission can compel an insurer to pay a valid claim.',
    ],
    plain_obligations: [
      'Insurers must acknowledge a claim within 10 working days.',
      'Insurers must settle a valid claim within 30 days of completing documentation.',
      'Insurers must give policyholders a complete copy of their policy.',
    ],
    plain_escalation: [
      'File a complaint at insurance.gov.ph or visit the IC at 1071 UN Avenue, Manila.',
      'IC can conduct hearings and order payment — free for consumers.',
    ],
    primary_law: 'Amended Insurance Code',
    statute_number: 'RA 10607',
    effective_date: '2013-08-15',
    regulator_name: 'Insurance Commission (IC)',
    regulator_url: 'https://www.insurance.gov.ph',
    regulator_complaint_url: 'https://www.insurance.gov.ph/complaints',
    source_url: 'https://www.insurance.gov.ph/ra10607',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  airline: {
    plain_rights: [
      'For delays over 3 hours, the airline must provide a meal, accommodation if overnight, and communication access.',
      'For cancellations, you can choose: full refund, rebooking at no charge, or endorsement to another airline.',
      'You are entitled to ₱2,000 per passenger for delays over 3 hours (domestic); ₱5,000 for over 6 hours.',
      'The airline must inform you of a delay at least 3 hours before departure.',
    ],
    plain_obligations: [
      'Airlines must notify you of cancellations and delays immediately.',
      'Airlines must process refunds within 7 business days.',
      'Airlines cannot overbook without offering compensation to volunteers first.',
    ],
    plain_escalation: [
      'File a complaint at cab.gov.ph or the DTI hotline (1-384).',
      'Passengers can also sue in Small Claims Court for amounts below ₱400,000.',
    ],
    primary_law: 'Air Passenger Bill of Rights',
    statute_number: 'DOTC-DTI Joint AO No. 1, s. 2012',
    effective_date: '2012-07-23',
    regulator_name: 'Civil Aeronautics Board (CAB)',
    regulator_url: 'https://cab.gov.ph',
    regulator_complaint_url: 'https://cab.gov.ph/complaint-form',
    source_url: 'https://cab.gov.ph/air-passenger-bill-of-rights',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  utilities: {
    plain_rights: [
      'You can dispute a billing error and get a refund or credit if an overcharge is confirmed.',
      'The ERC limits electricity rates — your distribution utility cannot charge above approved rates.',
      'You have the right to a free meter test once every 12 months.',
      'Distribution utilities must restore power within 8 hours for residential outages.',
    ],
    plain_obligations: [
      'Utilities must provide 48-hour advance notice before disconnection.',
      'Utilities must respond to billing disputes within 5 business days.',
      'Utilities must publicly post their approved rate schedules.',
    ],
    plain_escalation: [
      'File a complaint at erc.gov.ph or call (02) 8689-5400.',
      'ERC conducts free hearings and can order refunds.',
    ],
    primary_law: 'Electric Power Industry Reform Act',
    statute_number: 'RA 9136',
    effective_date: '2001-06-08',
    regulator_name: 'Energy Regulatory Commission (ERC)',
    regulator_url: 'https://www.erc.gov.ph',
    regulator_complaint_url: 'https://www.erc.gov.ph/consumer-complaint',
    source_url: 'https://www.erc.gov.ph/ra9136',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  transportation: {
    plain_rights: [
      'Ride-hailing fares must not exceed LTFRB-approved rates.',
      'Drivers must have a valid professional driver\'s license and TNVS accreditation.',
      'You can report unsafe or overcharging drivers to LTFRB — cases are investigated.',
      'Platforms must accept and resolve complaints within 10 business days.',
    ],
    plain_obligations: [
      'Platforms must keep trip records and driver records for 1 year.',
      'Drivers must not refuse passengers without cause.',
      'Platforms must respond to LTFRB compliance queries within 5 days.',
    ],
    plain_escalation: [
      'File a complaint at ltfrb.gov.ph or call (02) 426-2515.',
      'For unpaid refunds, escalate to the DTI Consumer Arbitration Office.',
    ],
    primary_law: 'Land Transportation and Traffic Code',
    statute_number: 'RA 4136',
    effective_date: '1964-06-20',
    regulator_name: 'Land Transportation Franchising and Regulatory Board (LTFRB)',
    regulator_url: 'https://ltfrb.gov.ph',
    regulator_complaint_url: 'https://ltfrb.gov.ph/complaints',
    source_url: 'https://ltfrb.gov.ph/ra4136',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  healthcare: {
    plain_rights: [
      'Hospitals cannot detain you after discharge for inability to pay — this is illegal.',
      'You have the right to emergency medical care regardless of ability to pay upfront.',
      'Patients can request itemized bills — hospitals must provide them.',
      'You can file a malpractice complaint with the Professional Regulation Commission (PRC).',
    ],
    plain_obligations: [
      'Hospitals must post a list of services and prices.',
      'Doctors must explain your treatment in understandable language.',
      'Public hospitals must have a patients\' rights charter.',
    ],
    plain_escalation: [
      'File at the DOH regional office or doh.gov.ph.',
      'For professional misconduct, file with the PRC at prc.gov.ph — free online filing.',
    ],
    primary_law: 'Act Prohibiting the Demand of Deposits or Advance Payments in Hospitals',
    statute_number: 'RA 8344',
    effective_date: '1998-07-27',
    regulator_name: 'Department of Health (DOH)',
    regulator_url: 'https://doh.gov.ph',
    regulator_complaint_url: 'https://fo-ncr.doh.gov.ph/complaints',
    source_url: 'https://www.doh.gov.ph/ra8344',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  retail: {
    plain_rights: [
      'Products must be safe and as described — you can return defective goods for repair, replacement, or refund.',
      'Price tags are binding — stores cannot charge more at checkout than what is displayed.',
      'Warranties must be honoured — stores cannot use "no exchange, no refund" policies for defective items.',
      'You can file a complaint with DTI for free and get mediation within 30 days.',
    ],
    plain_obligations: [
      'Retailers must display price tags clearly on all items.',
      'Stores must have a visible return and exchange policy.',
      'Receipts must be issued on request.',
    ],
    plain_escalation: [
      'File at egate.dti.gov.ph or call DTI hotline 1-384.',
      'For repeat offenders, DTI can impose fines and close businesses.',
    ],
    primary_law: 'Consumer Act of the Philippines',
    statute_number: 'RA 7394',
    effective_date: '1992-04-13',
    regulator_name: 'Department of Trade and Industry (DTI)',
    regulator_url: 'https://www.dti.gov.ph',
    regulator_complaint_url: 'https://egate.dti.gov.ph',
    source_url: 'https://www.dti.gov.ph/ra7394',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },
};
