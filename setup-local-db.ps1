# PostgreSQL Local Setup Script for Windows (PowerShell)
# This script assumes PostgreSQL is installed and psql is in PATH

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Nostromo Guardian - Local DB Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if psql is available
try {
    $psqlVersion = psql --version 2>$null
    Write-Host "✓ PostgreSQL found: $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: PostgreSQL is not installed or psql is not in PATH" -ForegroundColor Red
    Write-Host "Please install PostgreSQL from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 1: Creating database..." -ForegroundColor Yellow
$psqlOutput = psql -U postgres -c "CREATE DATABASE nostromo_guardian;" 2>&1
if ($LASTEXITCODE -eq 0 -or $psqlOutput -match "already exists") {
    Write-Host "✓ Database ready" -ForegroundColor Green
} else {
    Write-Host "ERROR: $psqlOutput" -ForegroundColor Red
}

Write-Host ""
Write-Host "Step 2: Creating admin user..." -ForegroundColor Yellow
$psqlOutput = psql -U postgres -d nostromo_guardian -c "CREATE ROLE admin WITH LOGIN PASSWORD 'password';" 2>&1
if ($LASTEXITCODE -eq 0 -or $psqlOutput -match "already exists") {
    Write-Host "✓ Admin user ready" -ForegroundColor Green
} else {
    Write-Host "ℹ User may already exist" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Step 3: Granting privileges..." -ForegroundColor Yellow
psql -U postgres -d nostromo_guardian -c "GRANT ALL PRIVILEGES ON DATABASE nostromo_guardian TO admin;" 2>$null
psql -U postgres -d nostromo_guardian -c "GRANT ALL PRIVILEGES ON SCHEMA public TO admin;" 2>$null
psql -U postgres -d nostromo_guardian -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;" 2>$null
psql -U postgres -d nostromo_guardian -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;" 2>$null
Write-Host "✓ Privileges granted" -ForegroundColor Green

Write-Host ""
Write-Host "Step 4: Creating tables..." -ForegroundColor Yellow
$initPath = "$PSScriptRoot\init-db.sql"
if (Test-Path $initPath) {
    $psqlOutput = psql -U admin -d nostromo_guardian -f $initPath 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Tables created successfully" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Failed to create tables" -ForegroundColor Red
        Write-Host $psqlOutput -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ERROR: init-db.sql not found at $initPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database: nostromo_guardian" -ForegroundColor Green
Write-Host "User: admin" -ForegroundColor Green
Write-Host "Password: password" -ForegroundColor Green
Write-Host "Host: localhost" -ForegroundColor Green
Write-Host "Port: 5432" -ForegroundColor Green
Write-Host ""
Write-Host "You can now start the backend with: npm run dev" -ForegroundColor Yellow
