import 'server-only';
import type { CountryLaws } from './types';

export const SG: CountryLaws = {
  banking: {
    plain_rights: [
      'Under the Shared Responsibility Framework (Dec 2024), banks must pay for phishing losses if they failed security standards.',
      'Banks cannot charge fees not disclosed in the product terms.',
      'For unauthorized transactions, report within 14 days — the bank must investigate within 14 business days.',
      'You can escalate unresolved bank complaints to FIDReC — free, binding up to S$100,000.',
    ],
    plain_obligations: [
      'Banks must acknowledge your complaint within 5 business days.',
      'Banks must resolve your complaint within 21 business days.',
      'Banks must send real-time transaction alerts for all digital payments.',
    ],
    plain_escalation: [
      'Contact MAS at mas.gov.sg or call (65) 6225-5577.',
      'Escalate to the Financial Industry Disputes Resolution Centre (FIDReC) at fidrec.com.sg — free adjudication.',
    ],
    primary_law: 'Consumer Protection (Fair Trading) Act 2003 + MAS Shared Responsibility Framework',
    statute_number: 'CPFTA 2003 + SRF December 2024',
    effective_date: '2024-12-16',
    regulator_name: 'Monetary Authority of Singapore (MAS)',
    regulator_url: 'https://www.mas.gov.sg',
    regulator_complaint_url: 'https://www.mas.gov.sg/consumer-complaints',
    source_url: 'https://www.mas.gov.sg/regulation/guidelines/shared-responsibility-framework',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  telecommunications: {
    plain_rights: [
      'Operators cannot add services to your plan without your explicit consent.',
      'If your service fails to meet the agreed quality, you can claim a service credit.',
      'You can file a free complaint with IMDA — they have the power to investigate operators.',
      'Operators must give you at least 30 days\' notice before changing prices.',
    ],
    plain_obligations: [
      'Operators must resolve complaints within 30 calendar days.',
      'Operators must provide free customer service.',
      'Operators must display all prices and contract terms clearly.',
    ],
    plain_escalation: [
      'File a complaint at imda.gov.sg or call 6377-2800.',
      'IMDA can order refunds and penalize operators.',
    ],
    primary_law: 'Telecommunications Act 1999 + IMDA Consumer Protection Code',
    statute_number: 'Telecommunications Act 1999 (Cap 323)',
    effective_date: '1999-12-01',
    regulator_name: 'Info-communications Media Development Authority (IMDA)',
    regulator_url: 'https://www.imda.gov.sg',
    regulator_complaint_url: 'https://www.imda.gov.sg/consumers/feedback',
    source_url: 'https://www.imda.gov.sg/regulations-and-licensing/regulations/codes-of-practice/consumer-protection-code',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  ecommerce: {
    plain_rights: [
      'Sellers must not use misleading claims about products — this is an unfair practice under CPFTA.',
      'You can demand a refund for misrepresented products.',
      'If a seller commits unfair practices repeatedly, CCCS can take action on your behalf.',
      'You can apply to court for a declaration that a practice is unfair — CCCS can support your case.',
    ],
    plain_obligations: [
      'Sellers must provide clear and accurate product information.',
      'Sellers must disclose their identity and contact details.',
      'Sellers must honour stated return policies.',
    ],
    plain_escalation: [
      'File a complaint at cccs.gov.sg or call (65) 6325-8282.',
      'CCCS can seek court injunctions against repeat offenders.',
    ],
    primary_law: 'Consumer Protection (Fair Trading) Act 2003',
    statute_number: 'CPFTA 2003 (Cap 52A)',
    effective_date: '2004-03-01',
    regulator_name: 'Competition and Consumer Commission of Singapore (CCCS)',
    regulator_url: 'https://www.cccs.gov.sg',
    regulator_complaint_url: 'https://www.cccs.gov.sg/consumer-protection/consumer-complaints',
    source_url: 'https://sso.agc.gov.sg/Act/CPFTA2003',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  insurance: {
    plain_rights: [
      'You have a 14-day free-look period for life insurance policies — cancel for a full refund.',
      'Insurers must act in your best interests under the MAS Fair Dealing Guidelines.',
      'If your claim is denied, the insurer must give a written explanation.',
      'FIDReC adjudication is free and binding up to S$100,000.',
    ],
    plain_obligations: [
      'Insurers must settle claims or issue decisions within 30 working days.',
      'Agents must recommend products suitable for your needs.',
      'Insurers must give you a clear Product Summary before you sign.',
    ],
    plain_escalation: [
      'File a complaint with FIDReC at fidrec.com.sg — free, impartial, binding.',
      'For agent misconduct, file with MAS at mas.gov.sg.',
    ],
    primary_law: 'Insurance Act 1966 + MAS Notice 302 on Fair Dealing',
    statute_number: 'Insurance Act 1966 (Cap 142)',
    effective_date: '2009-01-01',
    regulator_name: 'Monetary Authority of Singapore (MAS) + FIDReC',
    regulator_url: 'https://www.mas.gov.sg',
    regulator_complaint_url: 'https://www.fidrec.com.sg',
    source_url: 'https://www.mas.gov.sg/regulation/insurance',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  airline: {
    plain_rights: [
      'For flight delays or cancellations, you are entitled to meals, refreshments, and accommodation where applicable.',
      'Airlines must refund non-refundable taxes if you cancel, as these were collected on your behalf.',
      'Misleading fare advertising is an unfair practice under CPFTA.',
      'You can take a Singapore airline to the Small Claims Tribunal for claims up to S$20,000.',
    ],
    plain_obligations: [
      'Airlines must inform you of delays promptly.',
      'Airlines must have a clear complaint procedure.',
      'Airlines must process refunds within 30 days.',
    ],
    plain_escalation: [
      'File with CAAS at caas.gov.sg.',
      'File with the Small Claims Tribunal at statecourts.gov.sg for claims up to S$20,000.',
    ],
    primary_law: 'Consumer Protection (Fair Trading) Act 2003',
    statute_number: 'CPFTA 2003 (Cap 52A)',
    effective_date: '2004-03-01',
    regulator_name: 'Civil Aviation Authority of Singapore (CAAS)',
    regulator_url: 'https://www.caas.gov.sg',
    regulator_complaint_url: 'https://www.caas.gov.sg/air-travel/passenger-feedback-complaint',
    source_url: 'https://sso.agc.gov.sg/Act/CPFTA2003',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  utilities: {
    plain_rights: [
      'You have the right to choose your electricity retailer under the Open Electricity Market.',
      'Retailers must give 30 days\' notice before changing tariffs.',
      'You can switch electricity retailers once your contract expires — no penalty.',
      'EMA can investigate complaints against your retailer.',
    ],
    plain_obligations: [
      'Retailers must give you a clear contract with all fees disclosed.',
      'Retailers must respond to complaints within 5 business days.',
      'SP Group must restore supply within 4 hours for residential outages.',
    ],
    plain_escalation: [
      'File a complaint with EMA at ema.gov.sg or call 1800-338-8877.',
      'For unresolved retailer disputes, EMA has binding mediation powers.',
    ],
    primary_law: 'Electricity Act 2001',
    statute_number: 'Electricity Act 2001 (Cap 89A)',
    effective_date: '2001-04-01',
    regulator_name: 'Energy Market Authority (EMA)',
    regulator_url: 'https://www.ema.gov.sg',
    regulator_complaint_url: 'https://www.ema.gov.sg/consumer-complaints',
    source_url: 'https://sso.agc.gov.sg/Act/EA2001',
    last_verified: '2026-03-25',
    verification_interval_days: 120,
  },

  transportation: {
    plain_rights: [
      'Ride-hailing apps must display fares upfront — no surprise surcharges.',
      'Drivers must be licensed under LTA — unlicensed ride-for-hire is illegal.',
      'You can report overcharging or dangerous driving to LTA.',
      'Apps must have a working dispute process and must respond within 3 working days.',
    ],
    plain_obligations: [
      'Platforms must comply with LTA Operator Licence conditions.',
      'Drivers must hold a valid vocational licence.',
      'Platforms must take safety complaints seriously and act within 3 days.',
    ],
    plain_escalation: [
      'File a complaint at lta.gov.sg or call 1800-225-5582.',
      'For consumer disputes, file with CCCS at cccs.gov.sg.',
    ],
    primary_law: 'Point-to-Point Transport Act 2019',
    statute_number: 'Point-to-Point Transport Act 2019',
    effective_date: '2019-07-13',
    regulator_name: 'Land Transport Authority (LTA)',
    regulator_url: 'https://www.lta.gov.sg',
    regulator_complaint_url: 'https://www.lta.gov.sg/content/ltagov/en/Contact_Us.html',
    source_url: 'https://sso.agc.gov.sg/Act/PPTA2019',
    last_verified: '2026-03-25',
    verification_interval_days: 120,
  },

  healthcare: {
    plain_rights: [
      'You have the right to be informed of your diagnosis and treatment options in plain language.',
      'You must give written informed consent before any major procedure.',
      'You can request your medical records — providers must give them within a reasonable time.',
      'If a private clinic charges more than quoted, this may be an unfair practice under CPFTA.',
    ],
    plain_obligations: [
      'Healthcare providers must give you a written cost estimate before elective procedures.',
      'Providers must have a complaints process.',
      'Doctors must be registered with the Singapore Medical Council (SMC).',
    ],
    plain_escalation: [
      'File a complaint with MOH at moh.gov.sg.',
      'For professional misconduct, file with the Singapore Medical Council (SMC) at smc.gov.sg — free.',
    ],
    primary_law: 'Healthcare Services Act 2020',
    statute_number: 'Healthcare Services Act 2020',
    effective_date: '2020-12-03',
    regulator_name: 'Ministry of Health Singapore (MOH)',
    regulator_url: 'https://www.moh.gov.sg',
    regulator_complaint_url: 'https://www.moh.gov.sg/feedback',
    source_url: 'https://sso.agc.gov.sg/Act/HSA2020',
    last_verified: '2026-03-25',
    verification_interval_days: 120,
  },

  retail: {
    plain_rights: [
      'Within 6 months of purchase, if a product is defective the seller must repair, replace, or refund — Singapore\'s lemon law.',
      'Misleading product claims are an unfair practice under CPFTA — you can demand a remedy.',
      'You can apply to the Small Claims Tribunal for claims up to S$20,000 (fast, ~S$10 filing fee).',
      'CCCS can seek injunctions against retailers who repeatedly commit unfair practices.',
    ],
    plain_obligations: [
      'Sellers must not use misleading representations to sell goods.',
      'Sellers must honour stated warranties.',
      'Receipts must be provided on request.',
    ],
    plain_escalation: [
      'File a complaint with CCCS at cccs.gov.sg.',
      'Use the Small Claims Tribunal at statecourts.gov.sg for direct redress.',
    ],
    primary_law: 'Consumer Protection (Fair Trading) Act 2003 + Sale of Goods Act (Lemon Law)',
    statute_number: 'CPFTA 2003 + Sale of Goods Act Cap 393 Part VA (2012)',
    effective_date: '2012-09-01',
    regulator_name: 'Competition and Consumer Commission of Singapore (CCCS)',
    regulator_url: 'https://www.cccs.gov.sg',
    regulator_complaint_url: 'https://www.cccs.gov.sg/consumer-protection/consumer-complaints',
    source_url: 'https://sso.agc.gov.sg/Act/CPFTA2003',
    last_verified: '2026-03-25',
    verification_interval_days: 120,
  },
};
