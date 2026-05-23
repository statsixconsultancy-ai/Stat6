-- ================================================
-- STAT6 PLATFORM — SUPABASE DATABASE SCHEMA
-- ================================================
-- Run this in your Supabase SQL Editor to set up
-- the complete database structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------
-- ENQUIRIES TABLE
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  institution TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('undergraduate', 'postgraduate', 'phd', 'faculty', 'researcher', 'clinician', 'other')),
  service_category TEXT NOT NULL,
  specific_service TEXT,
  research_area TEXT,
  message TEXT NOT NULL,
  timeline TEXT NOT NULL CHECK (timeline IN ('urgent', '1-2weeks', '1month', 'flexible')),
  hear_about_us TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'proposal_sent', 'in_progress', 'completed', 'closed')),
  assigned_to TEXT,
  notes TEXT,
  source_ip TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_service_category ON enquiries(service_category);

-- ------------------------------------------------
-- BLOG POSTS TABLE (for CMS integration)
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Stat6 Research Team',
  author_role TEXT,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  reading_time INTEGER,
  view_count INTEGER NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);

-- ------------------------------------------------
-- NEWSLETTER SUBSCRIBERS TABLE
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);

-- ------------------------------------------------
-- ADMIN USERS TABLE (for dashboard access)
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('superadmin', 'admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------
-- AUTO-UPDATE updated_at TRIGGER
-- ------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------

-- Enquiries: only authenticated admin users can read/update
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for everyone" ON enquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select for admin" ON enquiries
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

CREATE POLICY "Allow update for admin" ON enquiries
  FOR UPDATE USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Blog: published posts readable by everyone
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow select published posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Allow all for admin" ON blog_posts
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Newsletter: insert for everyone
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin select newsletter" ON newsletter_subscribers
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- ------------------------------------------------
-- ANALYTICS VIEW (for admin dashboard)
-- ------------------------------------------------
CREATE OR REPLACE VIEW enquiry_analytics AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS total_enquiries,
  COUNT(CASE WHEN status = 'new' THEN 1 END) AS new_enquiries,
  COUNT(CASE WHEN status = 'in_progress' THEN 1 END) AS in_progress,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed,
  service_category,
  COUNT(*) FILTER (WHERE timeline = 'urgent') AS urgent_count
FROM enquiries
GROUP BY day, service_category
ORDER BY day DESC;

-- ------------------------------------------------
-- SAMPLE DATA (for testing — remove in production)
-- ------------------------------------------------
/*
INSERT INTO enquiries (first_name, last_name, email, institution, role, service_category, message, timeline, status)
VALUES
  ('Priya', 'Sharma', 'priya@aiims.edu', 'AIIMS New Delhi', 'phd', 'statistical-analysis', 'I need help with SPSS analysis for my clinical trial data.', '1-2weeks', 'new'),
  ('Rahul', 'Menon', 'rahul@iitb.ac.in', 'IIT Bombay', 'postgraduate', 'bioinformatics', 'RNA-Seq analysis for differential expression.', '1month', 'contacted');
*/
