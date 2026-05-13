/**
 * permissionMiddleware.js
 * Middleware untuk validasi hak akses berdasarkan role (ACL).
 * Author: Mahasiswa 3 - Taris Rafivdean
 */

/**
 * Membuat middleware yang hanya mengizinkan akses untuk role tertentu.
 * @param {...string} allowedRoles - Daftar role yang diperbolehkan (contoh: 'admin', 'pegawai')
 * @returns {Function} Express middleware
 */
const checkRole = (...allowedRoles) => {
    return (req, res, next) => {

        // Pastikan user sudah login (session tersedia)
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const userRole = req.session.user.role;

        // Cek apakah role user termasuk dalam role yang diizinkan
        if (!allowedRoles.includes(userRole)) {
            // Kirim ke halaman 403 Forbidden
            return res.status(403).render('errors/403', {
                user: req.session.user
            });
        }

        next();
    };
};

/**
 * Middleware khusus: hanya untuk role 'pegawai'.
 */
const isPegawai = checkRole('pegawai');

/**
 * Middleware khusus: hanya untuk role 'admin'.
 */
const isAdmin = checkRole('admin');

/**
 * Middleware khusus: untuk admin atau pegawai.
 */
const isAuthenticated = checkRole('admin', 'pegawai');

module.exports = {
    checkRole,
    isPegawai,
    isAdmin,
    isAuthenticated
};
