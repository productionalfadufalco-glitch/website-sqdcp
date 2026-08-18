# Mengaktifkan Live Update PC ↔ HP dengan Supabase

## Mengapa data sebelumnya tidak sama?

Versi awal memakai `localStorage`. Penyimpanan ini hanya berada di browser/perangkat masing-masing. Data yang dimasukkan dari PC tidak pernah dikirim ke GitHub atau ke HP. GitHub Pages hanya menyajikan file HTML/CSS/JavaScript dan bukan database.

Versi ini menambahkan **Supabase Cloud Sync + Realtime**. Setelah dikonfigurasi, PC dan HP akan membaca record dashboard yang sama dan menerima pembaruan otomatis.

## Langkah 1 — Buat project Supabase

1. Buka https://supabase.com dan masuk.
2. Pilih **New project**.
3. Isi nama, misalnya `alfa-valves-sqdcp`.
4. Pilih region terdekat, lalu tunggu project siap.

## Langkah 2 — Buat tabel dan policy

1. Di Supabase, buka **SQL Editor**.
2. Klik **New query**.
3. Salin seluruh isi file `SUPABASE-SETUP.sql`.
4. Klik **Run**.
5. Pastikan hasil terakhir menampilkan record `pt-alfa-valves-indonesia-main`.

Script tersebut juga mendaftarkan tabel ke Supabase Realtime.

## Langkah 3 — Isi konfigurasi website

1. Di Supabase, buka **Project Settings → API** atau menu **Connect**.
2. Salin:
   - **Project URL**
   - **Publishable key** atau legacy **anon public key**
3. Buka file `supabase-config.js` di repository GitHub.
4. Isi seperti contoh berikut:

```js
window.SUPABASE_CONFIG = {
  url: 'https://PROJECT-REF.supabase.co',
  anonKey: 'sb_publishable_xxxxxxxxx',
  dashboardId: 'pt-alfa-valves-indonesia-main'
};
```

5. Commit perubahan ke branch yang dipakai GitHub Pages.
6. Tunggu status **Actions/Deployments** selesai.

> Jangan pernah memasukkan `service_role key`. Gunakan hanya Publishable key atau anon public key.

## Langkah 4 — Sinkronisasi pertama dan verifikasi

> Penting: karena data terbaru saat ini berada di localStorage PC, lakukan pembukaan pertama dari **PC tersebut**. Tutup halaman dashboard di HP sampai langkah 2 selesai.

1. Buka website di PC yang menyimpan data terbaru dan lakukan hard refresh (`Ctrl+Shift+R`).
2. Tunggu indikator di kanan judul berubah menjadi **“Live • Cloud tersinkron”**. Data lokal PC akan menjadi data awal cloud jika database masih kosong.
3. Setelah itu, buka website di HP dan refresh halaman.
4. Indikator di HP juga harus berubah menjadi **“Live • Cloud tersinkron”**.
5. Ubah satu nilai dari PC.
6. Dalam kondisi normal, HP menerima pembaruan otomatis kurang dari beberapa detik tanpa impor Excel.

Jika indikator masih **“Mode lokal • Cloud belum diatur”**, file `supabase-config.js` pada GitHub Pages belum berisi URL/key atau versi deploy belum terbaru.

Jika indikator menunjukkan **“Cloud terputus”**:

- periksa URL dan key;
- pastikan `SUPABASE-SETUP.sql` sudah dijalankan;
- pastikan nama tabel adalah `sqdcp_dashboard`;
- cek browser Console untuk pesan error;
- periksa bahwa project Supabase tidak sedang paused.

## Perilaku sinkronisasi

Yang disinkronkan:

- seluruh data bulanan;
- target KPI;
- action plan;
- hari libur kustom.

Yang tetap khusus per perangkat:

- bahasa;
- tema terang/gelap;
- halaman/kategori yang sedang dibuka;
- pilihan bulan yang sedang ditampilkan.

Jika internet terputus, perubahan tetap tersimpan di browser dan dashboard mencoba mengirim ulang saat koneksi cloud tersedia.

## Catatan keamanan mode PUBLIC

Konfigurasi saat ini mengikuti pilihan **akses publik tanpa login**. Artinya, siapa pun yang mengetahui URL website dapat membaca dan mengubah data melalui website/API. Mode ini praktis, tetapi tidak cocok untuk data rahasia.

Untuk penggunaan produksi yang lebih aman, disarankan versi berikutnya memakai Supabase Authentication sehingga publik hanya dapat melihat dan staf wajib login untuk mengubah data.
