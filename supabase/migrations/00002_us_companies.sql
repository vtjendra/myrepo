-- Migration: Add major US companies across all industries
-- Uses UUID range b0000002-xxxx for US companies to avoid conflicts with seed data

INSERT INTO companies (id, canonical_name, global_slug, website, industry) VALUES
  -- ecommerce
  ('b0000002-0000-0000-0000-000000000001', 'Amazon', 'amazon', 'https://www.amazon.com', 'ecommerce'),
  ('b0000002-0000-0000-0000-000000000002', 'eBay', 'ebay', 'https://www.ebay.com', 'ecommerce'),
  ('b0000002-0000-0000-0000-000000000003', 'Etsy', 'etsy', 'https://www.etsy.com', 'ecommerce'),
  -- telecommunications
  ('b0000002-0000-0000-0000-000000000004', 'AT&T', 'att', 'https://www.att.com', 'telecommunications'),
  ('b0000002-0000-0000-0000-000000000005', 'Verizon', 'verizon', 'https://www.verizon.com', 'telecommunications'),
  ('b0000002-0000-0000-0000-000000000006', 'T-Mobile', 't-mobile', 'https://www.t-mobile.com', 'telecommunications'),
  ('b0000002-0000-0000-0000-000000000007', 'Comcast', 'comcast', 'https://www.xfinity.com', 'telecommunications'),
  -- banking
  ('b0000002-0000-0000-0000-000000000008', 'Bank of America', 'bank-of-america', 'https://www.bankofamerica.com', 'banking'),
  ('b0000002-0000-0000-0000-000000000009', 'JPMorgan Chase', 'chase', 'https://www.chase.com', 'banking'),
  ('b0000002-0000-0000-0000-000000000010', 'Wells Fargo', 'wells-fargo', 'https://www.wellsfargo.com', 'banking'),
  ('b0000002-0000-0000-0000-000000000011', 'Citibank', 'citibank', 'https://www.citibank.com', 'banking'),
  -- insurance
  ('b0000002-0000-0000-0000-000000000012', 'State Farm', 'state-farm', 'https://www.statefarm.com', 'insurance'),
  ('b0000002-0000-0000-0000-000000000013', 'Geico', 'geico', 'https://www.geico.com', 'insurance'),
  ('b0000002-0000-0000-0000-000000000014', 'UnitedHealth Group', 'unitedhealth', 'https://www.uhc.com', 'insurance'),
  -- airline
  ('b0000002-0000-0000-0000-000000000015', 'Delta Air Lines', 'delta', 'https://www.delta.com', 'airline'),
  ('b0000002-0000-0000-0000-000000000016', 'United Airlines', 'united-airlines', 'https://www.united.com', 'airline'),
  ('b0000002-0000-0000-0000-000000000017', 'American Airlines', 'american-airlines', 'https://www.aa.com', 'airline'),
  ('b0000002-0000-0000-0000-000000000018', 'Southwest Airlines', 'southwest', 'https://www.southwest.com', 'airline'),
  -- utilities
  ('b0000002-0000-0000-0000-000000000019', 'Duke Energy', 'duke-energy', 'https://www.duke-energy.com', 'utilities'),
  ('b0000002-0000-0000-0000-000000000020', 'Pacific Gas & Electric', 'pge', 'https://www.pge.com', 'utilities'),
  -- healthcare
  ('b0000002-0000-0000-0000-000000000021', 'CVS Health', 'cvs', 'https://www.cvs.com', 'healthcare'),
  ('b0000002-0000-0000-0000-000000000022', 'Walgreens', 'walgreens', 'https://www.walgreens.com', 'healthcare'),
  -- technology
  ('b0000002-0000-0000-0000-000000000023', 'Apple', 'apple', 'https://www.apple.com', 'technology'),
  ('b0000002-0000-0000-0000-000000000024', 'Google', 'google', 'https://www.google.com', 'technology'),
  ('b0000002-0000-0000-0000-000000000025', 'Microsoft', 'microsoft', 'https://www.microsoft.com', 'technology'),
  ('b0000002-0000-0000-0000-000000000026', 'Meta', 'meta', 'https://www.meta.com', 'technology'),
  -- retail
  ('b0000002-0000-0000-0000-000000000027', 'Walmart', 'walmart', 'https://www.walmart.com', 'retail'),
  ('b0000002-0000-0000-0000-000000000028', 'Target', 'target', 'https://www.target.com', 'retail'),
  ('b0000002-0000-0000-0000-000000000029', 'Best Buy', 'best-buy', 'https://www.bestbuy.com', 'retail'),
  -- transportation
  ('b0000002-0000-0000-0000-000000000030', 'Uber', 'uber', 'https://www.uber.com', 'transportation'),
  ('b0000002-0000-0000-0000-000000000031', 'Lyft', 'lyft', 'https://www.lyft.com', 'transportation'),
  -- food_beverage
  ('b0000002-0000-0000-0000-000000000032', 'DoorDash', 'doordash', 'https://www.doordash.com', 'food_beverage'),
  ('b0000002-0000-0000-0000-000000000033', 'Uber Eats', 'uber-eats', 'https://www.ubereats.com', 'food_beverage')
