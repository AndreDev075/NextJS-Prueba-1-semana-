-- Script SQL para ACTUALIZAR un usuario admin con contraseña válida
-- Ejecuta esto en: Supabase Dashboard → SQL Editor → New Query

-- Primero, eliminamos cualquier admin1 existente
DELETE FROM "User" WHERE email = 'admin1@lms.com';

-- Ahora insertamos con un hash de contraseña fresco
-- Password: password123
-- Hash generado: $2b$12$kmCofQVHWMGO9NTtTkZDDO0XdEpaIBXUD2ll0mUC9knPdxB7z6PQO
INSERT INTO "User" (id, email, name, password, role, "isActive", "createdAt", "updatedAt")
VALUES (
  'admin_001',
  'admin1@lms.com',
  'Admin User',
  '$2b$12$kmCofQVHWMGO9NTtTkZDDO0XdEpaIBXUD2ll0mUC9knPdxB7z6PQO',
  'ADMIN',
  true,
  NOW(),
  NOW()
);

-- Verificar que se creó
SELECT email, name, role FROM "User" WHERE email = 'admin1@lms.com';
