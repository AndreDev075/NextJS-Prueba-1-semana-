-- Script SQL para HASHEAR todas las contraseñas de usuarios
-- Ejecuta esto en: Supabase Dashboard → SQL Editor → New Query

-- Usuario: andres3@lms.com (ADMIN)
-- Password: andresmon33
-- Hash: $2b$10$kb2XNCnHYNj.L1TV1WGNF.qjMS5GJQeB08.LDP3GNqmRnZHto0BIW
UPDATE "User" 
SET password = '$2b$10$kb2XNCnHYNj.L1TV1WGNF.qjMS5GJQeB08.LDP3GNqmRnZHto0BIW',
    "updatedAt" = NOW()
WHERE email = 'andres3@lms.com';

-- Usuario: admin1@lms.com (ADMIN)
-- Password: password123
-- Hash: $2b$10$2bd26Vf.hSd1GdaA96wYYu5KcybEDVI/yNQZyiq6/l4ckrkiqw6I2
UPDATE "User" 
SET password = '$2b$10$2bd26Vf.hSd1GdaA96wYYu5KcybEDVI/yNQZyiq6/l4ckrkiqw6I2',
    "updatedAt" = NOW()
WHERE email = 'admin1@lms.com';

-- Verificar que se actualizaron correctamente
SELECT 
    email, 
    name, 
    role, 
    LEFT(password, 30) as password_hash_preview,
    "updatedAt"
FROM "User" 
WHERE email IN ('andres3@lms.com', 'admin1@lms.com')
ORDER BY email;
