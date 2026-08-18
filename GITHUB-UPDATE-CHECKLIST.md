# Checklist Update GitHub Pages — Live Sync v1.1

1. Download dan ekstrak paket versi Live Sync.
2. Di Supabase, jalankan `SUPABASE-SETUP.sql` melalui SQL Editor.
3. Isi `url` dan `anonKey` di `supabase-config.js`.
4. Upload/replace file berikut di repository GitHub:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `supabase-config.js`
   - `SUPABASE-SETUP.sql`
   - `CLOUD-SYNC-GUIDE.md`
   - `README.md`
   - `vendor/supabase.min.js`
5. Pastikan file vendor lama tetap ada:
   - `vendor/xlsx.full.min.js`
   - `vendor/html2canvas.min.js`
   - `vendor/jspdf.umd.min.js`
6. Tunggu bagian **Deployments → github-pages** berstatus hijau.
7. Tutup dashboard pada HP untuk sementara.
8. Di PC yang menyimpan data terbaru, tekan `Ctrl+Shift+R` dan tunggu indikator **Live • Cloud tersinkron**.
9. Setelah PC tersinkron, buka/refresh dashboard di HP.
10. Jika HP masih memuat versi lama, hapus cache situs atau buka URL dengan parameter sementara, misalnya:

```
https://NAMA-USER.github.io/NAMA-REPO/?v=1.1
```

Parameter tersebut tidak mengubah data; hanya membantu memaksa browser mengambil versi deployment terbaru.
