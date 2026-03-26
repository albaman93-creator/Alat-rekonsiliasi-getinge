function parseOcrText(text){
    // ============================================================
    // PARSER GETINGE v4 — dikalibrasi dari foto print-out nyata
    // Redmi 13, 15/03/2026 — FIMA REPLACEMENT, Technomed 500
    //
    // Struktur kolom tabel (setelah PROGTIME):
    //   AI06  AI29  AI00  AI24  AI02  AI25  AI08  AI27  F000
    //   [0]   [1]   [2]   [3]   [4]   [5]   [6]   [7]   [8]
    //
    // Ciri khas print-out Getinge dot-matrix:
    //   - Tanda "-" atau "- " di depan PROGTIME data row: "-00:25:56" atau "- 00:41:02"
    //   - Tanda "~" dan "`" di akhir nilai (artefak OCR thermal)
    //   - PROCESS START di header: "PROCESS START  : 21:17:01 ~"
    //   - Section header di baris sendiri, data row di baris berikutnya
    //   - PROCESS COMPLETE: label lalu data "-01:12:46  1.028 1.013..."
    // ============================================================

    const result = {};

    // ── NORMALISASI ──────────────────────────────────────────────
    let norm = text
        .replace(/\r/g, '')
        .replace(/,/g, '.')
        // Hapus karakter noise OCR thermal/dot-matrix
        .replace(/[`~\u2019\u2018\u201c\u201d]/g, '')
        // Normalkan spasi berlebih
        .replace(/[ \t]+/g, ' ')
        // Koreksi OCR: huruf mirip angka di antara digit
        .replace(/(?<=\d)[Oo](?=\d)/g, '0')
        .replace(/(?<=\d)[lI|](?=\d)/g, '1')
        .replace(/(?<=\d)[Ss](?=\d)/g, '5')
        .replace(/(?<=\d)[Bb](?=\d)/g, '6')
        // Normalkan "- 00:25:56" → "00:25:56" (strip tanda minus + spasi di depan waktu)
        .replace(/^[\-\s]+(\d{2}[:. ]\d{2}[:. ]\d{2})/gm, '$1')
        // Normalkan pemisah waktu titik/spasi menjadi titik dua
        .replace(/\b(\d{2})\.(\d{2})\.(\d{2})\b/g, '$1:$2:$3')
        .replace(/\b(\d{2}) (\d{2}) (\d{2})\b/g, '$1:$2:$3');

    const lines = norm.split(/\n/).map(l => l.trim()).filter(l => l.length > 0);
    console.log('=== OCR LINES v4 (first 80) ===');
    lines.slice(0, 80).forEach((l, i) => console.log(i, l));

    // ── HELPER: cari pola waktu HH:MM:SS ────────────────────────
    function findTime(s) {
        if (!s) return null;
        // Coba match waktu dengan berbagai separator
        const patterns = [
            /\b(\d{2}):(\d{2}):(\d{2})\b/,
            /\b(\d{2})\.(\d{2})\.(\d{2})\b/,
        ];
        for (const pat of patterns) {
            const m = s.match(pat);
            if (m) {
                const h = parseInt(m[1]), mn = parseInt(m[2]), sc = parseInt(m[3]);
                if (h <= 23 && mn <= 59 && sc <= 59)
                    return `${m[1]}:${m[2]}:${m[3]}`;
            }
        }
        return null;
    }

    // ── HELPER: apakah baris adalah baris data PROGTIME ─────────
    // Setelah normalisasi, baris data dimulai langsung dengan HH:MM:SS
    function isDataRow(s) {
        return /^\d{2}:\d{2}:\d{2}/.test(s);
    }

    // ── HELPER: baris data pertama setelah index i ───────────────
    function firstDataRowAfter(idx, maxSearch) {
        const lim = Math.min(idx + (maxSearch || 15), lines.length);
        for (let j = idx + 1; j < lim; j++) {
            if (isDataRow(lines[j])) return { row: lines[j], idx: j };
        }
        return null;
    }

    // ── HELPER: parse kolom angka desimal dari baris data ────────
    // Hapus waktu di awal, lalu ambil semua angka desimal
    function parseCols(row) {
        const noTime = row.replace(/^\d{2}:\d{2}:\d{2}\s*/, '');
        const nums = (noTime.match(/\d+\.\d+/g) || []).map(Number);
        console.log('parseCols →', nums.slice(0, 8));
        return nums;
    }

    // ── HELPER: match header section (toleran noise OCR) ────────
    function matchSection(line, keyword) {
        const nl = line.toLowerCase().replace(/[\s\-\.~_`|]/g, '');
        const nk = keyword.toLowerCase().replace(/\s+/g, '');
        if (nl.includes(nk)) return true;
        // Fallback: semua kata kunci ada di baris
        const words = keyword.toLowerCase().split(/\s+/);
        return words.length >= 2 && words.every(w =>
            line.toLowerCase().includes(w.substring(0, Math.max(4, w.length - 1)))
        );
    }

    // ── HELPER: cari waktu mulai dari baris i, ke bawah ─────────
    function findTimeInOrAfter(i, maxLines) {
        let t = findTime(lines[i]);
        if (t) return t;
        for (let j = i + 1; j < Math.min(i + (maxLines || 8), lines.length); j++) {
            t = findTime(lines[j]);
            if (t) return t;
        }
        return null;
    }

    // ── HELPER: cari sensor dari beberapa baris data berturutan ──
    // Ambil baris data terbaik: yang punya paling banyak angka desimal
    function bestDataRowAfter(idx, maxSearch) {
        const lim = Math.min(idx + (maxSearch || 10), lines.length);
        let best = null, bestCount = 0;
        for (let j = idx + 1; j < lim; j++) {
            if (!isDataRow(lines[j])) continue;
            const nums = (lines[j].match(/\d+\.\d+/g) || []);
            if (nums.length > bestCount) {
                bestCount = nums.length;
                best = { row: lines[j], idx: j };
            }
            // Kalau sudah dapat baris dengan 8+ angka, langsung pakai
            if (bestCount >= 8) break;
        }
        return best;
    }

    // ════════════════════════════════════════════════════════════
    // 1. PROCESS START → mulaiProses
    //    Format header Page 1: "PROCESS START  : 21:17:01"
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'PROCESS START')) {
            // Pola ": HH:MM:SS" di baris yang sama
            const m = lines[i].match(/:\s*(\d{2})[:.:](\d{2})[:.:](\d{2})/);
            if (m && parseInt(m[1]) <= 23) {
                result.mulaiProses = `${m[1]}:${m[2]}:${m[3]}`;
            } else {
                result.mulaiProses = findTimeInOrAfter(i, 4);
            }
            if (result.mulaiProses) { console.log('✅ mulaiProses:', result.mulaiProses); break; }
        }
    }

    // ════════════════════════════════════════════════════════════
    // 2. FAN STERILIZING → mulaiSteril
    //    Header lalu baris data: "00:25:56  3.065 3.044..."
    //    (setelah normalisasi, tanda "-" di depan sudah dihapus)
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'FAN STERILIZING')) {
            const found = firstDataRowAfter(i, 5);
            if (found) result.mulaiSteril = findTime(found.row);
            if (!result.mulaiSteril) result.mulaiSteril = findTimeInOrAfter(i, 6);
            if (result.mulaiSteril) console.log('✅ mulaiSteril:', result.mulaiSteril);
            break;
        }
    }

    // ════════════════════════════════════════════════════════════
    // 3. POSTTREATMENT → selesaiSteril + sensor suhu & tekanan
    //
    //    Dari foto nyata Page 2:
    //      POSTTREATMENT
    //      00:40:57  3.109 3.089  121.9 121.8 121.9 121.8 121.2 121.2  20.3
    //      00:41:00  3.124 3.106  122.0 122.0 121.9 121.8 121.3 121.3  20.4
    //
    //    Kolom: AI06=[0] AI29=[1] AI00=[2] AI24=[3] AI02=[4] AI25=[5]
    //    → tekanan: [0] dan [1]
    //    → suhu: [4] dan [5]
    //
    //    Strategi: ambil baris data terbaik (paling banyak kolom)
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'POSTTREATMENT')) {
            // Ambil baris data pertama untuk waktu selesai steril
            const firstRow = firstDataRowAfter(i, 5);
            if (firstRow) {
                result.selesaiSteril = findTime(firstRow.row);
            }

            // Ambil baris data terbaik untuk sensor (yang punya kolom paling lengkap)
            const bestRow = bestDataRowAfter(i, 8);
            if (bestRow) {
                const nums = parseCols(bestRow.row);

                // Tekanan: AI06=[0], AI29=[1] — range 1.0–6.0 bar
                if (nums[0] !== undefined && nums[0] >= 1.0 && nums[0] <= 6.0)
                    result.tekananA106 = nums[0].toFixed(3);
                if (nums[1] !== undefined && nums[1] >= 1.0 && nums[1] <= 6.0)
                    result.tekananA129 = nums[1].toFixed(3);

                // Suhu: AI02=[4], AI25=[5] — range 100–145 °C
                if (nums[4] !== undefined && nums[4] >= 100 && nums[4] <= 145)
                    result.suhuA102 = nums[4].toFixed(1);
                if (nums[5] !== undefined && nums[5] >= 100 && nums[5] <= 145)
                    result.suhuA125 = nums[5].toFixed(1);
            }

            console.log('✅ POSTTREATMENT →',
                'selesai:', result.selesaiSteril,
                '| tek106:', result.tekananA106,
                '| tek129:', result.tekananA129,
                '| suhu102:', result.suhuA102,
                '| suhu125:', result.suhuA125);
            break;
        }
    }

    // ════════════════════════════════════════════════════════════
    // 4. FAN COOLING → mulaiCooling
    //    Dari foto: "FAN COOLING" lalu "00:41:02  3.117 3.099..."
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'FAN COOLING')) {
            const found = firstDataRowAfter(i, 5);
            if (found) result.mulaiCooling = findTime(found.row);
            if (!result.mulaiCooling) result.mulaiCooling = findTimeInOrAfter(i, 6);
            if (result.mulaiCooling) console.log('✅ mulaiCooling:', result.mulaiCooling);
            break;
        }
    }

    // ════════════════════════════════════════════════════════════
    // 5. EQUALIZATION → selesaiCooling
    //    Dari foto: "EQUALIZATION" lalu "01:11:26  1.992 1.977..."
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'EQUALIZATION')) {
            const found = firstDataRowAfter(i, 5);
            if (found) result.selesaiCooling = findTime(found.row);
            if (!result.selesaiCooling) result.selesaiCooling = findTimeInOrAfter(i, 6);
            if (result.selesaiCooling) console.log('✅ selesaiCooling:', result.selesaiCooling);
            break;
        }
    }

    // ════════════════════════════════════════════════════════════
    // 6. PROCESS COMPLETE → totalWaktu
    //    Dari foto: "PROCESS COMPLETE" lalu "01:12:46  1.028 1.013..."
    //    totalWaktu = durasi total siklus (elapsed time), BUKAN jam clock
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'PROCESS COMPLETE')) {
            // Coba inline dulu (kadang OCR menyatukan label + waktu)
            const tInline = findTime(lines[i]);
            if (tInline) {
                result.totalWaktu = tInline;
            } else {
                // Cari baris data berikutnya
                const found = firstDataRowAfter(i, 5);
                if (found) result.totalWaktu = findTime(found.row);
                // Fallback: baris non-data row
                if (!result.totalWaktu) result.totalWaktu = findTimeInOrAfter(i, 6);
            }
            if (result.totalWaktu) { console.log('✅ totalWaktu:', result.totalWaktu); break; }
        }
    }

    // ════════════════════════════════════════════════════════════
    // FALLBACK A — Sensor suhu/tekanan belum lengkap
    //   → scan ulang semua baris data dekat POSTTREATMENT
    //     berdasarkan range nilai (lebih permisif)
    // ════════════════════════════════════════════════════════════
    const sensorMissing = !result.suhuA102 || !result.suhuA125 ||
                          !result.tekananA106 || !result.tekananA129;
    if (sensorMissing) {
        console.log('⚠️ FALLBACK-A: sensor belum lengkap, scan ulang...');
        for (let i = 0; i < lines.length; i++) {
            if (matchSection(lines[i], 'POSTTREATMENT')) {
                for (let j = i + 1; j < Math.min(i + 12, lines.length); j++) {
                    if (!isDataRow(lines[j])) continue;
                    const allNums = (lines[j].match(/\d+\.\d+/g) || []).map(Number);
                    const pressures = allNums.filter(v => v >= 1.0 && v <= 6.0);
                    const temps     = allNums.filter(v => v >= 100 && v <= 145);
                    console.log('FALLBACK-A row:', lines[j]);
                    console.log('P:', pressures, 'T:', temps);
                    if (!result.tekananA106 && pressures[0] != null) result.tekananA106 = pressures[0].toFixed(3);
                    if (!result.tekananA129 && pressures[1] != null) result.tekananA129 = pressures[1].toFixed(3);
                    if (!result.suhuA102    && temps[0] != null)     result.suhuA102    = temps[0].toFixed(1);
                    if (!result.suhuA125    && temps[1] != null)     result.suhuA125    = temps[1].toFixed(1);
                    // Kalau sudah semua dapat, stop
                    if (result.tekananA106 && result.tekananA129 && result.suhuA102 && result.suhuA125) break;
                }
                break;
            }
        }
    }

    // ════════════════════════════════════════════════════════════
    // FALLBACK B — PROCESS COMPLETE masih kosong
    //   → ambil waktu dari baris sebelum LOWEST/HIGHEST/PROCESS OK
    // ════════════════════════════════════════════════════════════
    if (!result.totalWaktu) {
        console.log('⚠️ FALLBACK-B: cari PROCESS COMPLETE via LOWEST TEMP...');
        for (let i = 0; i < lines.length; i++) {
            if (/lowest|highest|process\s*ok/i.test(lines[i])) {
                for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
                    const t = findTime(lines[j]);
                    if (t) { result.totalWaktu = t; console.log('✅ totalWaktu (fallback-B):', t); break; }
                }
                if (result.totalWaktu) break;
            }
        }
    }

    // ════════════════════════════════════════════════════════════
    // FALLBACK C — Waktu section masih kosong (brute-force regex)
    // ════════════════════════════════════════════════════════════
    if (!result.mulaiSteril) {
        console.log('⚠️ FALLBACK-C: brute-force FAN STERILIZING...');
        for (let i = 0; i < lines.length; i++) {
            if (/fan\s*steril/i.test(lines[i])) {
                result.mulaiSteril = findTimeInOrAfter(i, 8);
                if (result.mulaiSteril) { console.log('✅ mulaiSteril (C):', result.mulaiSteril); break; }
            }
        }
    }
    if (!result.selesaiSteril) {
        for (let i = 0; i < lines.length; i++) {
            if (/posttreat/i.test(lines[i])) {
                result.selesaiSteril = findTimeInOrAfter(i, 8);
                if (result.selesaiSteril) break;
            }
        }
    }
    if (!result.mulaiCooling) {
        for (let i = 0; i < lines.length; i++) {
            if (/fan\s*cool/i.test(lines[i])) {
                result.mulaiCooling = findTimeInOrAfter(i, 8);
                if (result.mulaiCooling) break;
            }
        }
    }
    if (!result.selesaiCooling) {
        for (let i = 0; i < lines.length; i++) {
            if (/equaliz/i.test(lines[i])) {
                result.selesaiCooling = findTimeInOrAfter(i, 8);
                if (result.selesaiCooling) break;
            }
        }
    }

    // ════════════════════════════════════════════════════════════
    // FALLBACK D — PROCESS START masih kosong
    //   → cari "START" dengan pola ": HH:MM:SS" di manapun
    // ════════════════════════════════════════════════════════════
    if (!result.mulaiProses) {
        console.log('⚠️ FALLBACK-D: brute-force PROCESS START...');
        for (let i = 0; i < lines.length; i++) {
            if (/process\s*start/i.test(lines[i])) {
                const m = lines[i].match(/(\d{2}):(\d{2}):(\d{2})/);
                if (m) {
                    result.mulaiProses = `${m[1]}:${m[2]}:${m[3]}`;
                    console.log('✅ mulaiProses (D):', result.mulaiProses);
                    break;
                }
                result.mulaiProses = findTimeInOrAfter(i, 5);
                if (result.mulaiProses) break;
            }
        }
    }

    console.log('=== FINAL RESULT v4 ===', result);
    return result;
}
