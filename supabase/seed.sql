-- Seed data: 10 Indonesian companies across industries

INSERT INTO companies (id, canonical_name, global_slug, website, industry) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Telkomsel', 'telkomsel', 'https://www.telkomsel.com', 'telecommunications'),
  ('a0000001-0000-0000-0000-000000000002', 'Bank Central Asia', 'bca', 'https://www.bca.co.id', 'banking'),
  ('a0000001-0000-0000-0000-000000000003', 'Tokopedia', 'tokopedia', 'https://www.tokopedia.com', 'ecommerce'),
  ('a0000001-0000-0000-0000-000000000004', 'Lion Air', 'lion-air', 'https://www.lionair.co.id', 'airline'),
  ('a0000001-0000-0000-0000-000000000005', 'PLN', 'pln', 'https://www.pln.co.id', 'utilities'),
  ('a0000001-0000-0000-0000-000000000006', 'BPJS Kesehatan', 'bpjs-kesehatan', 'https://www.bpjs-kesehatan.go.id', 'healthcare'),
  ('a0000001-0000-0000-0000-000000000007', 'Gojek', 'gojek', 'https://www.gojek.com', 'transportation'),
  ('a0000001-0000-0000-0000-000000000008', 'Indosat Ooredoo Hutchison', 'indosat', 'https://www.indosatooredoo.com', 'telecommunications'),
  ('a0000001-0000-0000-0000-000000000009', 'Traveloka', 'traveloka', 'https://www.traveloka.com', 'ecommerce'),
  ('a0000001-0000-0000-0000-000000000010', 'Shopee Indonesia', 'shopee-id', 'https://shopee.co.id', 'ecommerce');

INSERT INTO company_entities (company_id, country_code, local_name, complaint_email, complaint_url, regulator_name, regulator_url) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'ID', 'Telkomsel', 'customercare@telkomsel.co.id', 'https://www.telkomsel.com/bantuan', 'BRTI (Badan Regulasi Telekomunikasi Indonesia)', 'https://www.brti.or.id'),
  ('a0000001-0000-0000-0000-000000000002', 'ID', 'Bank BCA', 'halobca@bca.co.id', 'https://www.bca.co.id/tentang-bca/tata-kelola/penanganan-pengaduan', 'OJK (Otoritas Jasa Keuangan)', 'https://www.ojk.go.id'),
  ('a0000001-0000-0000-0000-000000000003', 'ID', 'Tokopedia', 'support@tokopedia.com', 'https://www.tokopedia.com/help', 'Kementerian Perdagangan', 'https://www.kemendag.go.id'),
  ('a0000001-0000-0000-0000-000000000004', 'ID', 'Lion Air', 'customercare@lionair.co.id', 'https://www.lionair.co.id/customer-care', 'Kementerian Perhubungan', 'https://dephub.go.id'),
  ('a0000001-0000-0000-0000-000000000005', 'ID', 'PLN (Perusahaan Listrik Negara)', 'pln123@pln.co.id', 'https://www.pln.co.id/pelanggan/keluhan', 'Kementerian ESDM', 'https://www.esdm.go.id'),
  ('a0000001-0000-0000-0000-000000000006', 'ID', 'BPJS Kesehatan', 'care.center@bpjs-kesehatan.go.id', 'https://www.bpjs-kesehatan.go.id/bpjs/page/pengaduan', 'Kementerian Kesehatan', 'https://www.kemkes.go.id'),
  ('a0000001-0000-0000-0000-000000000007', 'ID', 'Gojek', NULL, 'https://www.gojek.com/help', 'Kementerian Perhubungan', 'https://dephub.go.id'),
  ('a0000001-0000-0000-0000-000000000008', 'ID', 'Indosat Ooredoo Hutchison', 'cs@indosatooredoo.com', 'https://indosatooredoo.com/bantuan', 'BRTI (Badan Regulasi Telekomunikasi Indonesia)', 'https://www.brti.or.id'),
  ('a0000001-0000-0000-0000-000000000009', 'ID', 'Traveloka', NULL, 'https://www.traveloka.com/help', 'Kementerian Perdagangan', 'https://www.kemendag.go.id'),
  ('a0000001-0000-0000-0000-000000000010', 'ID', 'Shopee Indonesia', NULL, 'https://help.shopee.co.id', 'Kementerian Perdagangan', 'https://www.kemendag.go.id');
