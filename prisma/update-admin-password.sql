-- Script SQL para ACTUALIZAR la contraseña del usuario admin
-- Ejecuta esto en: Supabase Dashboard → SQL Editor → New Query
-- Password: password123
-- Hash generado con bcryptjs (compatible con auth.ts): $2b$10$2bd26Vf.hSd1GdaA96wYYu5KcybEDVI/yNQZyiq6/l4ckrkiqw6I2

UPDATE "User" 
SET password = '$2b$10$2bd26Vf.hSd1GdaA96wYYu5KcybEDVI/yNQZyiq6/l4ckrkiqw6I2',
    "updatedAt" = NOW()
WHERE email = 'admin1@lms.com';

-- Verificar que se actualizó
SELECT email, name, role, LEFT(password, 20) as password_preview 
FROM "User" 
WHERE email = 'admin1@lms.com';
