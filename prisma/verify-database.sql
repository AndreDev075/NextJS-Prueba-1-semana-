-- Script para verificar el estado de la base de datos
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Verificar si las tablas existen
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. Contar registros en cada tabla
SELECT 'User' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Course', COUNT(*) FROM "Course"
UNION ALL
SELECT 'UserProgress', COUNT(*) FROM "UserProgress";

-- 3. Ver los usuarios que existen
SELECT id, email, name, role 
FROM "User" 
ORDER BY role, email;
