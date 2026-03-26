# ================================================
# AUTO GIT PUSH — Alat Hitung Steril Getinge
# Klik kanan → "Run with PowerShell"
# ================================================

$projectPath = "C:\Users\admin\Documents\project codingan\HTML\data mentah"
Set-Location $projectPath

Write-Host "📁 Folder: $projectPath" -ForegroundColor Cyan
Write-Host ""

# Status
Write-Host "📋 Git Status:" -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "➕ Menambahkan semua perubahan..." -ForegroundColor Yellow
git add .

# Commit message dengan timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "update: panduan kolom terbaru + OCR parser v4 kalibrasi print-out Getinge ($timestamp)"

Write-Host "💾 Commit: $commitMsg" -ForegroundColor Yellow
git commit -m $commitMsg

Write-Host ""
Write-Host "🚀 Push ke GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ SELESAI! Cek di: https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge" -ForegroundColor Green
Write-Host ""
pause
