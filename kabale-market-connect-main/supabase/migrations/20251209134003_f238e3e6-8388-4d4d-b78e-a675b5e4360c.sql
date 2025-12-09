
-- First, temporarily disable the foreign key check by making user_id nullable
ALTER TABLE vendors ALTER COLUMN user_id DROP NOT NULL;

-- Insert demo vendors with null user_id (they will be placeholder vendors)
INSERT INTO vendors (id, business_name, description, phone, location, is_verified, user_id)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Kabale Fresh Farms', 'Fresh vegetables and fruits directly from our farms in Kabale hills', '+256 700 123 456', 'Kabale Central Market, Section A', true, null),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Uganda Groceries Store', 'Quality groceries and household essentials at affordable prices', '+256 700 234 567', 'Kabale Central Market, Section B', true, null),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Kampala Fashion Hub', 'Traditional and modern African fashion for all occasions', '+256 700 345 678', 'Kabale Central Market, Section C', true, null),
  ('d4e5f6a7-b8c9-0123-def0-234567890123', 'Home Essentials Uganda', 'Everything you need for your home - cookware, utensils, and more', '+256 700 456 789', 'Kabale Central Market, Section D', true, null)
ON CONFLICT (id) DO NOTHING;

-- Insert sample products for Fresh Produce
INSERT INTO products (name, description, price, original_price, stock, images, is_active, category_id, vendor_id)
VALUES 
  ('Fresh Organic Tomatoes', 'Locally grown organic tomatoes from Kabale farms. Perfect for salads and cooking.', 5000, 6000, 100, ARRAY['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'], true, 'c3aab3f1-84c2-4b77-b84d-08f2ce7557c7', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('Fresh Bananas (Bunch)', 'Sweet and ripe bananas, harvested fresh from local farms.', 3000, null, 150, ARRAY['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'], true, 'c3aab3f1-84c2-4b77-b84d-08f2ce7557c7', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('Fresh Avocados (5 pack)', 'Creamy and nutritious avocados from the highlands.', 7500, 9000, 80, ARRAY['https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400'], true, 'c3aab3f1-84c2-4b77-b84d-08f2ce7557c7', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('Green Cabbages (Large)', 'Fresh, crunchy cabbages perfect for salads and cooking.', 4000, null, 120, ARRAY['https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400'], true, 'c3aab3f1-84c2-4b77-b84d-08f2ce7557c7', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('Fresh Onions (1kg)', 'Quality red onions for your kitchen needs.', 3500, 4000, 200, ARRAY['https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400'], true, 'c3aab3f1-84c2-4b77-b84d-08f2ce7557c7', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('Fresh Irish Potatoes (5kg)', 'Premium Irish potatoes from Kabale highlands.', 15000, 18000, 90, ARRAY['https://images.unsplash.com/photo-1518977676601-b9f82d120186?w=400'], true, 'c3aab3f1-84c2-4b77-b84d-08f2ce7557c7', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');

-- Insert sample products for Groceries
INSERT INTO products (name, description, price, original_price, stock, images, is_active, category_id, vendor_id)
VALUES 
  ('Premium Rice (5kg)', 'High quality long grain rice, perfect for everyday meals.', 25000, 28000, 50, ARRAY['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'], true, 'cd7a01cf-6d05-4ba5-a9f7-76b7587755f6', 'b2c3d4e5-f6a7-8901-bcde-f12345678901'),
  ('Cooking Oil (5L)', 'Pure vegetable cooking oil for all your cooking needs.', 35000, 40000, 40, ARRAY['https://images.unsplash.com/photo-1474979266404-7eaacdc2d158?w=400'], true, 'cd7a01cf-6d05-4ba5-a9f7-76b7587755f6', 'b2c3d4e5-f6a7-8901-bcde-f12345678901'),
  ('Sugar (2kg)', 'Premium refined white sugar.', 12000, null, 100, ARRAY['https://images.unsplash.com/photo-1581268398086-79cf658ef94d?w=400'], true, 'cd7a01cf-6d05-4ba5-a9f7-76b7587755f6', 'b2c3d4e5-f6a7-8901-bcde-f12345678901'),
  ('Wheat Flour (2kg)', 'Fine wheat flour for baking and cooking.', 10000, 12000, 80, ARRAY['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'], true, 'cd7a01cf-6d05-4ba5-a9f7-76b7587755f6', 'b2c3d4e5-f6a7-8901-bcde-f12345678901'),
  ('Tea Leaves (500g)', 'Premium Ugandan tea leaves for a perfect cup.', 8000, null, 120, ARRAY['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400'], true, 'cd7a01cf-6d05-4ba5-a9f7-76b7587755f6', 'b2c3d4e5-f6a7-8901-bcde-f12345678901');

-- Insert sample products for Clothing
INSERT INTO products (name, description, price, original_price, stock, images, is_active, category_id, vendor_id)
VALUES 
  ('African Print Dress', 'Beautiful African print dress, perfect for any occasion.', 85000, 100000, 25, ARRAY['https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400'], true, 'ee2e754a-1254-474c-9639-13aea0037a6f', 'c3d4e5f6-a7b8-9012-cdef-123456789012'),
  ('Kitenge Shirt (Men)', 'Stylish African kitenge shirt for men.', 65000, 75000, 30, ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400'], true, 'ee2e754a-1254-474c-9639-13aea0037a6f', 'c3d4e5f6-a7b8-9012-cdef-123456789012'),
  ('Traditional Gomesi', 'Elegant traditional Ugandan Gomesi for special occasions.', 150000, 180000, 15, ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400'], true, 'ee2e754a-1254-474c-9639-13aea0037a6f', 'c3d4e5f6-a7b8-9012-cdef-123456789012'),
  ('African Beaded Jewelry Set', 'Handcrafted African beaded necklace and earrings set.', 45000, 55000, 40, ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'], true, 'ee2e754a-1254-474c-9639-13aea0037a6f', 'c3d4e5f6-a7b8-9012-cdef-123456789012');

-- Insert sample products for Household Items
INSERT INTO products (name, description, price, original_price, stock, images, is_active, category_id, vendor_id)
VALUES 
  ('Cooking Pot Set (3 pieces)', 'Durable aluminum cooking pot set in three sizes.', 75000, 90000, 20, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'], true, 'fea39a62-6741-4116-93d6-42cfb0609910', 'd4e5f6a7-b8c9-0123-def0-234567890123'),
  ('Kitchen Utensils Set', 'Complete set of essential kitchen utensils.', 35000, 42000, 35, ARRAY['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400'], true, 'fea39a62-6741-4116-93d6-42cfb0609910', 'd4e5f6a7-b8c9-0123-def0-234567890123'),
  ('Water Jerry Can (20L)', 'Heavy duty water storage jerry can.', 15000, null, 50, ARRAY['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'], true, 'fea39a62-6741-4116-93d6-42cfb0609910', 'd4e5f6a7-b8c9-0123-def0-234567890123'),
  ('Charcoal Stove (Sigiri)', 'Traditional Ugandan charcoal stove for cooking.', 25000, 30000, 45, ARRAY['https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'], true, 'fea39a62-6741-4116-93d6-42cfb0609910', 'd4e5f6a7-b8c9-0123-def0-234567890123'),
  ('Plastic Basin (Large)', 'Multipurpose plastic basin for washing and storage.', 12000, null, 60, ARRAY['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400'], true, 'fea39a62-6741-4116-93d6-42cfb0609910', 'd4e5f6a7-b8c9-0123-def0-234567890123');

-- Insert sample products for Farm Inputs
INSERT INTO products (name, description, price, original_price, stock, images, is_active, category_id, vendor_id)
VALUES 
  ('Organic Fertilizer (50kg)', 'Premium organic fertilizer for healthy crop growth.', 85000, 95000, 30, ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'], true, 'afa28721-847f-4de9-be7c-d3cb8dace5e2', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('Vegetable Seeds Pack', 'Assorted vegetable seeds for your garden.', 15000, 18000, 100, ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'], true, 'afa28721-847f-4de9-be7c-d3cb8dace5e2', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('Garden Hoe', 'Durable iron garden hoe for farming.', 25000, null, 40, ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'], true, 'afa28721-847f-4de9-be7c-d3cb8dace5e2', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');

-- Insert sample products for Tools & Hardware
INSERT INTO products (name, description, price, original_price, stock, images, is_active, category_id, vendor_id)
VALUES 
  ('Hammer (Steel)', 'Heavy duty steel hammer for construction work.', 18000, 22000, 25, ARRAY['https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400'], true, '86754269-4e70-4d3c-a16c-5b1c316f345a', 'd4e5f6a7-b8c9-0123-def0-234567890123'),
  ('Screwdriver Set', 'Complete set of screwdrivers in various sizes.', 35000, 40000, 30, ARRAY['https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400'], true, '86754269-4e70-4d3c-a16c-5b1c316f345a', 'd4e5f6a7-b8c9-0123-def0-234567890123'),
  ('Padlock (Heavy Duty)', 'Secure heavy duty padlock for your property.', 25000, 30000, 50, ARRAY['https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400'], true, '86754269-4e70-4d3c-a16c-5b1c316f345a', 'd4e5f6a7-b8c9-0123-def0-234567890123');

-- Update vendor RLS to allow viewing vendors with null user_id
DROP POLICY IF EXISTS "Anyone can view vendors" ON vendors;
CREATE POLICY "Anyone can view vendors" ON vendors FOR SELECT USING (true);

-- Update products RLS to allow viewing all active products from demo vendors
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
