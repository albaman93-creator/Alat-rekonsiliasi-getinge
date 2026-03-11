# ⚡ QUICK START GUIDE
## Alat Hitung Waktu Steril Getinge - Panduan Cepat

---

## 🎯 3 CARA MENGGUNAKAN APLIKASI

### 📷 CARA 1: SCAN FOTO/PDF (Paling Cepat)

```
1. Buka aplikasi → Klik "📷 Scan Gambar / PDF"
2. Upload foto printout mesin Getinge (JPG/PNG) atau PDF
3. Tunggu OCR membaca... (3-5 detik)
4. Tabel hasil muncul → Review nilai yang terdeteksi ✓
5. Klik "⚡ ISI FORM OTOMATIS"
6. Klik "HITUNG" → Hasil muncul
```

**Waktu**: 30-45 detik  
**Akurasi**: 80-95% (tergantung kualitas foto)

---

### 📱 CARA 2: GOOGLE LENS + PASTE (Akurasi Terbaik)

```
1. Klik "📱 Buka Google Lens"
2. Ambil foto dengan aplikasi Google Lens
3. Copy teks hasil OCR
4. Tempel di textarea aplikasi
5. Klik "🔍 Proses Teks"
6. Klik "HITUNG" → Hasil muncul
```

**Waktu**: 1-2 menit  
**Akurasi**: 95%+ (Google AI)  
**Cocok untuk**: Foto ponsel berkualitas rendah

---

### ✍️ CARA 3: INPUT MANUAL (Paling Andal)

```
1. Klik "✍️ Input Manual"
2. Isi 10 field form:
   • Start Jam: 00:23:49 (auto-format)
   • Total Durasi: 00:45:30
   • Mulai Steril: 00:25:10
   • Selesai Steril: 00:28:45
   • Mulai Cooling: 00:29:00
   • Selesai Cooling: 00:37:15
   • Suhu A102: 121.5
   • Suhu A125: 122.1
   • Tekanan A106: 2.950
   • Tekanan A129: 3.100
3. Klik "⚡ HITUNG"
4. Hasil muncul
```

**Waktu**: 2-3 menit  
**Akurasi**: 100% (sesuai input manual)  
**Cocok untuk**: Operator ekspermen / hafal data

---

## 📊 CARA MEMBACA HASIL

```
┌─────────────────────────────────────────┐
│      HASIL PERHITUNGAN                  │
├──────────────────────┬──────────────────┤
│ Total Waktu Proses   │ 00:37:15         │
│ Heat-Up Duration     │ 25 menit         │
│ Durasi Sterilisasi   │ 3 menit 35 detik │
│ Durasi Cooling       │ 8 menit 15 detik │
│                      │                  │ │
│ Selisih Tekanan      │ 0.150 bar ✓ OK   │
└──────────────────────┴──────────────────┘

✓ OK (Hijau)    = Normal, tidak ada masalah
⚠ WARNING (Org) = Perlu perhatian, tapi acceptable  
🔴 KRITIS (Merah) = Ada masalah, perlu investigasi
```

---

## 🎨 TEMA APLIKASI

| Tema | Cocok Untuk | Cara Pilih |
|------|------------|-----------|
| ☀️ WHITE | Siang, terang | Klik tema toggle |
| ✨ GOLD | Presentasi, formal | Klik tema toggle 2x |
| 🌙 DARK | Malam, hemat baterai | Klik tema toggle 3x |

---

## 🚨 PERINGATAN & AKSI

### Jika Suhu (Sensor A102 vs A125) Berbeda

| Selisih | Status | Aksi |
|---------|--------|------|
| < 0.3°C | ✓ OK | Lanjutkan proses normal |
| 0.3-0.8°C | ⚠ WARNING | Catat & monitor, lanjut observasi |
| ≥ 0.8°C | 🔴 KRITIS | **STOP** - Sensor mungkin rusak, service mesin |

### Jika Tekanan (Sensor A106 vs A129) Berbeda

| Selisih | Status | Aksi |
|---------|--------|------|
| < 0.4 bar | ✓ OK | Normal, OK |
| ≥ 0.4 bar | 🔴 KRITIS | Pressure imbalance - maintenance needed |

---

## 💾 SAVE & SHARE HASIL

**Screenshot**:
- Windows: `Print Screen` → Paste di Paint/Word
- Mac: `Cmd+Shift+3`
- Mobile: Press power + volume down

**Print**:
- Ctrl+P (Windows) atau Cmd+P (Mac)
- Pilih "Save as PDF" untuk dokumentasi

**Share**:
- Copy hasil → Paste ke WhatsApp/Email
- Atau screenshot → kirim foto

---

## 🔧 TROUBLESHOOTING CEPAT

| Error | Solusi |
|-------|--------|
| Tombol tidak responsif | Refresh halaman (F5) |
| OCR tidak akurat | Gunakan foto lebih terang & jelas, atau Google Lens |
| Form tidak auto-fill | Cek file upload valid (JPG/PNG/PDF) |
| Hasil perhitungan salah | Double-check format waktu (HH:MM:SS) |
| Aplikasi lambat | Clear browser cache (Ctrl+Shift+Del) |

---

## 📱 INSTALL SEBAGAI APP (Rekomendasi)

### Android:
1. Buka aplikasi di Chrome
2. Tap ⋮ (menu) → "Install app"
3. Tap "Install"
4. App muncul di home screen (offline-ready!)

### iPhone:
1. Buka di Safari
2. Tap ↗ (share) → "Add to Home Screen"
3. Nama app → "Add"
4. App siap digunakan

**Keuntungan**: Lebih cepat dibuka, bisa pakai offline, tidak perlu ketik URL

---

## ⏱️ WAKTU PROCESSING

| Aktivitas | Waktu |
|-----------|-------|
| Upload 1 foto + OCR + extract | 5-10 detik |
| Upload 3 foto sekaligus | 15-20 detik |
| Google Lens capture + paste | 1-2 menit |
| Input manual 10 field | 2-3 menit |
| Click "HITUNG" & results | 1 detik |

**Total**: Dari foto ke hasil = **30 detik - 3 menit**

---

## 📝 CHECKLIST SEBELUM HITUNG

- [ ] Semua 10 field sudah terisi
- [ ] Format waktu benar: HH:MM:SS (contoh: 00:23:49)
- [ ] Suhu format: XXX.X (contoh: 121.5)
- [ ] Tekanan format: X.XXX (contoh: 2.950)
- [ ] Tidak ada field highlight warna merah (out of range)
- [ ] Warning banner tidak tampil

→ Jika semua ✓ lanjut klik "HITUNG"

---

## 🎓 TEKNIS INFO

- **Ukuran file upload max**: 15 MB per file
- **Format support**: JPG, PNG, PDF
- **Browser min requirement**: Chrome 60+, Firefox 55+, Safari 12+
- **Device support**: Desktop, Tablet, Mobile
- **Offline mode**: Ya (setelah install PWA)
- **Internet needed**: Hanya saat first load atau OCR API

---

## 📞 HELP

- **Offline tidak bekerja**: Pastikan sudah install PWA
- **Photo OCR tidak akurat**: Gunakan foto berkualitas tinggi atau Google Lens
- **Port error**: Server sudah berjalan / port 3000 ada aplikasi lain

---

**Semoga aplikasi ini memudahkan pekerjaan Anda! 🎉**
