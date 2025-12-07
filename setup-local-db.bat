@echo off
REM PostgreSQL Local Setup Script for Windows
REM This script assumes PostgreSQL is installed and psql is in PATH

echo ========================================
echo Nostromo Guardian - Local DB Setup
echo ========================================
echo.

REM Check if psql is available
where psql >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: PostgreSQL is not installed or psql is not in PATH
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    exit /b 1
)

echo Step 1: Creating database...
psql -U postgres -c "CREATE DATABASE nostromo_guardian;" 2>nul
if %ERRORLEVEL% equ 0 (
    echo ✓ Database created successfully
) else (
    echo ℹ Database may already exist
)

echo.
echo Step 2: Creating admin user...
psql -U postgres -d nostromo_guardian -c "CREATE ROLE admin WITH LOGIN PASSWORD 'password';" 2>nul
if %ERRORLEVEL% equ 0 (
    echo ✓ Admin user created successfully
) else (
    echo ℹ Admin user may already exist
)

echo.
echo Step 3: Granting privileges...
psql -U postgres -d nostromo_guardian -c "GRANT ALL PRIVILEGES ON DATABASE nostromo_guardian TO admin;"
psql -U postgres -d nostromo_guardian -c "GRANT ALL PRIVILEGES ON SCHEMA public TO admin;"
psql -U postgres -d nostromo_guardian -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;"
psql -U postgres -d nostromo_guardian -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;"
echo ✓ Privileges granted

echo.
echo Step 4: Creating tables...
psql -U admin -d nostromo_guardian -f init-db.sql
if %ERRORLEVEL% equ 0 (
    echo ✓ Tables created successfully
) else (
    echo ERROR: Failed to create tables
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Database: nostromo_guardian
echo User: admin
echo Password: password
echo Host: localhost
echo Port: 5432
echo.
echo You can now start the backend with: npm run dev
