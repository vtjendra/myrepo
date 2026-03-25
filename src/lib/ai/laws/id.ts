import 'server-only';
import type { CountryLaws } from './types';

export const ID: CountryLaws = {
  banking: {
    plain_rights: [
      'You can file a free complaint with OJK online — they must respond within 20 working days.',
      'Your bank cannot charge fees not listed in your contract or product terms.',
      'If your account was accessed without your permission, report it immediately and the bank must investigate.',
      'You can demand a written explanation for any rejected transaction or frozen account.',
    ],
    plain_obligations: [
      'The bank must acknowledge your complaint within 5 working days.',
      'The bank must resolve your complaint within 20 working days (extendable to 40 for complex cases).',
      'The bank must give you a unique complaint reference number.',
    ],
    plain_escalation: [
      'File a complaint at konsumen.ojk.go.id or call 157 (free, 24/7).',
      'If unresolved after 20 working days, escalate to LAPS-SJK (laps-sjk.or.id) — free mediation.',
    ],
    primary_law: 'Peraturan OJK tentang Perlindungan Konsumen dan Masyarakat di Sektor Jasa Keuangan',
    statute_number: 'POJK No. 6/POJK.07/2022',
    effective_date: '2023-01-01',
    regulator_name: 'Otoritas Jasa Keuangan (OJK)',
    regulator_url: 'https://ojk.go.id',
    regulator_complaint_url: 'https://konsumen.ojk.go.id',
    source_url: 'https://ojk.go.id/id/regulasi/Pages/POJK-Nomor-6-POJK.07-2022.aspx',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  telecommunications: {
    plain_rights: [
      'You have the right to the service speed and quality promised in your contract.',
      'You can demand a refund or credit for unplanned outages lasting more than 1 hour.',
      'Operators cannot sign you up for premium services or auto-renewals without your explicit consent.',
      'You can end your contract without penalty if the operator fails to deliver agreed service.',
    ],
    plain_obligations: [
      'Operators must clearly state all prices, terms, and conditions before you sign up.',
      'Operators must respond to your complaint within 3 working days.',
      'Operators must provide a free customer service channel.',
    ],
    plain_escalation: [
      'File a complaint at layanan.kominfo.go.id or call the Kominfo helpline 159.',
      'If unresolved, escalate to Badan Perlindungan Konsumen Nasional (BPKN) at bpkn.go.id.',
    ],
    primary_law: 'Undang-Undang tentang Telekomunikasi',
    statute_number: 'UU No. 36/1999',
    effective_date: '2000-09-08',
    regulator_name: 'Badan Regulasi Telekomunikasi Indonesia (BRTI)',
    regulator_url: 'https://brti.go.id',
    regulator_complaint_url: 'https://layanan.kominfo.go.id',
    source_url: 'https://jdih.kominfo.go.id/produk_hukum/view/id/167/t/undangundang+nomor+36+tahun+1999',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  ecommerce: {
    plain_rights: [
      'You have the right to accurate product information — sellers cannot lie about specs, condition, or origin.',
      'You can demand a full refund if the item arrives damaged, wrong, or not as described.',
      'Platforms must give you a clear 2-step confirmation before charging you.',
      'You have 2 working days to reject a delivery and request a return if the item is defective.',
    ],
    plain_obligations: [
      'Sellers must respond to your complaint within 2 working days.',
      'Platforms must provide a working dispute resolution mechanism.',
      'Sellers must display product info including price, terms, after-sale service, and guarantee.',
    ],
    plain_escalation: [
      'Report to BPKN at bpkn.go.id or the national complaint portal at lapor.go.id.',
      'You can sue at the Consumer Dispute Settlement Agency (BPSK) in your city — free for claims under Rp 200 million.',
    ],
    primary_law: 'Undang-Undang tentang Perlindungan Konsumen',
    statute_number: 'UU No. 8/1999',
    effective_date: '2000-04-20',
    regulator_name: 'Badan Perlindungan Konsumen Nasional (BPKN)',
    regulator_url: 'https://bpkn.go.id',
    regulator_complaint_url: 'https://lapor.go.id',
    source_url: 'https://jdih.kemenkumham.go.id/arsip/bn/1999/uu8-1999.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 60,
  },

  insurance: {
    plain_rights: [
      'If your claim is denied, the insurer must give you a written explanation within 5 working days.',
      'You can cancel your policy within 14 days of signing and get a full premium refund (cooling-off period).',
      'Insurers cannot misrepresent policy terms — if they did, you can demand a rescission of the contract.',
      'For health insurance, the insurer must process your claim within 7 working days.',
    ],
    plain_obligations: [
      'Insurers must give you a complete policy document within 30 days of purchase.',
      'Insurers must provide a written acknowledgment of your claim within 5 working days.',
      'Insurers must settle or deny a claim within 30 working days after all documents are received.',
    ],
    plain_escalation: [
      'File a complaint at konsumen.ojk.go.id or call 157.',
      'If unresolved, contact LAPS-SJK (laps-sjk.or.id) — free insurance mediation.',
    ],
    primary_law: 'Undang-Undang tentang Perasuransian',
    statute_number: 'UU No. 40/2014',
    effective_date: '2014-10-17',
    regulator_name: 'Otoritas Jasa Keuangan (OJK) — Pengawasan Asuransi',
    regulator_url: 'https://ojk.go.id',
    regulator_complaint_url: 'https://konsumen.ojk.go.id',
    source_url: 'https://ojk.go.id/id/kanal/iknb/regulasi/asuransi/undang-undang/Documents/Pages/UU-No-40-Tahun-2014.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  airline: {
    plain_rights: [
      'For delays of 30–60 minutes, the airline must give you food and drinks.',
      'For delays of 60–180 minutes, you get a meal and the option to reroute or get a full refund.',
      'For delays over 180 minutes or cancellation, you are entitled to a full refund plus compensation.',
      'For cancelled flights, you can choose a full refund or a seat on the next available flight at no extra charge.',
    ],
    plain_obligations: [
      'Airlines must inform you of delays at least 45 minutes before departure.',
      'Airlines must process refunds within 30 days.',
      'For lost baggage, airlines must pay compensation of up to Rp 4 million per passenger.',
    ],
    plain_escalation: [
      'File a complaint at the airport Passenger Service counter or at hubud.dephub.go.id.',
      'If unresolved, report to BPKN at bpkn.go.id or call 1500-734.',
    ],
    primary_law: 'Peraturan Menteri Perhubungan tentang Standar Pelayanan Penumpang Kelas Ekonomi Angkutan Udara Niaga Berjadwal',
    statute_number: 'PM 89/2015',
    effective_date: '2015-07-01',
    regulator_name: 'Direktorat Jenderal Perhubungan Udara (DJPU), Kementerian Perhubungan',
    regulator_url: 'https://hubud.dephub.go.id',
    regulator_complaint_url: 'https://hubla.dephub.go.id',
    source_url: 'https://jdih.dephub.go.id/assets/uudocs/permen/2015/pm._no._89_tahun_2015.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  utilities: {
    plain_rights: [
      'You can demand a refund if you are billed more than you actually used (over-metering).',
      'PLN must restore power within 6 hours for residential outages, or pay compensation.',
      'You have the right to accurate meter readings — request a free check if you suspect errors.',
      'PLN cannot disconnect your power without prior written notice.',
    ],
    plain_obligations: [
      'PLN must give 3-day advance notice before disconnection for non-payment.',
      'PLN must respond to billing disputes within 14 days.',
      'PLN must compensate for prolonged unplanned outages per Permen ESDM 27/2017.',
    ],
    plain_escalation: [
      'Call PLN at 123 (free, 24/7) or report online at web.pln.co.id.',
      'If unresolved, file a complaint with Kementerian ESDM at gatrik.esdm.go.id.',
    ],
    primary_law: 'Undang-Undang tentang Ketenagalistrikan',
    statute_number: 'UU No. 30/2009',
    effective_date: '2009-09-23',
    regulator_name: 'Direktorat Jenderal Ketenagalistrikan, Kementerian ESDM',
    regulator_url: 'https://gatrik.esdm.go.id',
    regulator_complaint_url: 'https://gatrik.esdm.go.id',
    source_url: 'https://jdih.esdm.go.id/assets/berkas/UU_30_2009.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  transportation: {
    plain_rights: [
      'Ride-hailing fares must not exceed the upper tariff limit set by the government.',
      'You can report unsafe or unregistered drivers to Kemenhub.',
      'Drivers must be registered with the platform and carry valid permits.',
      'If your fare is incorrectly charged, report it in the app — you must receive a response within 2 working days.',
    ],
    plain_obligations: [
      'Ride-hailing platforms must provide 24/7 customer service.',
      'Platforms must verify driver identity and vehicle registration.',
      'Platforms must resolve fare disputes within 2 working days.',
    ],
    plain_escalation: [
      'Report in the app first, then escalate to Kemenhub at hubdat.dephub.go.id if no response.',
      'For safety incidents, call 1500-734 (Kemenhub hotline) or police at 110.',
    ],
    primary_law: 'Peraturan Menteri Perhubungan tentang Angkutan Orang dengan Kendaraan Bermotor Umum Tidak dalam Trayek',
    statute_number: 'PM 118/2018',
    effective_date: '2018-11-01',
    regulator_name: 'Direktorat Jenderal Perhubungan Darat, Kementerian Perhubungan',
    regulator_url: 'https://hubdat.dephub.go.id',
    regulator_complaint_url: 'https://hubdat.dephub.go.id',
    source_url: 'https://jdih.dephub.go.id/produk_hukum/view/id/1167',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  healthcare: {
    plain_rights: [
      'You have the right to clear information about your diagnosis, treatment plan, and costs before treatment.',
      'You must give informed consent before any medical procedure — do not sign anything you do not understand.',
      'You can request your full medical records at any time — the hospital must provide them.',
      'You can file a complaint against a doctor for malpractice with MKDKI at no cost.',
    ],
    plain_obligations: [
      'Hospitals must provide an itemized bill for all charges.',
      'Doctors must explain your diagnosis and treatment in plain language.',
      'Hospitals must have a patient complaint mechanism.',
    ],
    plain_escalation: [
      'File a complaint with Kementerian Kesehatan at kemkes.go.id/pengaduan.',
      'For doctor misconduct, file with MKDKI — free process with binding decisions.',
      'For billing disputes, also contact BPJS Kesehatan if you are on health insurance.',
    ],
    primary_law: 'Undang-Undang tentang Kesehatan',
    statute_number: 'UU No. 36/2009',
    effective_date: '2009-10-13',
    regulator_name: 'Kementerian Kesehatan RI + MKDKI',
    regulator_url: 'https://kemkes.go.id',
    regulator_complaint_url: 'https://kemkes.go.id/pengaduan',
    source_url: 'https://peraturan.bpk.go.id/Details/38755/uu-no-36-tahun-2009',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },

  retail: {
    plain_rights: [
      'Products must match what was advertised — you can return anything that does not.',
      'You can return a defective product within a reasonable period and demand repair, replacement, or refund.',
      'Stores cannot refuse to honour a price tag on display, even if it is a mistake.',
      'Products sold in Indonesia must have a Bahasa Indonesia label with clear ingredient or material information.',
    ],
    plain_obligations: [
      'Retailers must have a clear return and refund policy visible to customers.',
      'Retailers must honour warranties as stated.',
      'Counterfeit or mislabeled goods violate UU 8/1999 and the seller can be prosecuted.',
    ],
    plain_escalation: [
      'File a complaint at lapor.go.id or visit the local BPSK (Badan Penyelesaian Sengketa Konsumen).',
      'BPSK hearings are free and must be resolved within 21 days.',
    ],
    primary_law: 'Undang-Undang tentang Perlindungan Konsumen',
    statute_number: 'UU No. 8/1999',
    effective_date: '2000-04-20',
    regulator_name: 'Badan Perlindungan Konsumen Nasional (BPKN) / Kementerian Perdagangan',
    regulator_url: 'https://kemendag.go.id',
    regulator_complaint_url: 'https://lapor.go.id',
    source_url: 'https://jdih.kemenkumham.go.id/arsip/bn/1999/uu8-1999.pdf',
    last_verified: '2026-03-25',
    verification_interval_days: 90,
  },
};
