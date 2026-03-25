import 'server-only';
import type { CountryLaws } from './types';

export const MY: CountryLaws = {
  banking: {
    plain_rights: [
      'You can file a free complaint with BNM BNMTELELINK and they must investigate.',
      'Banks cannot charge fees not clearly disclosed in your contract.',
      'For unauthorized transactions, your bank must investigate and resolve within 14 working days.',
      'You have the right to accurate credit information — banks must correct errors in your credit report.',
    ],
    plain_obligations: [
      'Banks must acknowledge your complaint within 5 business days.',
      'Banks must resolve your complaint within 14 business days (complex cases: 30 days).',
      'Banks must clearly disclose all product fees and charges.',
    ],
    plain_escalation: [
      'Contact BNMTELELINK at 1-300-88-5465 or submit online at bnm.gov.my/complaints.',
      'If unresolved, escalate to the Ombudsman for Financial Services (OFS) at ofs.org.my — free, binding up to RM 250,000.',
    ],
    primary_law: 'Financial Services Act 2013',
    statute_number: 'FSA 2013 (Act 758)',
    effective_date: '2013-06-30',
    regulator_name: 'Bank Negara Malaysia (BNM)',
    regulator_url: 'https://www.bnm.gov.my',
    regulator_complaint_url: 'https://www.bnm.gov.my/consumer-corner',
    source_url: 'https://www.bnm.gov.my/financial-services-act',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  telecommunications: {
    plain_rights: [
      'You have the right to the service quality stated in your contract.',
      'Operators cannot add premium services to your plan without your explicit consent.',
      'You can cancel your contract without penalty if the provider fails to deliver agreed service.',
      'Your broadband speed must be at least 70% of the advertised speed.',
    ],
    plain_obligations: [
      'Operators must process your complaint within 5 business days.',
      'Operators must give you a complaint reference number.',
      'Operators must not auto-subscribe you to paid content.',
    ],
    plain_escalation: [
      'File a complaint at aduan.mcmc.gov.my or call 1-800-188-030.',
      'For billing disputes, escalate to the Consumer Forum of Malaysia (CFM) at cfm.org.my — free mediation.',
    ],
    primary_law: 'Communications and Multimedia Act 1998',
    statute_number: 'CMA 1998 (Act 588)',
    effective_date: '1998-10-01',
    regulator_name: 'Malaysian Communications and Multimedia Commission (MCMC)',
    regulator_url: 'https://www.mcmc.gov.my',
    regulator_complaint_url: 'https://aduan.mcmc.gov.my',
    source_url: 'https://www.mcmc.gov.my/en/legal/acts/communications-and-multimedia-act-1998',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  ecommerce: {
    plain_rights: [
      'Sellers must display accurate product information, price, and terms — misleading listings are illegal.',
      'You can return a product and get a full refund if it does not match the description.',
      'Online marketplaces must have a working dispute resolution system.',
      'You can sue at the Tribunal for Consumer Claims for free — up to RM 50,000.',
    ],
    plain_obligations: [
      'Online sellers must provide a physical address and valid contact details.',
      'Platforms must verify merchant identity under the 2024 e-trade regulations.',
      'Sellers must clearly state the total price including all taxes and fees.',
    ],
    plain_escalation: [
      'File a complaint at kkdnihub.kpdn.gov.my or call 1-800-886-800.',
      'Apply to the Tribunal for Consumer Claims — free, no lawyer needed, decisions within 60 days.',
    ],
    primary_law: 'Consumer Protection Act 1999 + Consumer Protection (Electronic Trade Transactions) Regulations 2024',
    statute_number: 'Act 599 + E-Trade Regulations 2024',
    effective_date: '2024-01-01',
    regulator_name: 'Ministry of Domestic Trade and Cost of Living (KPDN)',
    regulator_url: 'https://www.kpdn.gov.my',
    regulator_complaint_url: 'https://kkdnihub.kpdn.gov.my',
    source_url: 'https://www.kpdn.gov.my/images/2024/awam/akta/ttpm/Act%20599.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  insurance: {
    plain_rights: [
      'The insurer cannot deny a claim without a written explanation.',
      'You have a 15-day cooling-off period after purchasing a life insurance policy — cancel for a full refund.',
      'Insurers must settle your claim or send a decision letter within 30 working days.',
      'If the agent misrepresented the policy, you can void the contract and get your premiums back.',
    ],
    plain_obligations: [
      'Insurers must acknowledge a claim within 7 working days.',
      'Insurers must provide a written decision — approval or denial with reason — within 30 days.',
      'Insurers must inform you of the Financial Mediation Bureau referral option.',
    ],
    plain_escalation: [
      'File a complaint with BNM at bnm.gov.my or call 1-300-88-5465.',
      'Escalate to the Financial Mediation Bureau (FMB) at fmb.org.my — free, binding up to RM 200,000.',
    ],
    primary_law: 'Financial Services Act 2013',
    statute_number: 'FSA 2013 (Act 758)',
    effective_date: '2013-06-30',
    regulator_name: 'Bank Negara Malaysia (BNM)',
    regulator_url: 'https://www.bnm.gov.my',
    regulator_complaint_url: 'https://www.bnm.gov.my/consumer-corner',
    source_url: 'https://www.bnm.gov.my/financial-services-act',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  airline: {
    plain_rights: [
      'For delays over 2 hours, the airline must provide meals and refreshments.',
      'For cancellations, you can choose a full cash refund or a rebooking at no extra charge.',
      'Lost baggage must be reported at the airport — airlines must compensate you within 21 days.',
      'You can file a free complaint with MAVCOM if the airline does not resolve within 30 days.',
    ],
    plain_obligations: [
      'Airlines must notify you of a delay or cancellation as soon as they know.',
      'Airlines must process refunds within 30 days.',
      'Airlines must display a clear complaint procedure.',
    ],
    plain_escalation: [
      'File a complaint at consumer.mavcom.my or call 1-300-88-9090.',
      'MAVCOM will investigate and issue a binding decision — free for consumers.',
    ],
    primary_law: 'Malaysia Aviation Consumer Protection Code 2016',
    statute_number: 'MACPC 2016',
    effective_date: '2016-01-01',
    regulator_name: 'Malaysia Aviation Commission (MAVCOM)',
    regulator_url: 'https://www.mavcom.my',
    regulator_complaint_url: 'https://consumer.mavcom.my',
    source_url: 'https://www.mavcom.my/en/consumers/consumer-protection-code',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  utilities: {
    plain_rights: [
      'You can dispute your electricity bill if you believe your meter is faulty.',
      'TNB must restore power within 4 hours for residential outages, or you can claim compensation.',
      'You must receive prior written notice before disconnection for non-payment.',
      'You have the right to a free meter test — TNB must do this if the meter is found faulty.',
    ],
    plain_obligations: [
      'TNB must provide a written explanation for unusual billing spikes.',
      'TNB must restore supply within 4 hours for emergency residential outages.',
      'Utilities must have a working customer complaints channel.',
    ],
    plain_escalation: [
      'Call TNB at 15454 or file a complaint with Suruhanjaya Tenaga at st.gov.my.',
    ],
    primary_law: 'Energy Commission Act 2001',
    statute_number: 'Act 610 (2001)',
    effective_date: '2001-05-01',
    regulator_name: 'Suruhanjaya Tenaga (Energy Commission Malaysia)',
    regulator_url: 'https://www.st.gov.my',
    regulator_complaint_url: 'https://www.st.gov.my/en/web/guest/complaint',
    source_url: 'https://www.st.gov.my/en/web/guest/laws-and-regulations',
    last_verified: '2026-03-25',
    verification_interval_days: 120,
  },

  transportation: {
    plain_rights: [
      'Taxis and e-hailing drivers must charge only the metered or app-displayed fare.',
      'You can report overcharging or unsafe driving directly to APAD.',
      'E-hailing platforms must provide 24/7 customer support and resolve disputes within 2 business days.',
      'Buses and LRTs must display routes and fares clearly.',
    ],
    plain_obligations: [
      'Operators must hold valid operating licences.',
      'E-hailing platforms must verify driver identity and vehicle registration.',
      'Complaints must be acknowledged within 2 business days.',
    ],
    plain_escalation: [
      'File a complaint with APAD at apad.gov.my or call 1-800-888-867.',
      'For e-hailing, first use the in-app dispute channel, then escalate to APAD.',
    ],
    primary_law: 'Land Public Transport Act 2010',
    statute_number: 'Act 715 (2010)',
    effective_date: '2010-12-01',
    regulator_name: 'Land Public Transport Agency (APAD)',
    regulator_url: 'https://www.apad.gov.my',
    regulator_complaint_url: 'https://www.apad.gov.my/complaints',
    source_url: 'https://www.apad.gov.my/en/legislation',
    last_verified: '2026-03-25',
    verification_interval_days: 120,
  },

  healthcare: {
    plain_rights: [
      'You must be informed of costs before treatment — hospitals cannot charge for undisclosed procedures.',
      'You have the right to a second opinion at any time.',
      'You can request your full medical records — private hospitals must provide them within 14 days.',
      'If a private doctor or hospital caused harm through negligence, you can file a complaint and sue.',
    ],
    plain_obligations: [
      'Hospitals must display their charges and fee schedules.',
      'Doctors must get your informed consent before procedures.',
      'Private hospitals must have a Patient Grievance Process.',
    ],
    plain_escalation: [
      'File a complaint at hcrc.moh.gov.my or call 1-800-888-099.',
      'For professional misconduct, file with the Malaysian Medical Council (MMC) at mmc.gov.my.',
    ],
    primary_law: 'Private Healthcare Facilities and Services Act 1998',
    statute_number: 'Act 586 (PHFSA 1998)',
    effective_date: '1998-07-01',
    regulator_name: 'Ministry of Health Malaysia (MOH)',
    regulator_url: 'https://www.moh.gov.my',
    regulator_complaint_url: 'https://hcrc.moh.gov.my',
    source_url: 'https://www.moh.gov.my/index.php/database_stores/attach_download/317/3',
    last_verified: '2026-03-25',
    verification_interval_days: 120,
  },

  retail: {
    plain_rights: [
      'Goods must be of acceptable quality and match their description — you can return defective items.',
      'You can claim at the Tribunal for Consumer Claims for up to RM 50,000 at no cost.',
      'False product labeling or misleading descriptions are a criminal offence under the Trade Descriptions Act.',
      'Warranties must be honoured — retailers cannot use "no returns" policies for genuinely defective goods.',
    ],
    plain_obligations: [
      'Retailers must clearly display prices and must not add hidden charges at checkout.',
      'Sellers must provide receipts on request.',
      'Warranties must be in writing and in Bahasa Malaysia or English.',
    ],
    plain_escalation: [
      'File a complaint at kkdnihub.kpdn.gov.my or call 1-800-886-800.',
      'Apply to the Tribunal for Consumer Claims — free, fast, no lawyer needed.',
    ],
    primary_law: 'Consumer Protection Act 1999',
    statute_number: 'Act 599 (1999)',
    effective_date: '1999-11-15',
    regulator_name: 'Ministry of Domestic Trade and Cost of Living (KPDN)',
    regulator_url: 'https://www.kpdn.gov.my',
    regulator_complaint_url: 'https://kkdnihub.kpdn.gov.my',
    source_url: 'https://www.kpdn.gov.my/images/2024/awam/akta/ttpm/Act%20599.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 120,
  },
};
