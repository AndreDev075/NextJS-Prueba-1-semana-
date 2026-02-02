-- Script para poblar la base de datos con datos iniciales
-- Ejecuta este script en el SQL Editor de Supabase
-- Contraseña para todos los usuarios: password123
-- Hash bcrypt de 'password123' con salt rounds 12

-- Primero, eliminar datos existentes si los hay (opcional)
-- TRUNCATE TABLE "UserProgress", "Course", "User" CASCADE;

-- Insertar Super Admin
INSERT INTO "User" (id, email, name, role, password, "isActive", "createdAt", "updatedAt")
VALUES (
  'super_admin_001',
  'super@lms.com',
  'Super Admin',
  'SUPER_ADMIN',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insertar Admins
INSERT INTO "User" (id, email, name, role, password, "isActive", "createdAt", "updatedAt")
VALUES 
  ('admin_001', 'admin1@lms.com', 'Admin admin1', 'ADMIN', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('admin_002', 'admin2@lms.com', 'Admin admin2', 'ADMIN', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insertar Instructores
INSERT INTO "User" (id, email, name, role, password, "isActive", "createdAt", "updatedAt")
VALUES 
  ('inst_001', 'inst1@lms.com', 'Instructor inst1', 'INSTRUCTOR', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('inst_002', 'inst2@lms.com', 'Instructor inst2', 'INSTRUCTOR', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('inst_003', 'inst3@lms.com', 'Instructor inst3', 'INSTRUCTOR', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insertar Estudiantes
INSERT INTO "User" (id, email, name, role, password, "isActive", "createdAt", "updatedAt")
VALUES 
  ('student_001', 'student1@lms.com', 'Student 1', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_002', 'student2@lms.com', 'Student 2', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_003', 'student3@lms.com', 'Student 3', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_004', 'student4@lms.com', 'Student 4', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_005', 'student5@lms.com', 'Student 5', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_006', 'student6@lms.com', 'Student 6', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_007', 'student7@lms.com', 'Student 7', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_008', 'student8@lms.com', 'Student 8', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_009', 'student9@lms.com', 'Student 9', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW()),
  ('student_010', 'student10@lms.com', 'Student 10', 'STUDENT', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insertar Cursos (sin ON CONFLICT porque no hay constraint único en title)
INSERT INTO "Course" (id, title, "shortDescription", description, level, status, "createdById", "createdAt", "updatedAt")
SELECT * FROM (VALUES 
  ('course_001', 'Intro to Programming', 'Learn Intro to Programming in this comprehensive course.', 'Full description for Intro to Programming. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'BEGINNER', 'PUBLISHED', 'inst_001', NOW(), NOW()),
  ('course_002', 'Advanced React Patterns', 'Learn Advanced React Patterns in this comprehensive course.', 'Full description for Advanced React Patterns. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'ADVANCED', 'PUBLISHED', 'inst_002', NOW(), NOW()),
  ('course_003', 'Next.js for Beginners', 'Learn Next.js for Beginners in this comprehensive course.', 'Full description for Next.js for Beginners. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'BEGINNER', 'PUBLISHED', 'inst_003', NOW(), NOW()),
  ('course_004', 'Mastering TypeScript', 'Learn Mastering TypeScript in this comprehensive course.', 'Full description for Mastering TypeScript. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'INTERMEDIATE', 'PUBLISHED', 'inst_001', NOW(), NOW()),
  ('course_005', 'Database Design 101', 'Learn Database Design 101 in this comprehensive course.', 'Full description for Database Design 101. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'BEGINNER', 'ARCHIVED', 'inst_002', NOW(), NOW()),
  ('course_006', 'Kubernetes Deep Dive', 'Learn Kubernetes Deep Dive in this comprehensive course.', 'Full description for Kubernetes Deep Dive. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'ADVANCED', 'DRAFT', 'inst_003', NOW(), NOW()),
  ('course_007', 'CSS Grid & Flexbox', 'Learn CSS Grid & Flexbox in this comprehensive course.', 'Full description for CSS Grid & Flexbox. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'BEGINNER', 'PUBLISHED', 'inst_001', NOW(), NOW()),
  ('course_008', 'UI/UX Principles', 'Learn UI/UX Principles in this comprehensive course.', 'Full description for UI/UX Principles. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'INTERMEDIATE', 'PUBLISHED', 'inst_002', NOW(), NOW()),
  ('course_009', 'Node.js Microservices', 'Learn Node.js Microservices in this comprehensive course.', 'Full description for Node.js Microservices. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'ADVANCED', 'PUBLISHED', 'inst_003', NOW(), NOW()),
  ('course_010', 'Python for Data Science', 'Learn Python for Data Science in this comprehensive course.', 'Full description for Python for Data Science. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'INTERMEDIATE', 'PUBLISHED', 'inst_001', NOW(), NOW()),
  ('course_011', 'Machine Learning Basics', 'Learn Machine Learning Basics in this comprehensive course.', 'Full description for Machine Learning Basics. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'ADVANCED', 'DRAFT', 'inst_002', NOW(), NOW()),
  ('course_012', 'Cybersecurity Fundamentals', 'Learn Cybersecurity Fundamentals in this comprehensive course.', 'Full description for Cybersecurity Fundamentals. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'BEGINNER', 'PUBLISHED', 'inst_003', NOW(), NOW()),
  ('course_013', 'Agile Methodologies', 'Learn Agile Methodologies in this comprehensive course.', 'Full description for Agile Methodologies. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'BEGINNER', 'ARCHIVED', 'inst_001', NOW(), NOW()),
  ('course_014', 'DevOps Pipelines', 'Learn DevOps Pipelines in this comprehensive course.', 'Full description for DevOps Pipelines. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'INTERMEDIATE', 'PUBLISHED', 'inst_002', NOW(), NOW()),
  ('course_015', 'Mobile App Dev with React Native', 'Learn Mobile App Dev with React Native in this comprehensive course.', 'Full description for Mobile App Dev with React Native. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'INTERMEDIATE', 'PUBLISHED', 'inst_003', NOW(), NOW())
) AS v(id, title, "shortDescription", description, level, status, "createdById", "createdAt", "updatedAt")
WHERE NOT EXISTS (
  SELECT 1 FROM "Course" WHERE "Course".id = v.id
);
