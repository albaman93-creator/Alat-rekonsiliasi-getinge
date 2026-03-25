function parseOcrText(text){
    // ============================================================
    // PARSER GETINGE v3 — dikalibrasi dari print-out nyata
    //
    // Struktur kolom tabel (setelah PROGTIME):
    //   AI06  AI29  AI00  AI24  AI02  AI25  AI08  AI27  F000
    //   [0]   [1]   [2]   [3]   [4]   [5]   [6]   [7]   [8]
    //
    // Ciri khas print-out Getinge dot-matrix:
    //   - Tanda "~", "`", "-" muncul di awal baris header section
    //   - PROCESS START di header Page 1: "PROCESS START  : 21:17:01 ~"
    //   - PROCESS COMPLETE baris terpisah, data di baris berikutnya
    //   - FAN STERILIZING/COOLING/POSTTREATMENT/EQUALIZATION:
    //     header di satu baris, data PROGTIME di baris berikutnya
    // ============================================================

    const result = {};

    // ── NORMALISASI ──────────────────────────────────────────────
    let norm = text
        .replace(/\r/g, '')
        .replace(/,/g, '.')
        .replace(/[ \t]+/g, ' ')
        // Koreksi OCR: huruf mirip angka di antara digit
        .replace(/(?<=\d)[Oo](?=\d)/g, '0')
        .replace(/(?<=\d)[lI](?=\d)/g,  '1')
        // Hapus tanda ~ dan backtick dari OCR dot-matrix
        .replace(/[`~]/g, '')
        // Strip tanda "-" atau "." di awal baris sebelum angka waktu
        .replace(/^[\-\.\s]+(\d{2}[:. ]\d{2}[:. ]\d{2})/gm, '$1');

    const lines = norm.split(/\n/).map(l => l.trim()).filter(l => l.length > 0);
    console.log('=== OCR LINES (first 60) ===');
    lines.slice(0, 60).forEach((l, i) => console.log(i, l));

    // ── HELPER: cari pola waktu HH:MM:SS ────────────────────────
    function findTime(s) {
        if (!s) return null;
        const m = s.match(/\b(\d{2})[:. ](\d{2})[:. ](\d{2})\b/);
        if (m) {
            const h = parseInt(m[1]), mn = parseInt(m[2]), sc = parseInt(m[3]);
            if (h <= 23 && mn <= 59 && sc <= 59)
                return `${m[1]}:${m[2]}:${m[3]}`;
        }
        return null;
    }

    // ── HELPER: apakah baris adalah baris data PROGTIME ─────────
    function isDataRow(s) {
        return /^\d{2}[:.]\d{2}[:.]\d{2}/.test(s) ||
               /^\d{2} \d{2} \d{2}\b/.test(s);
    }

    // ── HELPER: baris data pertama setelah index i ───────────────
    function firstDataRowAfter(idx, maxSearch) {
        const lim = Math.min(idx + (maxSearch || 20), lines.length);
        for (let j = idx + 1; j < lim; j++) {
            if (isDataRow(lines[j])) return { row: lines[j], idx: j };
        }
        return null;
    }

    // ── HELPER: parse kolom angka desimal dari baris data ────────
    function parseCols(row) {
        const noTime = row.replace(/^\d{2}[:. ]\d{2}[:. ]\d{2}\s*/, '');
        const nums = (noTime.match(/\d+\.\d+/g) || []).map(Number);
        console.log('parseCols →', nums.slice(0, 6));
        return nums;
    }

    // ── HELPER: match header section toleran OCR noise ───────────
    function matchSection(line, keyword) {
        const nl = line.toLowerCase().replace(/[\s\-\.~_`]/g, '');
        const nk = keyword.toLowerCase().replace(/\s+/g, '');
        if (nl.includes(nk)) return true;
        const words = keyword.toLowerCase().split(/\s+/);
        return words.every(w => line.toLowerCase().includes(w.substring(0, Math.max(4, w.length - 1))));
    }

    // ── HELPER: cari waktu mulai dari baris i, ke bawah ─────────
    function findTimeInOrAfter(i, maxLines) {
        let t = findTime(lines[i]);
        if (t) return t;
        for (let j = i + 1; j < Math.min(i + (maxLines || 6), lines.length); j++) {
            t = findTime(lines[j]);
            if (t) return t;
        }
        return null;
    }

    // ════════════════════════════════════════════════════════════
    // 1. PROCESS START → mulaiProses
    //    Format di header: "PROCESS START  : 21:17:01 ~"
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'PROCESS START')) {
            // Pola ": HH:MM:SS" di baris yang sama
            const m = lines[i].match(/[:\s]\s*(\d{2})[.:](\d{2})[.:](\d{2})/);
            if (m && parseInt(m[1]) <= 23) {
                result.mulaiProses = `${m[1]}:${m[2]}:${m[3]}`;
            } else {
                result.mulaiProses = findTimeInOrAfter(i, 3);
            }
            if (result.mulaiProses) { console.log('✅ mulaiProses:', result.mulaiProses); break; }
        }
    }

    // ════════════════════════════════════════════════════════════
    // 2. FAN STERILIZING → mulaiSteril
    //    Header lalu baris data: "00:25:56  3.065 3.044..."
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'FAN STERILIZING')) {
            const found = firstDataRowAfter(i, 5);
            if (found) result.mulaiSteril = findTime(found.row);
            if (!result.mulaiSteril) result.mulaiSteril = findTimeInOrAfter(i, 5);
            if (result.mulaiSteril) console.log('✅ mulaiSteril:', result.mulaiSteril);
            break;
        }
    }

    // ════════════════════════════════════════════════════════════
    // 3. POSTTREATMENT → selesaiSteril + tekanan A106/A129 + suhu A102/A125
    //    Kolom: [0]=AI06(tek106) [1]=AI29(tek129) [2]=AI00 [3]=AI24
    //           [4]=AI02(suhu102) [5]=AI25(suhu125)
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'POSTTREATMENT')) {
            const found = firstDataRowAfter(i, 5);
            if (found) {
                result.selesaiSteril = findTime(found.row);
                const nums = parseCols(found.row);

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

                console.log('✅ POSTTREATMENT time:', result.selesaiSteril,
                    '| tek106:', result.tekananA106, '| tek129:', result.tekananA129,
                    '| suhu102:', result.suhuA102, '| suhu125:', result.suhuA125);
            }
            break;
        }
    }

    // ════════════════════════════════════════════════════════════
    // 4. FAN COOLING → mulaiCooling
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'FAN COOLING')) {
            const found = firstDataRowAfter(i, 5);
            if (found) result.mulaiCooling = findTime(found.row);
            if (!result.mulaiCooling) result.mulaiCooling = findTimeInOrAfter(i, 5);
            if (result.mulaiCooling) console.log('✅ mulaiCooling:', result.mulaiCooling);
            break;
        }
    }

    // ════════════════════════════════════════════════════════════
    // 5. EQUALIZATION → selesaiCooling
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'EQUALIZATION')) {
            const found = firstDataRowAfter(i, 5);
            if (found) result.selesaiCooling = findTime(found.row);
            if (!result.selesaiCooling) result.selesaiCooling = findTimeInOrAfter(i, 5);
            if (result.selesaiCooling) console.log('✅ selesaiCooling:', result.selesaiCooling);
            break;
        }
    }

    // ════════════════════════════════════════════════════════════
    // 6. PROCESS COMPLETE → totalWaktu
    //    Di print-out Getinge: label di satu baris, PROGTIME di baris berikutnya
    //    Contoh: "PROCESS COMPLETE" → baris data "01:12:46  1.028 1.013..."
    // ════════════════════════════════════════════════════════════
    for (let i = 0; i < lines.length; i++) {
        if (matchSection(lines[i], 'PROCESS COMPLETE')) {
            // Coba inline dulu
            const tInline = findTime(lines[i]);
            if (tInline) {
                result.totalWaktu = tInline;
            } else {
                // Cari di baris data berikutnya
                const found = firstDataRowAfter(i, 5);
                if (found) result.totalWaktu = findTime(found.row);
                // Fallback waktu non-data row
                if (!result.totalWaktu) result.totalWaktu = findTimeInOrAfter(i, 5);
            }
            if (result.totalWaktu) { console.log('✅ totalWaktu:', result.totalWaktu); break; }
        }
    }

    // ════════════════════════════════════════════════════════════
    // FALLBACK A — Sensor suhu/tekanan belum lengkap
    //   → filter angka desimal dari semua baris data POSTTREATMENT
    //     berdasarkan range nilai saja
    // ════════════════════════════════════════════════════════════
    const sensorMissing = !result.suhuA102 || !result.suhuA125 ||
                          !result.tekananA106 || !result.tekananA129;
    if (sensorMissing) {
        for (let i = 0; i < lines.length; i++) {
            if (matchSection(lines[i], 'POSTTREATMENT')) {
                for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
                    if (!isDataRow(lines[j])) continue;
                    const allNums = (lines[j].match(/\d+\.\d+/g) || []).map(Number);
                    const pressures = allNums.filter(v => v >= 1.0 && v <= 6.0);
                    const temps     = allNums.filter(v => v >= 100 && v <= 145);
                    console.log('FALLBACK-A P:', pressures, 'T:', temps);
                    if (!result.tekananA106 && pressures[0] != null) result.tekananA106 = pressures[0].toFixed(3);
                    if (!result.tekananA129 && pressures[1] != null) result.tekananA129 = pressures[1].toFixed(3);
                    if (!result.suhuA102    && temps[0] != null)     result.suhuA102    = temps[0].toFixed(1);
                    if (!result.suhuA125    && temps[1] != null)     result.suhuA125    = temps[1].toFixed(1);
                    break;
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
        for (let i = 0; i < lines.length; i++) {
            if (/lowest|highest|process\s*ok/i.test(lines[i])) {
                for (let j = i - 1; j >= Math.max(0, i - 8); j--) {
                    const t = findTime(lines[j]);
                    if (t) { result.totalWaktu = t; break; }
                }
                if (result.totalWaktu) break;
            }
        }
    }

    // ════════════════════════════════════════════════════════════
    // FALLBACK C — Waktu section masih kosong (brute-force)
    // ════════════════════════════════════════════════════════════
    if (!result.mulaiSteril) {
        for (let i = 0; i < lines.length; i++) {
            if (/fan\s*steril/i.test(lines[i])) {
                result.mulaiSteril = findTimeInOrAfter(i, 8);
                if (result.mulaiSteril) break;
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

    console.log('=== FINAL RESULT ===', result);
    return result;
}