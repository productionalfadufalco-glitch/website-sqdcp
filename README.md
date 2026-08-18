# S+QDCP Command Center
## PT. ALFA VALVES INDONESIA

**Versi 1.2 — Aturan Warna Harian + Supabase Cloud Sync/Realtime**

Dashboard web statis untuk pemantauan **Safety, 5S, Quality, Delivery, Cost, dan People** selama satu bulan penuh.

## Fitur

- Overview enam kartu KPI dengan kontur tanggal berbentuk **S, 5, Q, D, C, P**.
- Aturan warna tanggal dengan prioritas: **merah** jika ada Near Miss/Accident pada Safety; **biru** untuk Sabtu, Minggu, libur nasional, dan cuti bersama; **hijau** jika data terisi dan target tercapai; **kuning** jika data terisi tetapi target tidak tercapai; **abu-abu** jika belum ada data.
- Jika kejadian Safety terjadi pada weekend/libur, penanda tetap **merah** agar kejadian tidak tertutupi warna hari libur.
- Input langsung melalui tabel web untuk seluruh tanggal dalam bulan.
- Impor/ekspor workbook Excel enam sheet: `SAFETY`, `5S`, `QUALITY`, `DELIVERY`, `COST`, `PEOPLE`.
- Generator template Excel sesuai bulan aktif.
- Perhitungan otomatis FTP, output testing/painting, extra hours, dan attendance.
- Pengaturan target KPI dan hari libur kustom.
- Action plan per kategori.
- Mode terang/gelap.
- Bahasa Indonesia/Inggris.
- Unduh overview sebagai PDF A3 landscape.
- Responsif untuk desktop, tablet, dan ponsel.
- Penyimpanan lokal sebagai fallback saat internet terputus.
- **Supabase Cloud Sync + Realtime** untuk live update antar-PC dan HP.

## Menjalankan

### Cara termudah

Buka `index.html` di browser modern (Chrome, Edge, atau Firefox).

### Melalui web server lokal

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Lalu buka `http://localhost:4173`.

## Upload ke hosting

Upload **seluruh isi folder ini**, termasuk folder `vendor`, ke folder publik hosting (misalnya `public_html`). Tidak diperlukan PHP, Node.js, atau proses build. Untuk sinkronisasi antarperangkat, buat project Supabase dan ikuti `CLOUD-SYNC-GUIDE.md`.

Cocok untuk:

- cPanel/shared hosting
- Netlify Drop
- GitHub Pages
- Cloudflare Pages
- server intranet statis

## Alur Excel

1. Pilih periode bulan pada header.
2. Buka **Data Harian**.
3. Klik **Template Excel** untuk mengunduh workbook kosong sesuai jumlah hari pada bulan aktif.
4. Isi workbook tanpa mengubah nama sheet atau urutan kolom.
5. Klik **Impor Excel** dan pilih file tersebut.
6. Klik **Unduh Excel** untuk membuat backup data dari browser.

File dari dashboard dapat diimpor kembali ke dashboard. Baris tanggal boleh berisi tanggal Excel asli, format ISO, atau format tanggal umum.

## Pergantian bulan

- Memilih bulan baru otomatis membuat periode terpisah.
- Data bulan lama tidak hilang saat berpindah bulan.
- Tombol **Clear bulan** hanya menghapus data harian pada bulan yang sedang aktif.
- Target, action plan, tema, bahasa, dan hari libur kustom tidak ikut terhapus.

## Kalender libur

Kalender bawaan memuat libur nasional dan cuti bersama Indonesia tahun 2026 berdasarkan SKB 3 Menteri. Weekend selalu terdeteksi otomatis. Untuk tahun lain atau libur perusahaan, buka **Target KPI → Kalender Libur** lalu tambahkan tanggal secara manual.

Sumber kalender 2026: Sekretariat Negara RI — https://setneg.go.id/baca/index/inilah_skb_3_menteri_libur_nasional_dan_cuti_bersama_2026

## Live update PC dan HP

Dashboard mendukung Supabase Realtime. Ikuti langkah lengkap pada **`CLOUD-SYNC-GUIDE.md`**:

1. Buat project Supabase.
2. Jalankan `SUPABASE-SETUP.sql`.
3. Isi Project URL dan Publishable/anon key pada `supabase-config.js`.
4. Commit ke GitHub dan tunggu GitHub Pages selesai deploy.
5. Pastikan indikator berubah menjadi **“Live • Cloud tersinkron”**.

Tanpa konfigurasi Supabase, dashboard tetap berfungsi dalam mode lokal, tetapi data PC dan HP tidak akan sama. Lakukan backup berkala menggunakan **Unduh Excel**.

Konfigurasi SQL yang disertakan memakai akses publik tanpa login sesuai pilihan saat ini. Untuk data produksi yang lebih aman, gunakan Supabase Authentication dan batasi hak edit.
