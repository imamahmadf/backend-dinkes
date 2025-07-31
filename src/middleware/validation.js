const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Fungsi untuk sanitasi HTML
const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
    ],
    ALLOWED_ATTR: ["class", "style"],
    KEEP_CONTENT: true,
  });
};

// Fungsi untuk validasi input
const validateInput = (input, maxLength = 10000) => {
  if (typeof input !== "string") return false;
  if (input.length > maxLength) return false;
  return true;
};

// Middleware untuk sanitasi input berita
const sanitizeBeritaInput = (req, res, next) => {
  try {
    const { judul, konten, bidang, tema } = req.body;

    // Validasi input
    if (!validateInput(judul, 200)) {
      return res.status(400).json({
        message:
          "Judul tidak valid atau terlalu panjang (maksimal 200 karakter)",
        code: 400,
      });
    }

    if (!validateInput(konten, 10000)) {
      return res.status(400).json({
        message: "Konten tidak valid atau terlalu panjang (maksimal 10KB)",
        code: 400,
      });
    }

    // Sanitasi input
    req.body.judul = judul.trim();
    req.body.konten = sanitizeHTML(konten);

    // Validasi bidang dan tema
    if (bidang && (isNaN(bidang) || parseInt(bidang) <= 0)) {
      return res.status(400).json({
        message: "Bidang tidak valid",
        code: 400,
      });
    }

    if (tema && (isNaN(tema) || parseInt(tema) <= 0)) {
      return res.status(400).json({
        message: "Tema tidak valid",
        code: 400,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error dalam validasi input",
      code: 500,
    });
  }
};

// Middleware untuk sanitasi input umum
const sanitizeGeneralInput = (req, res, next) => {
  try {
    // Sanitasi semua string input
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error dalam sanitasi input",
      code: 500,
    });
  }
};

// Middleware untuk sanitasi input informasi
const sanitizeInformasiInput = (req, res, next) => {
  try {
    const { judul, konten, ringkasan, tahun, jenis } = req.body;

    // Validasi input
    if (!validateInput(judul, 200)) {
      return res.status(400).json({
        message:
          "Judul tidak valid atau terlalu panjang (maksimal 200 karakter)",
        code: 400,
      });
    }

    if (!validateInput(konten, 10000)) {
      return res.status(400).json({
        message: "Konten tidak valid atau terlalu panjang (maksimal 10KB)",
        code: 400,
      });
    }

    if (ringkasan && !validateInput(ringkasan, 1000)) {
      return res.status(400).json({
        message:
          "Ringkasan tidak valid atau terlalu panjang (maksimal 1000 karakter)",
        code: 400,
      });
    }

    // Sanitasi input
    req.body.judul = judul.trim();
    req.body.konten = sanitizeHTML(konten);
    if (ringkasan) {
      req.body.ringkasan = ringkasan.trim();
    }

    // Validasi tahun
    if (
      tahun &&
      (isNaN(tahun) ||
        parseInt(tahun) < 1900 ||
        parseInt(tahun) > new Date().getFullYear() + 10)
    ) {
      return res.status(400).json({
        message: "Tahun tidak valid",
        code: 400,
      });
    }

    // Validasi jenis informasi
    if (jenis && (isNaN(jenis) || parseInt(jenis) <= 0)) {
      return res.status(400).json({
        message: "Jenis informasi tidak valid",
        code: 400,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error dalam validasi input",
      code: 500,
    });
  }
};

module.exports = {
  sanitizeHTML,
  validateInput,
  sanitizeBeritaInput,
  sanitizeInformasiInput,
  sanitizeGeneralInput,
};
