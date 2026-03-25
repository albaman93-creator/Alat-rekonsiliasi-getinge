@echo off
cd /d "C:\Users\admin\Documents\project codingan\HTML\data mentah"
echo.
echo === GIT PUSH - Alat Hitung Steril Getinge ===
echo.
git status --short
echo.
echo Menambahkan semua perubahan...
git add .
echo.
git commit -m "update: panduan kolom terbaru + OCR parser v3 kalibrasi print-out Getinge"
echo.
echo Push ke GitHub...
git push origin main
echo.
echo === SELESAI ===
echo Cek: https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge
echo.
pause
