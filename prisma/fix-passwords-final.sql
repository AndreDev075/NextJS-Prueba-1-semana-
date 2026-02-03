-- ⚠️ EJECUTA ESTE SCRIPT EN SUPABASE SQL EDITOR
-- Las contraseñas actuales en la DB están corruptas o son incorrectas
-- Este script las reemplaza con hashes válidos generados con bcryptjs

-- Usuario: admin1@lms.com
-- Password: password123
-- Nuevo Hash: $2b$10$yhLblu1/b7UH9uS5.UI6puZhZjyPFE4rH7hMmWXyv1910svMLtYR.
UPDATE "User" 
SET password = '$2b$10$yhLblu1/b7UH9uS5.UI6puZhZjyPFE4rH7hMmWXyv1910svMLtYR.',
    "updatedAt" = NOW()
WHERE email = 'admin1@lms.com';

-- Usuario: andres3@lms.com
-- Password: andresmon33
-- Nuevo Hash: $2b$10$kb2XNCnHYNj.L1TV1WGNF.qjMS5GJQeB08.LDP3GNqmRnZHto0BIW
UPDATE "User" 
SET password = '$2b$10$kb2XNCnHYNj.L1TV1WGNF.qjMS5GJQeB08.LDP3GNqmRnZHto0BIW',
    "updatedAt" = NOW()
WHERE email = 'andres3@lms.com';

-- Verificar actualización
SELECT 
    email, 
    name, 
    role, 
    LEFT(password, 35) as password_hash,
    "updatedAt"
FROM "User" 
WHERE email IN ('admin1@lms.com', 'andres3@lms.com')
ORDER BY email;
