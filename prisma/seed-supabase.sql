-- Script SQL para poblar la base de datos de Supabase con datos de prueba
-- Ejecuta esto en: Supabase Dashboard → SQL Editor → New Query
-- DESPUÉS de haber ejecutado setup-supabase.sql

-- Insertar Usuarios (password para todos: "password123")
-- Hash bcrypt de "password123": $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy

-- 1. Super Admin
INSERT INTO "User" (id, email, name, password, role, "isActive", "createdAt", "updatedAt")
VALUES (
  'super_admin_001',
  'super@lms.com',
  'Super Admin',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy',
  'SUPER_ADMIN',
  true,
  NOW(),
  NOW()
);

-- 2. Admins
INSERT INTO "User" (id, email, name, password, role, "isActive", "createdAt", "updatedAt")
VALUES 
  ('admin_001', 'admin1@lms.com', 'Admin 1', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'ADMIN', true, NOW(), NOW()),
  ('admin_002', 'admin2@lms.com', 'Admin 2', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'ADMIN', true, NOW(), NOW());

-- 3. Instructores
INSERT INTO "User" (id, email, name, password, role, "isActive", "createdAt", "updatedAt")
VALUES 
  ('inst_001', 'inst1@lms.com', 'Instructor 1', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'INSTRUCTOR', true, NOW(), NOW()),
  ('inst_002', 'inst2@lms.com', 'Instructor 2', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'INSTRUCTOR', true, NOW(), NOW()),
  ('inst_003', 'inst3@lms.com', 'Instructor 3', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'INSTRUCTOR', true, NOW(), NOW());

-- 4. Estudiantes
INSERT INTO "User" (id, email, name, password, role, "isActive", "createdAt", "updatedAt")
VALUES 
  ('student_001', 'student1@lms.com', 'Student 1', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_002', 'student2@lms.com', 'Student 2', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_003', 'student3@lms.com', 'Student 3', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_004', 'student4@lms.com', 'Student 4', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_005', 'student5@lms.com', 'Student 5', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_006', 'student6@lms.com', 'Student 6', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_007', 'student7@lms.com', 'Student 7', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_008', 'student8@lms.com', 'Student 8', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_009', 'student9@lms.com', 'Student 9', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW()),
  ('student_010', 'student10@lms.com', 'Student 10', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGp8VpYvy', 'STUDENT', true, NOW(), NOW());

-- 5. Cursos
INSERT INTO "Course" (id, title, "shortDescription", description, "videoUrl", level, status, "createdById", "createdAt", "updatedAt")
VALUES 
  ('course_001', 'Intro to Programming', 'Learn Intro to Programming in this comprehensive course.', 'Full description for Intro to Programming. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'BEGINNER', 'PUBLISHED', 'inst_001', NOW(), NOW()),
  ('course_002', 'Advanced React Patterns', 'Learn Advanced React Patterns in this comprehensive course.', 'Full description for Advanced React Patterns. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ADVANCED', 'PUBLISHED', 'inst_002', NOW(), NOW()),
  ('course_003', 'Next.js for Beginners', 'Learn Next.js for Beginners in this comprehensive course.', 'Full description for Next.js for Beginners. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'BEGINNER', 'PUBLISHED', 'inst_003', NOW(), NOW()),
  ('course_004', 'Mastering TypeScript', 'Learn Mastering TypeScript in this comprehensive course.', 'Full description for Mastering TypeScript. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'INTERMEDIATE', 'PUBLISHED', 'inst_001', NOW(), NOW()),
  ('course_005', 'Database Design 101', 'Learn Database Design 101 in this comprehensive course.', 'Full description for Database Design 101. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'BEGINNER', 'ARCHIVED', 'inst_002', NOW(), NOW()),
  ('course_006', 'Kubernetes Deep Dive', 'Learn Kubernetes Deep Dive in this comprehensive course.', 'Full description for Kubernetes Deep Dive. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ADVANCED', 'DRAFT', 'inst_003', NOW(), NOW()),
  ('course_007', 'CSS Grid & Flexbox', 'Learn CSS Grid & Flexbox in this comprehensive course.', 'Full description for CSS Grid & Flexbox. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'BEGINNER', 'PUBLISHED', 'inst_001', NOW(), NOW()),
  ('course_008', 'UI/UX Principles', 'Learn UI/UX Principles in this comprehensive course.', 'Full description for UI/UX Principles. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'INTERMEDIATE', 'PUBLISHED', 'inst_002', NOW(), NOW()),
  ('course_009', 'Node.js Microservices', 'Learn Node.js Microservices in this comprehensive course.', 'Full description for Node.js Microservices. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ADVANCED', 'PUBLISHED', 'inst_003', NOW(), NOW()),
  ('course_010', 'Python for Data Science', 'Learn Python for Data Science in this comprehensive course.', 'Full description for Python for Data Science. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'INTERMEDIATE', 'PUBLISHED', 'inst_001', NOW(), NOW()),
  ('course_011', 'Machine Learning Basics', 'Learn Machine Learning Basics in this comprehensive course.', 'Full description for Machine Learning Basics. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ADVANCED', 'DRAFT', 'inst_002', NOW(), NOW()),
  ('course_012', 'Cybersecurity Fundamentals', 'Learn Cybersecurity Fundamentals in this comprehensive course.', 'Full description for Cybersecurity Fundamentals. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'BEGINNER', 'PUBLISHED', 'inst_003', NOW(), NOW()),
  ('course_013', 'Agile Methodologies', 'Learn Agile Methodologies in this comprehensive course.', 'Full description for Agile Methodologies. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'BEGINNER', 'ARCHIVED', 'inst_001', NOW(), NOW()),
  ('course_014', 'DevOps Pipelines', 'Learn DevOps Pipelines in this comprehensive course.', 'Full description for DevOps Pipelines. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'INTERMEDIATE', 'PUBLISHED', 'inst_002', NOW(), NOW()),
  ('course_015', 'Mobile App Dev with React Native', 'Learn Mobile App Dev with React Native in this comprehensive course.', 'Full description for Mobile App Dev with React Native. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'INTERMEDIATE', 'PUBLISHED', 'inst_003', NOW(), NOW());

-- 6. Progreso de Usuarios (algunos ejemplos)
INSERT INTO "UserProgress" (id, "userId", "courseId", "playbackTime", "isCompleted", "createdAt", "updatedAt")
VALUES 
  ('progress_001', 'student_001', 'course_001', 120.5, false, NOW(), NOW()),
  ('progress_002', 'student_001', 'course_003', 450.0, true, NOW(), NOW()),
  ('progress_003', 'student_002', 'course_001', 80.0, false, NOW(), NOW()),
  ('progress_004', 'student_003', 'course_007', 300.0, false, NOW(), NOW()),
  ('progress_005', 'student_004', 'course_002', 600.0, true, NOW(), NOW());

-- Mensaje de confirmación
SELECT 'Seed completado exitosamente! Usuarios: 16, Cursos: 15, Progreso: 5' AS resultado;
