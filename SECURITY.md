# Dokumentasi Keamanan

## Masalah Keamanan yang Ditemukan

### 1. XSS (Cross-Site Scripting)

**Masalah:** Input HTML dari user bisa menjadi vektor serangan XSS jika ditampilkan langsung tanpa sanitasi.

**Contoh Input Berbahaya:**

```html
<p>Konten normal</p>
<script>
  alert("XSS");
</script>
<img src="x" onerror="alert('XSS')" />
<iframe src="javascript:alert('XSS')"></iframe>
```

### 2. SQL Injection

**Masalah:** Meskipun menggunakan Sequelize ORM, tetap ada risiko jika input tidak divalidasi dengan benar.

## Solusi yang Diterapkan

### 1. Sanitasi HTML dengan DOMPurify

- **Library:** `dompurify` dan `jsdom`
- **Fungsi:** Membersihkan HTML dari tag dan atribut berbahaya
- **Tag yang Diizinkan:** `p`, `br`, `strong`, `em`, `u`, `h1-h6`, `ul`, `ol`, `li`, `blockquote`
- **Atribut yang Diizinkan:** `class`, `style`

### 2. Validasi Input

- **Panjang Maksimal:** 10KB untuk konten, 200 karakter untuk judul
- **Tipe Data:** Memastikan input adalah string
- **Trim:** Menghapus whitespace di awal dan akhir

### 3. Middleware Validasi

- **File:** `src/middleware/validation.js`
- **Fungsi:** `sanitizeBeritaInput()` untuk endpoint berita
- **Fungsi:** `sanitizeGeneralInput()` untuk input umum

## Implementasi

### Controller Berita (`src/controllers/beritaControllers.js`)

```javascript
// Sebelum
isi: konten, // langsung disimpan tanpa sanitasi

// Sesudah
isi: konten, // sudah disanitasi oleh middleware
ringkasan: konten.replace(/<[^>]*>/g, '').substring(0, 100), // menghapus HTML untuk ringkasan
```

### Router Berita (`src/routers/beritaRouter.js`)

```javascript
// Menambahkan middleware validasi
routers.post(
  "/post",
  uploader.single("gambar"),
  sanitizeBeritaInput,
  beritaControllers.postBerita
);
```

## Testing Keamanan

### Test Case 1: XSS Prevention

```javascript
// Input berbahaya
const maliciousInput = '<p>Konten normal</p><script>alert("XSS")</script>';

// Setelah sanitasi
// Hasil: '<p>Konten normal</p>' (script tag dihapus)
```

### Test Case 2: Input Validation

```javascript
// Input terlalu panjang
const longInput = "a".repeat(15000); // 15KB
// Hasil: Error 400 - "Konten tidak valid atau terlalu panjang"
```

### Test Case 3: SQL Injection Prevention

```javascript
// Input dengan karakter khusus
const sqlInjection = "'; DROP TABLE berita; --";
// Hasil: Aman karena menggunakan Sequelize ORM dengan parameter binding
```

## Rekomendasi Tambahan

### 1. Content Security Policy (CSP)

Tambahkan header CSP di frontend:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'"
/>
```

### 2. Rate Limiting

Implementasi rate limiting untuk mencegah spam:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // maksimal 100 request per IP
});
```

### 3. Input Logging

Log semua input untuk monitoring:

```javascript
console.log("Input validation:", {
  judul: req.body.judul,
  kontenLength: req.body.konten.length,
  timestamp: new Date().toISOString(),
});
```

### 4. Regular Security Audit

- Update dependencies secara berkala
- Scan vulnerability dengan `npm audit`
- Test penetration testing

## Dependencies Keamanan

```json
{
  "dompurify": "^3.0.8",
  "jsdom": "^24.0.0"
}
```

## Monitoring

- Monitor log error untuk pattern mencurigakan
- Alert jika ada input yang terlalu panjang atau berisi karakter berbahaya
- Regular backup database