ON CONFLICT (global_slug) DO NOTHING;

INSERT INTO company_entities (company_id, country_code, local_name, complaint_email, complaint_url, regulator_name, regulator_url) VALUES
  -- ecommerce
  ('b0000002-0000-0000-0000-000000000001', 'US', 'Amazon', NULL, 'https://www.amazon.com/gp/help/customer/contact-us', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000002', 'US', 'eBay', NULL, 'https://www.ebay.com/help/home', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000003', 'US', 'Etsy', NULL, 'https://www.etsy.com/help', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  -- telecommunications
  ('b0000002-0000-0000-0000-000000000004', 'US', 'AT&T', NULL, 'https://www.att.com/support/', 'Federal Communications Commission (FCC)', 'https://www.fcc.gov'),
  ('b0000002-0000-0000-0000-000000000005', 'US', 'Verizon', NULL, 'https://www.verizon.com/support/', 'Federal Communications Commission (FCC)', 'https://www.fcc.gov'),
  ('b0000002-0000-0000-0000-000000000006', 'US', 'T-Mobile', NULL, 'https://www.t-mobile.com/support', 'Federal Communications Commission (FCC)', 'https://www.fcc.gov'),
  ('b0000002-0000-0000-0000-000000000007', 'US', 'Comcast / Xfinity', NULL, 'https://www.xfinity.com/support', 'Federal Communications Commission (FCC)', 'https://www.fcc.gov'),
  -- banking
  ('b0000002-0000-0000-0000-000000000008', 'US', 'Bank of America', NULL, 'https://www.bankofamerica.com/customer-service/contact-us/', 'Consumer Financial Protection Bureau (CFPB)', 'https://www.consumerfinance.gov'),
  ('b0000002-0000-0000-0000-000000000009', 'US', 'Chase', NULL, 'https://www.chase.com/digital/resources/contact-chase', 'Consumer Financial Protection Bureau (CFPB)', 'https://www.consumerfinance.gov'),
  ('b0000002-0000-0000-0000-000000000010', 'US', 'Wells Fargo', NULL, 'https://www.wellsfargo.com/jump/enterprise/customer-service', 'Consumer Financial Protection Bureau (CFPB)', 'https://www.consumerfinance.gov'),
  ('b0000002-0000-0000-0000-000000000011', 'US', 'Citibank', NULL, 'https://www.citibank.com/us/consumer/disclosure/cards-contact.html', 'Consumer Financial Protection Bureau (CFPB)', 'https://www.consumerfinance.gov'),
  -- insurance
  ('b0000002-0000-0000-0000-000000000012', 'US', 'State Farm', NULL, 'https://www.statefarm.com/customer-care', 'State Insurance Commissioner (via NAIC)', 'https://www.naic.org'),
  ('b0000002-0000-0000-0000-000000000013', 'US', 'Geico', NULL, 'https://www.geico.com/contact', 'State Insurance Commissioner (via NAIC)', 'https://www.naic.org'),
  ('b0000002-0000-0000-0000-000000000014', 'US', 'UnitedHealthcare', NULL, 'https://www.uhc.com/contact-us', 'Centers for Medicare & Medicaid Services (CMS)', 'https://www.cms.gov'),
  -- airline
  ('b0000002-0000-0000-0000-000000000015', 'US', 'Delta Air Lines', NULL, 'https://www.delta.com/us/en/need-help/overview', 'Department of Transportation (DOT)', 'https://www.transportation.gov'),
  ('b0000002-0000-0000-0000-000000000016', 'US', 'United Airlines', NULL, 'https://www.united.com/en/us/contact', 'Department of Transportation (DOT)', 'https://www.transportation.gov'),
  ('b0000002-0000-0000-0000-000000000017', 'US', 'American Airlines', NULL, 'https://www.aa.com/contact/forms/customer/complaint', 'Department of Transportation (DOT)', 'https://www.transportation.gov'),
  ('b0000002-0000-0000-0000-000000000018', 'US', 'Southwest Airlines', NULL, 'https://www.southwest.com/contact-us/', 'Department of Transportation (DOT)', 'https://www.transportation.gov'),
  -- utilities
  ('b0000002-0000-0000-0000-000000000019', 'US', 'Duke Energy', NULL, 'https://www.duke-energy.com/home/products/contact-us', 'State Public Utilities Commission (PUC)', 'https://www.naruc.org'),
  ('b0000002-0000-0000-0000-000000000020', 'US', 'Pacific Gas & Electric (PG&E)', NULL, 'https://www.pge.com/en/account/contact/index.page', 'California Public Utilities Commission (CPUC)', 'https://www.cpuc.ca.gov'),
  -- healthcare
  ('b0000002-0000-0000-0000-000000000021', 'US', 'CVS Health', NULL, 'https://www.cvs.com/contact/contact-us.jsp', 'Food and Drug Administration (FDA)', 'https://www.fda.gov'),
  ('b0000002-0000-0000-0000-000000000022', 'US', 'Walgreens', NULL, 'https://www.walgreens.com/topic/help/customerservice/customerServiceMain.jsp', 'Food and Drug Administration (FDA)', 'https://www.fda.gov'),
  -- technology
  ('b0000002-0000-0000-0000-000000000023', 'US', 'Apple', NULL, 'https://support.apple.com/contact', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000024', 'US', 'Google', NULL, 'https://support.google.com/websearch/contact/general', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000025', 'US', 'Microsoft', NULL, 'https://support.microsoft.com/contactus', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000026', 'US', 'Meta', NULL, 'https://www.facebook.com/help', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  -- retail
  ('b0000002-0000-0000-0000-000000000027', 'US', 'Walmart', NULL, 'https://www.walmart.com/help/contact-us', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000028', 'US', 'Target', NULL, 'https://help.target.com/help/subcategoryarticle?childcat=Contact+Us', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000029', 'US', 'Best Buy', NULL, 'https://www.bestbuy.com/site/customer-service/contact-best-buy/pcmcat144800050011.c', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  -- transportation
  ('b0000002-0000-0000-0000-000000000030', 'US', 'Uber', NULL, 'https://help.uber.com', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000031', 'US', 'Lyft', NULL, 'https://help.lyft.com', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  -- food_beverage
  ('b0000002-0000-0000-0000-000000000032', 'US', 'DoorDash', NULL, 'https://help.doordash.com/consumers/s', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov'),
  ('b0000002-0000-0000-0000-000000000033', 'US', 'Uber Eats', NULL, 'https://help.uber.com/ubereats', 'Federal Trade Commission (FTC)', 'https://www.ftc.gov')
ON CONFLICT (company_id, country_code) DO NOTHING;
