/**
 * errorMiddleware.js
 * Middleware untuk penanganan error global (404 & 500).
 * Author: Mahasiswa 3 - Taris Rafivdean
 */

/**
 * Handler untuk rute yang tidak ditemukan (404 Not Found).
 * Dipanggil ketika tidak ada route yang cocok.
 */
const notFound = (req, res, next) => {
    const err = new Error(`Halaman tidak ditemukan: ${req.originalUrl}`);
    err.status = 404;
    next(err);
};

/**
 * Handler error global (500 Internal Server Error).
 * Express mengenali middleware ini sebagai error handler
 * karena memiliki 4 parameter: (err, req, res, next).
 */
const errorHandler = (err, req, res, next) => {

    const statusCode = err.status || 500;

    // Log error ke konsol (berguna untuk debugging)
    console.error(`[ERROR ${statusCode}] ${err.message}`);

    // Render halaman error yang sesuai
    if (statusCode === 404) {
        return res.status(404).render('errors/404', {
            user: req.session.user || null,
            message: err.message
        });
    }

    return res.status(500).render('errors/500', {
        user: req.session.user || null,
        message: 'Terjadi kesalahan pada server. Silakan coba lagi.'
    });
};

module.exports = {
    notFound,
    errorHandler
};
