import 'server-only';
import type { CountryLaws } from './types';

// All industries governed by Law No. 19/2023/QH15 on Protection of Consumer Rights
// (effective July 1, 2024) + Decree 55/2024/ND-CP — completely replaced Law 59/2010.

export const VN: CountryLaws = {
  banking: {
    plain_rights: [
      'Banks must give you complete information about interest rates, fees, and contract terms before you sign.',
      'You can complain to the State Bank of Vietnam for free if your bank violates consumer rights.',
      'For unauthorized transactions, banks must investigate and respond within 30 working days.',
      'Debt collectors must not harass or threaten you, or call outside 7 AM–9 PM.',
    ],
    plain_obligations: [
      'Banks must respond to your complaint within 7 working days.',
      'Banks must provide you a written copy of any agreement you sign.',
      'Banks must clearly disclose the effective annual interest rate.',
    ],
    plain_escalation: [
      'File a complaint at sbv.gov.vn or visit any SBV branch office.',
      'If unresolved, escalate to the Vietnam Competition and Consumer Authority (VCCA) at vcca.gov.vn.',
    ],
    primary_law: 'Law on Protection of Consumer Rights',
    statute_number: 'Law No. 19/2023/QH15 + Decree 55/2024/ND-CP',
    effective_date: '2024-07-01',
    regulator_name: 'State Bank of Vietnam (SBV)',
    regulator_url: 'https://www.sbv.gov.vn',
    regulator_complaint_url: 'https://www.sbv.gov.vn/webcenter/portal/en/home/complaints',
    source_url: 'https://auschamvn.org/advocacy/law-no-192023qh15-protection-consumers-rights-pcr/',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  telecommunications: {
    plain_rights: [
      'Operators cannot charge you for services you have not subscribed to.',
      'You can port your number to a new provider within 3 working days.',
      'Operators must refund your unused prepaid balance when you cancel.',
      'You have the right to accurate information about all service terms and pricing.',
    ],
    plain_obligations: [
      'Operators must respond to complaints within 7 working days.',
      'Operators must provide a free customer hotline.',
      'Operators must notify you 30 days before changing service terms or prices.',
    ],
    plain_escalation: [
      'File a complaint with MIC at mic.gov.vn.',
      'Escalate to VCCA at vcca.gov.vn for persistent violations.',
    ],
    primary_law: 'Law on Protection of Consumer Rights + Telecommunications Law',
    statute_number: 'Law No. 19/2023/QH15 + Law No. 24/2023/QH15',
    effective_date: '2024-07-01',
    regulator_name: 'Ministry of Information and Communications (MIC)',
    regulator_url: 'https://mic.gov.vn',
    regulator_complaint_url: 'https://mic.gov.vn/pages/contact.aspx',
    source_url: 'https://auschamvn.org/advocacy/law-no-192023qh15-protection-consumers-rights-pcr/',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  ecommerce: {
    plain_rights: [
      'Large e-commerce platforms must verify seller identity and display accurate product information.',
      'You can return a product and get a refund if it does not match the description.',
      'Platforms must have a dispute resolution mechanism that responds within 3 working days.',
      'Platforms are jointly liable if they knowingly allow fraudulent sellers on their platform.',
    ],
    plain_obligations: [
      'Sellers must display full contact info, product description, price, and return policy.',
      'Platforms must remove fraudulent listings within 24 hours of being notified.',
      'Sellers must process refunds within 7 working days.',
    ],
    plain_escalation: [
      'File a complaint at khieunai.vcca.gov.vn or call 1800 6838.',
      'VCCA can impose fines and order refunds from platforms.',
    ],
    primary_law: 'Law on Protection of Consumer Rights',
    statute_number: 'Law No. 19/2023/QH15 + Decree 55/2024/ND-CP',
    effective_date: '2024-07-01',
    regulator_name: 'Vietnam Competition and Consumer Authority (VCCA)',
    regulator_url: 'https://vcca.gov.vn',
    regulator_complaint_url: 'https://khieunai.vcca.gov.vn',
    source_url: 'https://www.lexology.com/library/detail.aspx?g=e58a5013-8372-4c6c-adba-27359f841ecb',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  insurance: {
    plain_rights: [
      'You have a 21-day cooling-off period after buying life insurance to cancel for a full refund.',
      'Insurers must explain all policy terms and exclusions before you sign.',
      'If your claim is denied, the insurer must give a written explanation.',
      'You can file a free complaint with the Ministry of Finance.',
    ],
    plain_obligations: [
      'Insurers must settle a claim or issue a denial within 30 days of receiving all required documents.',
      'Insurers must send you your policy document within 15 days of purchase.',
      'Insurers must clearly explain exclusions and waiting periods.',
    ],
    plain_escalation: [
      'File a complaint at mof.gov.vn.',
      'Escalate to VCCA at vcca.gov.vn if mediation is needed.',
    ],
    primary_law: 'Law on Protection of Consumer Rights + Insurance Business Law',
    statute_number: 'Law No. 19/2023/QH15 + Law No. 08/2022/QH15',
    effective_date: '2023-01-01',
    regulator_name: 'Ministry of Finance — Insurance Supervisory Authority (ISA)',
    regulator_url: 'https://mof.gov.vn',
    regulator_complaint_url: 'https://mof.gov.vn/webcenter/portal/btcvn/pages_r/l/hd-tiep-nhan-phan-anh-kien-nghi',
    source_url: 'https://auschamvn.org/advocacy/law-no-192023qh15-protection-consumers-rights-pcr/',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  airline: {
    plain_rights: [
      'For delays over 2 hours, airlines must provide meals and refreshments.',
      'For cancellations, you get a full refund or rebooking at no extra charge.',
      'Lost baggage must be reported at the airport — airlines have 21 days to compensate.',
      'Domestic overbooking compensation starts at VND 200,000 per passenger.',
    ],
    plain_obligations: [
      'Airlines must inform passengers of delays as soon as possible.',
      'Airlines must process refunds within 30 days.',
      'Airlines must have a passenger complaint process.',
    ],
    plain_escalation: [
      'File a complaint at caav.vn or the Ministry of Transport.',
      'Escalate to VCCA at vcca.gov.vn for consumer protection follow-up.',
    ],
    primary_law: 'Law on Protection of Consumer Rights + Civil Aviation Law',
    statute_number: 'Law No. 19/2023/QH15 + Circular 14/2015/TT-BGTVT',
    effective_date: '2015-06-01',
    regulator_name: 'Civil Aviation Authority of Vietnam (CAAV)',
    regulator_url: 'https://caav.vn',
    regulator_complaint_url: 'https://caav.vn/en/contact-us',
    source_url: 'https://auschamvn.org/advocacy/law-no-192023qh15-protection-consumers-rights-pcr/',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  utilities: {
    plain_rights: [
      'You can dispute billing errors — EVN must investigate and respond within 7 working days.',
      'EVN must give 3 days\' advance notice before planned outages.',
      'You have the right to request a free meter accuracy test once per year.',
      'EVN cannot disconnect you without 5 days\' written notice for non-payment.',
    ],
    plain_obligations: [
      'EVN must restore power within 4 hours for residential outages.',
      'EVN must respond to billing complaints within 7 working days.',
      'EVN must clearly display tariff rates.',
    ],
    plain_escalation: [
      'Call EVN hotline 19001006 or file at erav.vn.',
      'Escalate to VCCA at vcca.gov.vn if unresolved.',
    ],
    primary_law: 'Law on Protection of Consumer Rights + Electricity Law',
    statute_number: 'Law No. 19/2023/QH15 + Law No. 28/2004/QH11 (amended 2022)',
    effective_date: '2024-07-01',
    regulator_name: 'Electricity Regulatory Authority of Vietnam (ERAV)',
    regulator_url: 'https://erav.vn',
    regulator_complaint_url: 'https://erav.vn/contact.html',
    source_url: 'https://auschamvn.org/advocacy/law-no-192023qh15-protection-consumers-rights-pcr/',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  transportation: {
    plain_rights: [
      'Ride-hailing platforms must register with DRVN and comply with fare transparency rules.',
      'Drivers must display their name, photo, vehicle plate, and registered fare.',
      'You can file an overcharge complaint directly in the app or with VCCA.',
      'App-based rides must provide electronic receipts within 24 hours.',
    ],
    plain_obligations: [
      'Platforms must respond to complaints within 3 working days.',
      'Platforms must verify driver identity and vehicle registration.',
      'Platforms must not charge more than the fare displayed at booking.',
    ],
    plain_escalation: [
      'File a complaint at vcca.gov.vn or call 1800 6838.',
      'File with DRVN at drvn.gov.vn for licensing violations.',
    ],
    primary_law: 'Law on Protection of Consumer Rights + Road Traffic Law',
    statute_number: 'Law No. 19/2023/QH15 + Decree 10/2020/ND-CP',
    effective_date: '2020-02-01',
    regulator_name: 'Vietnam Competition and Consumer Authority (VCCA)',
    regulator_url: 'https://vcca.gov.vn',
    regulator_complaint_url: 'https://khieunai.vcca.gov.vn',
    source_url: 'https://auschamvn.org/advocacy/law-no-192023qh15-protection-consumers-rights-pcr/',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  healthcare: {
    plain_rights: [
      'You have the right to know your diagnosis, treatment options, and costs before agreeing.',
      'You must give informed consent before any medical procedure.',
      'You can request your medical records within 30 days — hospitals must provide them.',
      'If you were harmed by negligent treatment, you can file a compensation claim.',
    ],
    plain_obligations: [
      'Hospitals must give patients an itemized bill.',
      'Doctors must explain the procedure and get your written consent before surgery.',
      'Hospitals must have a patient feedback and complaint mechanism.',
    ],
    plain_escalation: [
      'File a complaint with the MOH Department of Medical Examination and Treatment at moh.gov.vn.',
      'For serious malpractice, contact the Vietnam Medical Association or the courts.',
    ],
    primary_law: 'Law on Protection of Consumer Rights + Law on Medical Examination and Treatment',
    statute_number: 'Law No. 19/2023/QH15 + Law No. 15/2023/QH15',
    effective_date: '2024-01-01',
    regulator_name: 'Ministry of Health (MOH)',
    regulator_url: 'https://moh.gov.vn',
    regulator_complaint_url: 'https://moh.gov.vn/contact',
    source_url: 'https://auschamvn.org/advocacy/law-no-192023qh15-protection-consumers-rights-pcr/',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  retail: {
    plain_rights: [
      'Products must be safe, match their label, and must not be counterfeit.',
      'You can return defective goods within the warranty period and get repair, replacement, or refund.',
      'Retailers cannot refuse returns for genuinely defective products.',
      'You can file a free complaint with VCCA — they can investigate and fine sellers.',
    ],
    plain_obligations: [
      'Sellers must provide receipts and warranty documentation.',
      'Retailers must clearly display return and refund policies.',
      'Imported products must have Vietnamese-language labels.',
    ],
    plain_escalation: [
      'File at khieunai.vcca.gov.vn or call 1800 6838.',
      'VCCA can impose fines and order compensation.',
    ],
    primary_law: 'Law on Protection of Consumer Rights',
    statute_number: 'Law No. 19/2023/QH15 + Decree 55/2024/ND-CP',
    effective_date: '2024-07-01',
    regulator_name: 'Vietnam Competition and Consumer Authority (VCCA)',
    regulator_url: 'https://vcca.gov.vn',
    regulator_complaint_url: 'https://khieunai.vcca.gov.vn',
    source_url: 'https://www.lexology.com/library/detail.aspx?g=e58a5013-8372-4c6c-adba-27359f841ecb',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },
};
