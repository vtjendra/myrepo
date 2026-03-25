import 'server-only';
import type { CountryLaws } from './types';

export const TH: CountryLaws = {
  banking: {
    plain_rights: [
      'You can file a free complaint with the Bank of Thailand — call 1213 (24/7 hotline).',
      'Banks must clearly disclose all interest rates and fees before you sign any agreement.',
      'For unauthorized transactions, report immediately — the bank must investigate and respond within 15 business days.',
      'Banks cannot collect debts through harassment, threats, or by contacting your employer.',
    ],
    plain_obligations: [
      'Banks must give you a written complaint acknowledgment within 5 business days.',
      'Banks must resolve complaints within 30 business days.',
      'Banks must disclose all product risks and terms in plain language.',
    ],
    plain_escalation: [
      'Call BOT hotline 1213 or file at bot.or.th.',
      'For credit harassment, report to the National Credit Bureau of Thailand or the police.',
    ],
    primary_law: 'Financial Institutions Business Act',
    statute_number: 'B.E. 2551 (2008)',
    effective_date: '2008-08-04',
    regulator_name: 'Bank of Thailand (BOT)',
    regulator_url: 'https://www.bot.or.th',
    regulator_complaint_url: 'https://www.bot.or.th/en/consumers/financial-consumer-protection/complaints.html',
    source_url: 'https://www.bot.or.th/en/laws-and-regulations/financial-institutions-business-act.html',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  telecommunications: {
    plain_rights: [
      'Operators cannot charge you for services you did not request.',
      'You can port your phone number to another provider for free within 3 working days.',
      'Operators must refund your unused prepaid balance when you cancel.',
      'You have the right to clear information about speeds, limits, and pricing.',
    ],
    plain_obligations: [
      'Operators must resolve complaints within 30 days.',
      'Operators must give consumers 30 days\' notice before changing tariffs.',
      'Operators must provide a free call centre.',
    ],
    plain_escalation: [
      'Call NBTC Consumer Hotline 1200 or file at nbtc.go.th.',
      'NBTC can order refunds and penalize operators.',
    ],
    primary_law: 'Telecommunications Business Act',
    statute_number: 'B.E. 2544 (2001)',
    effective_date: '2001-11-05',
    regulator_name: 'National Broadcasting and Telecommunications Commission (NBTC)',
    regulator_url: 'https://www.nbtc.go.th',
    regulator_complaint_url: 'https://www.nbtc.go.th/en/consumer-protection/complaint.aspx',
    source_url: 'https://www.nbtc.go.th/en/laws-regulations',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  ecommerce: {
    plain_rights: [
      'Online sellers must display their name, address, and contact details — anonymous sellers are illegal.',
      'You can cancel an online order within 7 days of receiving it (cooling-off right for direct sales).',
      'Misleading or false advertising is a criminal offence under the Consumer Protection Act.',
      'You can get a full refund for products that do not match their description.',
    ],
    plain_obligations: [
      'Sellers must provide order confirmation and receipt.',
      'Sellers must process refunds within 15 days of a return.',
      'Platforms must cooperate with OCPB investigations.',
    ],
    plain_escalation: [
      'Call OCPB hotline 1166 or file at complaint.ocpb.go.th.',
      'OCPB can prosecute sellers and seek compensation on your behalf.',
    ],
    primary_law: 'Consumer Protection Act (as amended)',
    statute_number: 'B.E. 2522 (1979), amended B.E. 2562 (2019)',
    effective_date: '2019-05-27',
    regulator_name: 'Office of the Consumer Protection Board (OCPB)',
    regulator_url: 'https://www.ocpb.go.th',
    regulator_complaint_url: 'https://complaint.ocpb.go.th',
    source_url: 'https://www.ocpb.go.th/en/consumer-protection-act',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  insurance: {
    plain_rights: [
      'You have a 15-day cooling-off period after buying a life insurance policy to cancel for a full refund.',
      'If your claim is denied, the insurer must give a written explanation.',
      'You can file a free complaint with the OIC — they can compel the insurer to respond.',
      'Insurers cannot cancel your policy mid-term without 15 days\' written notice.',
    ],
    plain_obligations: [
      'Insurers must settle claims within 15 days of receiving all required documents.',
      'Insurers must provide clear policy documents before you sign.',
      'Insurers must give a written claim decision.',
    ],
    plain_escalation: [
      'Call OIC hotline 1186 or file at oic.or.th.',
      'OIC can mediate disputes and order settlements.',
    ],
    primary_law: 'Life Insurance Act + Non-Life Insurance Act',
    statute_number: 'B.E. 2535 (1992)',
    effective_date: '1992-03-04',
    regulator_name: 'Office of Insurance Commission (OIC)',
    regulator_url: 'https://www.oic.or.th',
    regulator_complaint_url: 'https://www.oic.or.th/en/consumer/complaint',
    source_url: 'https://www.oic.or.th/en/laws-regulations',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  airline: {
    plain_rights: [
      'For delays over 2 hours, airlines must provide food, drinks, and communication assistance.',
      'For cancellations, you can choose a full refund or rebooking on the next available flight.',
      'For denied boarding (overbooking), you are entitled to cash compensation of 1,200–2,400 THB depending on flight distance.',
      'Lost baggage claims must be filed within 7 days; damaged baggage within 3 days.',
    ],
    plain_obligations: [
      'Airlines must inform passengers of delays as soon as possible.',
      'Airlines must process refunds within 30 days.',
      'Airlines must have a passenger complaints procedure.',
    ],
    plain_escalation: [
      'File a complaint at caat.or.th or call (02) 287-0320.',
      'CAAT can investigate and recommend remedies.',
    ],
    primary_law: 'CAAT Regulations on Passenger Rights',
    statute_number: 'CAAT Notification 2017',
    effective_date: '2017-05-04',
    regulator_name: 'Civil Aviation Authority of Thailand (CAAT)',
    regulator_url: 'https://www.caat.or.th',
    regulator_complaint_url: 'https://www.caat.or.th/en/complaint',
    source_url: 'https://www.caat.or.th/en/regulations',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  utilities: {
    plain_rights: [
      'You can dispute a billing error — MEA or PEA must investigate within 30 days.',
      'You have the right to accurate meter readings — request a free check if you suspect errors.',
      'Electricity providers must give prior written notice before disconnecting supply.',
      'ERC Thailand can investigate complaints against both PEA and MEA.',
    ],
    plain_obligations: [
      'Providers must respond to billing complaints within 30 days.',
      'Providers must reconnect supply within 24 hours of resolving a payment dispute.',
      'Providers must display approved tariff rates.',
    ],
    plain_escalation: [
      'Call MEA at 1130 or PEA at 1129.',
      'File with ERC Thailand at erc.or.th for unresolved disputes.',
    ],
    primary_law: 'Energy Industry Act',
    statute_number: 'B.E. 2550 (2007)',
    effective_date: '2007-12-11',
    regulator_name: 'Energy Regulatory Commission (ERC Thailand)',
    regulator_url: 'https://www.erc.or.th',
    regulator_complaint_url: 'https://www.erc.or.th/en/complaint',
    source_url: 'https://www.erc.or.th/en/laws-regulations',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  transportation: {
    plain_rights: [
      'Taxis must use their meter — refusing to use the meter is illegal.',
      'App-based ride services must be licensed by the Department of Land Transport.',
      'You can report overcharging or unsafe drivers to DLT.',
      'Buses must display routes and fares clearly.',
    ],
    plain_obligations: [
      'Drivers must display their licence and vehicle registration visibly.',
      'Operators must resolve passenger complaints within 15 days.',
    ],
    plain_escalation: [
      'Report taxis at DLT hotline 1584.',
      'File a formal complaint at dlt.go.th.',
    ],
    primary_law: 'Land Traffic Act',
    statute_number: 'B.E. 2522 (1979)',
    effective_date: '1979-04-09',
    regulator_name: 'Department of Land Transport (DLT)',
    regulator_url: 'https://www.dlt.go.th',
    regulator_complaint_url: 'https://www.dlt.go.th/en/complaint',
    source_url: 'https://www.dlt.go.th/en/laws-regulations',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  healthcare: {
    plain_rights: [
      'Under the Universal Coverage Scheme, you can access standard medical treatment for free or low cost.',
      'You have the right to informed consent before any procedure.',
      'You can request your medical records within 30 days of treatment.',
      'You can file a medical malpractice complaint at the Ministry of Public Health — it is free.',
    ],
    plain_obligations: [
      'Hospitals must give patients a clear cost estimate before procedures.',
      'Hospitals must post a patient rights charter visibly.',
      'Doctors must explain procedures in plain language.',
    ],
    plain_escalation: [
      'Call NHSO hotline 1330 or file at nhso.go.th.',
      'For professional misconduct, file with the Medical Council of Thailand.',
    ],
    primary_law: 'National Health Security Act',
    statute_number: 'B.E. 2545 (2002)',
    effective_date: '2002-11-18',
    regulator_name: 'National Health Security Office (NHSO) + Ministry of Public Health (MOPH)',
    regulator_url: 'https://www.nhso.go.th',
    regulator_complaint_url: 'https://www.nhso.go.th/eng/complaint',
    source_url: 'https://www.nhso.go.th/eng/laws-regulations',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  retail: {
    plain_rights: [
      'You can return defective goods and claim repair, replacement, or refund under the Product Liability Act.',
      'Misleading pricing or false product claims are illegal — you can report them to OCPB.',
      'OCPB can pursue legal action on your behalf against sellers.',
      'Safety recalls must be publicly announced — check ocpb.go.th for product alerts.',
    ],
    plain_obligations: [
      'Retailers must clearly display prices.',
      'Manufacturers must recall unsafe products and notify consumers.',
      'Sellers must honour written warranties.',
    ],
    plain_escalation: [
      'Call OCPB hotline 1166 or file at complaint.ocpb.go.th.',
      'OCPB offers free legal support for consumer cases.',
    ],
    primary_law: 'Consumer Protection Act + Product Liability Act',
    statute_number: 'B.E. 2522 (1979), amended B.E. 2562 (2019) + Product Liability Act B.E. 2551 (2008)',
    effective_date: '2019-05-27',
    regulator_name: 'Office of the Consumer Protection Board (OCPB)',
    regulator_url: 'https://www.ocpb.go.th',
    regulator_complaint_url: 'https://complaint.ocpb.go.th',
    source_url: 'https://www.ocpb.go.th/en/consumer-protection-act',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },
};
