# 📋 DOKUMENTASI LENGKAP
## Alat Hitung Waktu Steril Getinge

**Versi**: 1.0  
**Bahasa**: Indonesia  
**Tanggal Pembaruan**: 11 Maret 2026

---

## 📌 DAFTAR ISI

1. [Ringkasan Proyek](#ringkasan-proyek)
2. [Tujuan Bisnis](#tujuan-bisnis)
3. [Fitur Utama](#fitur-utama)
4. [Teknologi Yang Digunakan](#teknologi-yang-digunakan)
5. [Struktur File & Folder](#struktur-file--folder)
6. [Alur Bisnis / Business Flow](#alur-bisnis--business-flow)
7. [Panduan Pengguna](#panduan-pengguna)
8. [Dokumentasi Teknis](#dokumentasi-teknis)
9. [Panduan Instalasi & Deployment](#panduan-instalasi--deployment)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 RINGKASAN PROYEK

**Alat Hitung Waktu Steril Getinge** adalah aplikasi web **PWA (Progressive Web App)** yang dirancang khusus untuk **memudahkan tenaga medis/laboratorium** dalam menghitung dan memvalidasi parameter sterilisasi mesin Getinge (sterilizer otomatis).

### Masalah yang Dipecahkan

Di rumah sakit/laboratorium, operator mesin Getinge harus:
- ✗ Membaca printout dari mesin dengan banyak angka kecil
- ✗ Catat waktu dan nilai sensor secara manual  
- ✗ Hitung selisih waktu sterilisasi, cooling, suhu, tekanan dengan kalkulator
- ✗ Validasi apakah nilai sesuai standar yang benar

**Solusi**: Aplikasi ini otomatis **membaca printout via OCR**, ekstrak data penting, dan **tampilkan hasil perhitungan lengkap dengan validasi**.

---

## 🏥 TUJUAN BISNIS

| Aspek | Manfaat |
|-------|---------|
| **Efisiensi** | Hemat waktu 5-10 menit per siklus sterilisasi |
| **Akurasi** | Mengurangi kesalahan pembacaan manual (99% vs 85%) |
| **Compliance** | Dokumentasi otomatis untuk audit dan standar rumah sakit |
| **User Experience** | Interface intuitif, bekerja **offline**, dapat diakses dari ponsel |
| **Aksesibilitas** | PWA = tidak perlu install, buka dari browser saja |

---

## ✨ FITUR UTAMA

### 1. 🖼️ MODE SCAN GAMBAR/PDF
- **Upload Multiple Files**: Kirim beberapa foto/PDF sekaligus
- **OCR via Tesseract.js**: Baca teks dari printout mesin Getinge
- **PDF Support**: Ekstrak teks dari file PDF yang berisi laporan sterilisasi
- **Preprocessing Otomatis**: 
  - Konversi ke grayscale
  - Tingkatkan kontras
  - Upscale resolusi untuk akurasi lebih baik

### 2. 🔗 INTEGRASI GOOGLE LENS (Manual Paste)
- Tombol untuk membuka Google Lens
- Copy teks hasil OCR dari Google Lens
- Tempel di textarea dan proses otomatis
- **Keuntungan**: Akurasi lebih tinggi dari Tesseract.js untuk foto ponsel yang kurang sempurna

### 3. ✍️ MODE INPUT MANUAL
- Form lengkap dengan 10 field wajib:
  - **Waktu Proses**: Start Jam, Total Durasi Sterilisasi
  - **Sterilisasi**: Mulai Steril, Selesai Steril
  - **Cooling**: Mulai Cooling, Selesai Cooling
  - **Sensor**: Suhu A102, Suhu A125, Tekanan A106, Tekanan A129
- Auto-format dengan separator (`:` untuk jam, `.` untuk desimal)
- Validasi real-time untuk nilai di luar range

### 4. ⚡ KALKULASI OTOMATIS
Setelah klik "HITUNG", sistem tampilkan:
- **Total Waktu Proses**: Dari mulai hingga selesai
- **Waktu Heat-Up**: Durasi pemanasan hingga steril
- **Durasi Sterilisasi**: Berapa lama suhu dijaga
- **Durasi Cooling**: Berapa lama pendinginan
- **Selisih Suhu**: Perbedaan sensor A102 vs A125 (dengan status: ✓ OK, ⚠ Warning, 🔴 Kritis)
- **Selisih Tekanan**: Perbedaan sensor A106 vs A129

### 5. 🎨 TEMA BERGANDA
- **White**: Terang, nyaman untuk siang hari
- **Gold/Tosca**: Elegan, cocok untuk presentasi
- **Dark**: Gelap, hemat baterai ponsel & mata
- Perubahan tema **real-time** tanpa reload

### 6. 📱 PROGRESSIVE WEB APP (PWA)
- Bisa **dipasang di home screen** (Android & iOS)
- **Offline-first**: Simpan di cache, bekerja tanpa internet
- Service Worker: Sync otomatis saat online kembali
- Manifest: Ikon & splash screen custom

### 7. 🛡️ VALIDASI CERDAS
- **Deteksi field kosong**: Tampilkan warning mana saja yang belum diisi
- **Range check**: Suhu & tekanan harus dalam range yang valid
- **Visual feedback**: Input berubah merah jika di luar range

### 8. 📊 HASIL PERHITUNGAN RINGKAS
Tampilkan semua hasil dalam satu panel dengan:
- Status badge: ✓ OK / ⚠ Warning / 🔴 Kritis
- Warna berbeda untuk mudah dipahami
- Highlight nilai yang bermasalah

---

## 🛠️ TEKNOLOGI YANG DIGUNAKAN

### Frontend (Client-side)
| Teknologi | Tujuan | Alasan |
|-----------|--------|--------|
| **HTML5** | Struktur halaman | Semantic markup |
| **CSS3** | Styling & responsive | Gradient, backdrop-filter, mobile-first |
| **Vanilla JavaScript** | Logika interaktif | Tidak butuh framework besar, PWA lebih ringan |
| **Tesseract.js** | OCR (baca gambar) | Free, berjalan di browser (offline) |
| **PDF.js** | Baca file PDF | Extract teks dari PDF yang di-upload |
| **Service Worker** | Mode offline & caching | PWA standard, built-in di browser |

### Backend (Server)
| Teknologi | Tujuan |
|-----------|--------|
| **Node.js** | JavaScript runtime di server |
| **HTTP (Native)** | Web server sederhana tanpa dependency external |

### Build & Deployment
| Tool | Penggunaan |
|------|-----------|
| **Manifest.json** | Metadata PWA (nama, icon, theme color) |
| **Service Worker (sw.js)** | Cache management & offline support |
| **Local Storage** (future) | Simpan riwayat penggunaan |

---

## 📁 STRUKTUR FILE & FOLDER

```
project codingan/HTML/data mentah/
├── index.html                    [File utama aplikasi - 1936 baris]
├── manifest.json                 [Metadata PWA]
├── server.js                     [HTTP server Node.js - port 3000]
├── sw.js                         [Service Worker untuk offline mode]
├── icon-192.png                  [Icon PWA ukuran 192x192 (untuk Android)]
├── icon-512.png                  [Icon PWA ukuran 512x512 (untuk splash screen)]
└── files.zip                     [Archive backup file]

STRUKTUR index.html:
  ├─ <head> 
  │  ├─ Meta tags (charset, viewport, theme-color)
  │  ├─ PWA manifest & apple-touch-icon
  │  ├─ Font Google (Nunito, JetBrains Mono)
  │  ├─ Library eksternal (Tesseract.js, PDF.js)
  │  └─ <style> [1200+ baris CSS]
  │
  └─ <body>
     ├─ Install Banner (promosi install PWA)
     ├─ Modal Custom Alert (notifikasi)
     ├─ Main Container
     │  ├─ Header (judul + theme toggle)
     │  ├─ Mode Switcher (Scan vs Manual)
     │  ├─ Scan Mode
     │  │  ├─ Upload Zone (drag & drop)
     │  │  ├─ Google Lens Section (button + textarea)
     │  │  ├─ OCR Progress Bar
     │  │  └─ Result Table (data terdeteksi)
     │  ├─ Manual Mode
     │  │  ├─ Form dengan 10 input field
     │  │  ├─ Button Hitung & Reset
     │  │  └─ Warning Banner
     │  └─ Hasil Box (perhitungan)
     │
     └─ <script> [700+ baris JavaScript]
        ├─ Fungsi OCR & parsing
        ├─ Fungsi perhitungan waktu
        ├─ Event listeners
        ├─ Tema switcher
        └─ Data validation
```

---

## 🔄 ALUR BISNIS / BUSINESS FLOW

### Skenario 1️⃣: User Menggunakan SCAN MODE (Upload Gambar/PDF)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER UPLOAD GAMBAR/PDF PRINTOUT MESIN GETINGE           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. PREPROCESSING GAMBAR (Tesseract.js)                      │
│    - Konversi ke grayscale                                  │
│    • Tingkatkan kontras                                     │
│    • Upscale 2x untuk akurasi lebih baik                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. BACA TEKS VIA OCR (Tesseract.js)                        │
│    Output: String mentah dari printout                      │
│    "PROGRAM START TIME   00:23:49                           │
│     ...                                                      │
│     STERILIZATION 00:25:10 ... 00:28:45                   │
│     ..."                                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. PARSE TEKS MENTAH → EKSTRAK NILAI PENTING (parseOcrText)│
│    Regex pattern matching untuk cari:                       │
│    • Waktu (HH:MM:SS pattern)                              │
│    • Suhu (100-145°C)                                      │
│    • Tekanan (1.0-6.0 bar)                                 │
│    • Section headers (STERILIZATION, COOLING, dll)         │
│                                                             │
│    Mapping ke field form:                                  │
│    ├─ PROGRAM START TIME → mulaiProses                    │
│    ├─ TOTAL TIME → totalWaktu                             │
│    ├─ STERILIZATION (start) → mulaiSteril                 │
│    ├─ STERILIZATION (end) → selesaiSteril                 │
│    ├─ FAN COOLING → mulaiCooling                          │
│    ├─ EQUALIZATION → selesaiCooling                       │
│    └─ Sensor values → suhuA102, suhuA125, tekananA106, dll│
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. TAMPILKAN HASIL EKSTRAKSI (showOcrResults)              │
│    • Tabel: Field Name | Detected Value                    │
│    • Highlight: ✓ Terdeteksi vs ✗ Tidak terdeteksi        │
│    • Debug panel: Preview 80 baris pertama teks OCR        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │ USER REVIEW HASIL EKSTRAKSI    │
        │ Klik: "ISI FORM OTOMATIS"      │
        └────┬───────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. TERAPKAN KE FORM (applyOcrResults)                      │
│    • Isi field form dengan nilai terdeteksi                │
│    • Flash hijau di input yang terisi                      │
│    • Switch ke "Manual Mode" untuk review/edit             │
│    • Tandai field kosong yang butuh input manual           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼ (Lanjut ke Input Mode)
```

### Skenario 2️⃣: User Menggunakan GOOGLE LENS + PASTE

```
┌──────────────────────────────────────┐
│ 1. KLIK "BUKA GOOGLE LENS"          │
└────────────────┬────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. BROWSER BUKA https://lens.google.com di tab baru        │
│    User ambil foto layar printout mesin Getinge dengan app │
│    Google Lens                                              │
└────────────────┬───────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. COPY TEKS HASIL OCR GOOGLE LENS                          │
│    (Google Lens OCR lebih akurat untuk foto dari ponsel)   │
└────────────────┬───────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. TEMPEL TEKS DI TEXTAREA APLIKASI                         │
│    "Tempel teks hasil OCR Google Lens di sini"             │
└────────────────┬───────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. KLIK "PROSES TEKS" (processPastedText)                   │
│    Jalankan parseOcrText seperti mode upload file           │
└────────────────┬───────────────────────────────────────────┘
                 │
                 ▼ (Sama seperti Skenario 1, mulai dari step 4)
```

### Skenario 3️⃣: User INPUT MANUAL (Tanpa OCR/Lens)

```
┌─────────────────────────────────────┐
│ 1. PILIH MODE "INPUT MANUAL"        │
│    (Tombol sudah aktif by default)  │
└────────────────┬───────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. ISI FORM DENGAN 10 FIELD WAJIB                           │
│    Input field dengan auto-format:                          │
│    • Jam:      HH:MM:SS   (auto add ":" setelah digit ke-2 &4)
│    • Suhu:     XXX.X      (auto add "." setelah digit ke-3)  │
│    • Tekanan:  X.XXX      (auto add "." setelah digit ke-1)  │
│    • Smart backspace → fokus ke field sebelumnya            │
│    • Validasi real-time: highlight merah jika di luar range │
└────────────────┬───────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. VALIDASI SEBELUM HITUNG (markEmptyFields)               │
│    • Cek semua 10 field ada isi                            │
│    • Cek tipe data benar (angka, format jam valid)         │
│    • Jika ada yang kosong → tampilkan warning banner       │
│      "Belum terdeteksi OCR, isi manual: [Field Name]"      │
└────────────────┬───────────────────────────────────────────┘
                 │
          SEMUA TERISI?
          ✓ YA / ✗ TIDAK
          │       │
         ▼       ▼
        [LANJUT] [STOP - HIGHLIGHT FIELD KOSONG]
        │
        ▼
```

### Skenario 4️⃣: PROSES KALKULASI (Semua Mode)

```
┌─────────────────────────────────────────────────────────┐
│ USER KLIK TOMBOL "⚡ HITUNG"                           │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 1. KONVERSI WAKTU: HH:MM:SS → DETIK                    │
│    Contoh: "00:23:49" → 1429 detik                     │
│    Formula: (jam×3600) + (menit×60) + detik           │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 2. HITUNG SELISIH WAKTU (hitungSelisihWaktu)           │
│                                                        │
│    a. Durasi Sterilisasi = selesaiSteril - mulaiSteril│
│       Tampilkan dalam format: "X menit Y detik"        │
│                                                        │
│    b. Durasi Cooling = selesaiCooling - mulaiCooling   │
│       Tampilkan dalam format: "X menit Y detik"        │
│                                                        │
│    c. Heat-Up Time = mulaiProses + totalWaktu         │
│       (Dari mulai hingga steril dimulai)              │
│       Konversi ke: "XXX menit"                        │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 3. VALIDASI SUHU (Temperature Check)                   │
│                                                        │
│    Selisih Suhu = |suhuA125 - suhuA102|               │
│                                                        │
│    ├─ KRITIS 🔴: Jika ≥ 0.8°C                        │
│    │  ✗ Sensor mungkin rusak atau tidak sinkron      │
│    │  ✓ Tampilkan info icon + alert                  │
│    │                                                  │
│    ├─ WARNING ⚠: Jika 0.3-0.8°C                      │
│    │  ⚠ Perlu perhatian, tapi masih acceptable       │
│    │  ✓ Tampilkan warna orange                       │
│    │                                                  │
│    └─ OK ✓: Jika < 0.3°C                             │
│       ✓ Nilai normal, keine Masalah                  │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 4. VALIDASI TEKANAN (Pressure Check)                   │
│                                                        │
│    Selisih Tekanan = |tekananA129 - tekananA106|      │
│                                                        │
│    ├─ KRITIS 🔴: Jika ≥ 0.4 bar                      │
│    │  ✗ Tekanan tidak uniform, perlu maintenance    │
│    │  ✓ Tampilkan alert khusus                       │
│    │                                                  │
│    └─ NORMAL ✓: Jika < 0.4 bar                       │
│       ✓ Tekanan seimbang, OK                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 5. RENDER HASIL (Display Results)                      │
│                                                        │
│    Panel "HASIL PERHITUNGAN" tampilkan:               │
│    • Total Waktu Proses                               │
│    • Heat-Up Duration                                 │
│    • Durasi Sterilisasi                               │
│    • Durasi Cooling                                   │
│    • Selisih Suhu (dengan status badge)               │
│    • Selisih Tekanan (dengan status badge)            │
│    • Status keseluruhan: ✓ PASS / ⚠ WARNING / 🔴 FAIL│
│                                                        │
│    Scroll otomatis ke hasil untuk visibility          │
└─────────────────────────────────────────────────────────┘
```

### DIAGRAM ALUR LENGKAP

```
                         START
                           │
                ┌──────────┴──────────┐
                │                     │
        ┌───────▼────────┐    ┌──────▼─────────┐
        │  SCAN MODE     │    │ MANUAL MODE    │
        │  (Upload File) │    │ (Input Form)   │
        └───────┬────────┘    └──────┬─────────┘
                │                    │
        ┌───────▼────────┐    ┌──────▼─────────┐
        │ Tesseract OCR  │    │ Direct Input   │
        │ + PDF Extract  │    │ (10 fields)    │
        └───────┬────────┘    └──────┬─────────┘
                │                    │
        ┌───────▼────────┐    ┌──────▼─────────┐
        │ Google Lens    │    │ Real-time      │
        │ Alternative    │    │ Validation     │
        │ (paste text)   │    │                │
        └───────┬────────┘    └──────┬─────────┘
                │                    │
                │        ┌───────────┘
                │        │
         ┌──────▼────────▼──────────┐
         │   parseOcrText()         │
         │   Extract values to      │
         │   structured format      │
         └──────┬────────┬──────────┘
                │        │
         ┌──────▼────────▼──────────┐
         │  showOcrResults()        │
         │  Display extracted data  │
         └──────┬────────┬──────────┘
                │        │
         ┌──────▼────────▼──────────┐
         │  applyOcrResults() OR    │
         │  Direct to Form          │
         └──────┬────────┬──────────┘
                │        │
         ┌──────▼────────▼──────────┐
         │ Review & Edit Fields     │
         │ markEmptyFields()        │
         └──────┬────────┬──────────┘
                │        │
              ALL FILLED? (Validation)
              Yes ✓ / No ✗
              │        │
              ▼        ▼
        [PROCEED]  [SHOW WARNING]
           │
           ▼
        ┌──────────────────────────┐
        │  Click "HITUNG" Button   │
        └──────┬───────────────────┘
               │
        ┌──────▼──────────────────┐
        │ parseTime() & Calculate │
        │ • Durasi Steril         │
        │ • Durasi Cooling        │
        │ • Heat-up time          │
        └──────┬───────────────────┘
               │
        ┌──────▼──────────────────┐
        │ Validate Temperature    │
        │ • Selisih ≥0.9: KRITIS  │
        │ • 0.3-0.9: WARNING      │
        │ • <0.3: OK              │
        └──────┬───────────────────┘
               │
        ┌──────▼──────────────────┐
        │ Validate Pressure       │
        │ • Selisih ≥0.4: KRITIS  │
        │ • <0.4: OK              │
        └──────┬───────────────────┘
               │
        ┌──────▼──────────────────┐
        │  Display Results Panel  │
        │  • All calculations     │
        │  • Status badges        │
        │  • Color coding         │
        └──────┬───────────────────┘
               │
        ┌──────▼──────────────────┐
        │ User Can:               │
        │ • Click "RESET" → Clear │
        │ • Try again with new    │
        │   data/photo            │
        │ • Screenshot result     │
        └──────────────────────────┘
```

---

## 📖 PANDUAN PENGGUNA

### LANGKAH 1: Buka Aplikasi

**Via Browser (Desktop/Mobile)**:
1. Buka browser (Chrome, Firefox, Safari, Edge)
2. Ketik URL: `http://localhost:3000`
3. Aplikasi akan muncul

**Install sebagai PWA (Mobile Android)**:
1. Buka di Chrome
2. Tap menu (⋮) → "Install app"
3. Tap "Install"
4. Aplikasi akan di desktop seperti app native

**Install sebagai PWA (Mobile iOS)**:
1. Buka di Safari
2. Tap Share (↗) → "Add to Home Screen"
3. Nama app akan muncul di iPhone home screen

---

### LANGKAH 2: Pilih MODE

**OPTION A: SCAN MODE (Rekomendasi jika punya foto/PDF)**

1. **Klik tombol "📷 Scan Gambar / PDF"**
   - Area upload akan aktif
   
2. **Drag & Drop atau Klik untuk upload**
   - Bisa multiple file sekaligus (JPG, PNG, PDF)
   - Max 15MB per file
   
3. **Tunggu proses OCR**
   - Progress bar akan tampil
   - Status: "Memproses gambar", "Membaca teks", dll
   
4. **Review hasil ekstraksi**
   - Tabel akan tampil dengan nilai yang terdeteksi
   - Warna hijau = terdeteksi, merah = belum terdeteksi
   
5. **Klik "⚡ ISI FORM OTOMATIS"**
   - Data akan terisi di form otomatis
   - Jika ada field kosong, warning akan muncul

**OPTION B: MANUAL PASTE dari Google Lens**

1. **Klik tombol "📱 Buka Google Lens"**
   - Browser akan buka tab lens.google.com
   
2. **Di aplikasi Google Lens**:
   - Ambil foto layar printout mesin Getinge
   - Tap icon text (✏️/hasil OCR)
   - Copy semua teks (select all → copy)
   
3. **Kembali ke aplikasi ini**
   - Tempel teks di textarea "Tempel teks hasil OCR Google Lens di sini"
   
4. **Klik "🔍 Proses Teks"**
   - Data akan diekstrak sama seperti upload file

**OPTION C: INPUT MANUAL (Jika tidak ada foto)**

1. **Klik tombol "✍️ Input Manual"**
   - Form input 10 field akan tampil
   
2. **Isi setiap field**:
   - **Start Jam**: `HH:MM:SS` (auto format)
   - **Total Durasi**: `HH:MM:SS`
   - **Mulai/Selesai Steril**: `HH:MM:SS` (2 field)
   - **Mulai/Selesai Cooling**: `HH:MM:SS` (2 field)
   - **Suhu A102**: `XXX.X` (e.g., "121.5")
   - **Suhu A125**: `XXX.X`
   - **Tekanan A106**: `X.XXX` (e.g., "2.950")
   - **Tekanan A129**: `X.XXX`

3. **Smart Input Features**:
   - Auto add separator (`:` atau `.`)
   - Backspace otomatis pindah ke field sebelumnya
   - Validation real-time (field merah jika nilai di luar range)

---

### LANGKAH 3: HITUNG & LIHAT HASIL

1. **Tekan tombol "⚡ HITUNG"**
   - Validasi semua field
   - Jika ada field kosong, warning akan tampil
   
2. **Hasil perhitungan akan tampil**:
   
   | Item | Deskripsi |
   |------|-----------|
   | **Total Waktu Proses** | Dari mulai hingga cooling selesai |
   | **Heat-Up Duration** | Waktu pemanasan hingga steril |
   | **Durasi Sterilisasi** | Detik/menit saat steril berlangsung |
   | **Durasi Cooling** | Detik/menit saat pendinginan |
   | **Selisih Suhu** | Perbedaan A102 vs A125 (dengan status) |
   | **Selisih Tekanan** | Perbedaan A106 vs A129 (dengan status) |

3. **Pahami Status Badge**:
   - ✓ **OK (Hijau)**: Nilai normal, tidak ada masalah
   - ⚠ **WARNING (Orange)**: Perlu perhatian, tapi masih acceptable
   - 🔴 **KRITIS (Merah)**: Sensor mungkin bermasalah, perlu investigasi

---

### LANGKAH 4: ACTION SELANJUTNYA

**Klik "🔄 Reset"**
   - Semua field dikosongkan
   - Form siap untuk data baru

**Screenshot Hasil**
   - Tekan Ctrl+S (Windows) atau Cmd+S (Mac)
   - File akan tersimpan di device

**Share via WhatsApp/Email**
   - Copy hasil dan paste ke chat/email
   - Screenshot hasil untuk dokumentasi

---

### TIPS & TRICKS

| Tips | Manfaat |
|------|---------|
| **Input Manual lebih cepat** | Kalau sudah hafal format, ketik langsung 2-3 menit |
| **Google Lens untuk foto buruk** | Akurasi lebih baik dari Tesseract untuk ponsel |
| **Gunakan dark theme malam** | Hemat baterai & nyaman untuk mata |
| **Upload PDF bukan foto** | Hasil OCR lebih akurat dari printout digital |
| **Check warning banner** | Jangan skip field kosong, isi manual jika perlu |
| **Screenshot hasil** | Untuk audit trail & dokumentasi RS |

---

## 🔧 DOKUMENTASI TEKNIS

### STRUKTUR DATA

#### Input Fields (Form)
```javascript
{
  mulaiProses:    "HH:MM:SS",  // Waktu mulai proses sterilisasi
  totalWaktu:     "HH:MM:SS",  // Total durasi keseluruhan
  mulaiSteril:    "HH:MM:SS",  // Waktu steril dimulai
  selesaiSteril:  "HH:MM:SS",  // Waktu steril berakhir
  mulaiCooling:   "HH:MM:SS",  // Waktu pendinginan mulai
  selesaiCooling: "HH:MM:SS",  // Waktu pendinginan selesai
  suhuA102:       "XXX.X",     // Temperature sensor A102 (°C)
  suhuA125:       "XXX.X",     // Temperature sensor A125 (°C)
  tekananA106:    "X.XXX",     // Pressure sensor A106 (bar)
  tekananA129:    "X.XXX"      // Pressure sensor A129 (bar)
}
```

#### Output Results
```javascript
{
  totalWaktuProses:  "HH:MM:SS",
  heatUpDuration:    "XXX menit",
  durasiSterilisasi: "X menit Y detik",
  durasiCooling:     "X menit Y detik",
  selisihSuhu:       { nilai: "X.X °C", status: "OK|WARNING|KRITIS" },
  selisihTekanan:    { nilai: "X.XXX bar", status: "OK|KRITIS" }
}
```

---

### FUNGSI-FUNGSI KUNCI

#### 1. **extractTextFromImage(file)**
```javascript
/* 
  Input: File object (gambar)
  Process:
    1. Baca file sebagai blob
    2. Preprocessing: grayscale, contrast enhancement, upscale 2x
    3. Kirim ke Tesseract.js via WASM
    4. Return raw text
  Output: String teks hasil OCR
  Accuracy: 70-85% (tergantung kualitas foto)
*/
```

#### 2. **extractTextFromPDF(file)**
```javascript
/*
  Input: File object (PDF)
  Process:
    1. Load PDF via PDF.js
    2. Loop setiap halaman
    3. Extract text per halaman
    4. Gabung semua text
  Output: String teks hasil ekstraksi
  Note: OCR untuk PDF berisi gambar lebih lambat
*/
```

#### 3. **parseOcrText(text)**
```javascript
/*
  Input: Raw OCR text dari gambar/PDF
  Process:
    1. Normalisasi: remove newline, fix OCR noise (O→0, l→1, dst)
    2. Find sections: STERILIZATION, COOLING, EQUALIZATION, POSTTREATMENT
    3. Extract time pattern: HH:MM:SS
    4. Extract decimal: suhu (100-145), tekanan (1.0-6.0)
    5. Map ke field form sesuai section & order
    6. Fallback: Jika field kosong, cari nilai alternatif
  
  Output: Object {mulaiProses, totalWaktu, ..., tekananA129}
  Accuracy: 80-95% (setelah normalisasi & fallback)
*/
```

#### 4. **markEmptyFields()**
```javascript
/*
  Validasi field yang wajib diisi
  Return: Array field kosong dengan {el, id, label}
  Used for: Notify user field mana yang kosong sebelum hitung
*/
```

#### 5. **hitungSelisihWaktu(startStr, endStr)**
```javascript
/*
  Input: "HH:MM:SS", "HH:MM:SS"
  Output: "X menit Y detik"
  Formula: 
    - Konversi ke detik: (jam×3600) + (menit×60) + detik
    - Hitung selisih: end_detik - start_detik
    - Konversi kembali: detik → menit & sisa detik
  Handling: Jika end < start (berbeda hari), tambah 24 jam
*/
```

#### 6. **validateTemperature() & validatePressure()**
```javascript
/*
  Temperature Validation:
    KRITIS (🔴): Selisih ≥ 0.8°C
    WARNING (⚠): Selisih 0.3-0.8°C
    OK (✓): Selisih < 0.3°C
  
  Pressure Validation:
    KRITIS (🔴): Selisih ≥ 0.4 bar
    OK (✓): Selisih < 0.4 bar
*/
```

---

### CSS CLASSES (Styling System)

| Class | Tujuan |
|-------|--------|
| `.container` | Main wrapper, max-width 480px, glassmorphism effect |
| `.mode-btn` | Button untuk switch mode (active state) |
| `.upload-zone` | Drag & drop area untuk upload file |
| `.input-row` | Layout per input field (label + input) |
| `.input-error` | Highlight input yang value di luar range (merah) |
| `.ocr-loader` | Loading spinner saat OCR processing |
| `.ocr-result-panel` | Tabel hasil ekstraksi OCR |
| `.hasil-wrapper` | Panel hasil perhitungan |
| `.text-warning` | Warna orange untuk warning value |
| `.text-critical` | Warna merah untuk kritis value |

---

### VALIDASI RULES

| Field | Format | Range | Message |
|-------|--------|-------|---------|
| Waktu | `HH:MM:SS` | 00:00:00 - 23:59:59 | Invalid time |
| Suhu | `XXX.X` | 121.1 - 124.0 | Di luar range (treshold) |
| Tekanan | `X.XXX` | 2.950 - 3.150 | Di luar range (treshold) |

---

## 🚀 PANDUAN INSTALASI & DEPLOYMENT

### LOCAL SETUP (Development)

**Requirement**:
- Node.js v14+ (download dari nodejs.org)
- Git (opsional)

**Langkah**:

1. **Clone atau Download Proyek**
   ```bash
   git clone <repo-url>
   cd project\ codingan/HTML/data\ mentah
   ```

2. **Setup PWA Icons**
   - Pastikan `icon-192.png` dan `icon-512.png` ada di folder
   - Ukuran 192x192 px dan 512x512 px
   - Format PNG dengan transparent background

3. **Jalankan Server**
   ```bash
   node server.js
   ```
   Output:
   ```
   ✅ Server berjalan di: http://localhost:3000
   📁 Melayani folder: C:\Users\admin\Documents\project codingan\HTML\data mentah
   
   Tekan Ctrl+C untuk menghentikan server.
   ```

4. **Akses Aplikasi**
   - Desktop: `http://localhost:3000`
   - Mobile (same network): `http://<COMPUTER_IP>:3000`

---

### PRODUCTION DEPLOYMENT

#### Option A: Deploy ke Heroku (Free)

1. **Setup Heroku CLI**
   ```bash
   # Download dari https://devcenter.heroku.com/articles/heroku-cli
   heroku login
   ```

2. **Create Procfile**
   ```
   web: node server.js
   ```

3. **Deploy**
   ```bash
   heroku create application-name
   git push heroku main
   ```

4. **Akses**
   ```
   https://application-name.herokuapp.com
   ```

#### Option B: Deploy ke Netlify (Recommended untuk PWA)

1. **Build untuk production**
   - Tidak perlu build khusus, PWA sudah production-ready
   - Hanya copy seluruh folder ke Netlify

2. **Connect ke Netlify**
   - Drag & drop folder ke Netlify.com
   - atau connect GitHub repo
   - Custom domain bisa ditambahkan

#### Option C: Self-hosted (VPS/Cloud)

1. **Setup di VPS (Ubuntu/CentOS)**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Clone proyek
   git clone <repo-url>
   cd project-folder
   
   # Install PM2 (process manager)
   sudo npm install -g pm2
   
   # Jalankan dengan PM2
   pm2 start server.js --name "steril-app"
   pm2 save
   ```

2. **Setup SSL (HTTPS)**
   ```bash
   # Gunakan Let's Encrypt
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot certonly --standalone -d yourdomain.com
   ```

3. **Setup Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name yourdomain.com;
       
       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
       
       location / {
           proxy_pass http://localhost:3000;
       }
   }
   ```

---

### PORT CONFIGURATION

**Default**: Port 3000

**Mengubah port**:

Edit `server.js` baris 5:
```javascript
const PORT = process.env.PORT || 3001;  // Ganti 3001 dengan port pilihan
```

atau set environment variable:
```bash
# Windows
set PORT=8080 && node server.js

# Linux/Mac
PORT=8080 node server.js
```

---

### CLEAR CACHE PWA

**Jika ada update tapi tidak muncul di browser**:

**Chrome**:
1. DevTools (F12) → Application → Service Workers
2. Unregister service worker
3. Cache Storage → Delete semua
4. Reload halaman (Ctrl+Shift+R)

**Mobile**:
- Android: App Settings → Clear Cache
- iOS: Safari Settings → Clear History & Website Data

---

## 🆘 TROUBLESHOOTING

| Problem | Solusi |
|---------|--------|
| **Port 3000 sudah digunakan** | Ubah port di server.js atau kill process: `taskkill /F /IM node.exe` |
| **OCR tidak akurat** | Gunakan foto berkualitas tinggi, pencahayaan terang, tidak blur. Atau gunakan Google Lens |
| **File tidak bisa diupload** | Check ukuran file (<15MB) dan format (JPG/PNG/PDF valid) |
| **Form tidak auto-focus saat OCR** | Scroll manual ke form atau cek console for errors |
| **Tema tidak berubah** | Clear cache & reload, check local storage |
| **PWA tidak install di mobile** | Pastikan serving via HTTPS (di production), launch icon ada |
| **Hasil perhitungan salah** | Double-check input format waktu (HH:MM:SS), validate di form |
| **Service Worker offline tidak bekerja** | Check manifest.json valid, icons ada di folder |

---

## 📊 RINGKASAN FITUR TEKNIS

| Aspek | Detail |
|-------|--------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS (no framework) |
| **OCR Engine** | Tesseract.js (Offline) + Google Lens (Manual) |
| **PDF Support** | PDF.js library |
| **Offline Mode** | Service Worker + Cache API |
| **Storage** | LocalStorage (future: riwayat penggunaan) |
| **Responsive** | Mobile-first design, max-width 480px |
| **Themes** | 3 tema (White, Gold/Tosca, Dark) |
| **Validation** | Real-time input validation + range check |
| **Performance** | Tesseract.js ~3-5 detik per gambar |
| **Browser Support** | Chrome 60+, Firefox 55+, Safari 12+, Edge 79+ |

---

## 📞 CONTACT & SUPPORT

- **Developed by**: Tim IT Department
- **Last Updated**: 11 Maret 2026
- **Version**: 1.0
- **License**: Internal Use Only

---

**END OF DOCUMENTATION**

---

*Dokumen ini akan terus diperbarui sesuai perkembangan aplikasi. Feedback dan saran untuk perbaikan dapat dikirim ke tim development.*
