/**
 * pegawaiController.js
 * Controller untuk dashboard dan halaman-halaman khusus pegawai.
 * Author: Mahasiswa 3 - Taris Rafivdean
 */

/**
 * Menampilkan halaman dashboard pegawai.
 * Hanya bisa diakses oleh user dengan role 'pegawai'.
 */
const showDashboard = (req, res) => {
    const user = req.session.user;

    res.render('dashboard/pegawai', {
        user: user,
        title: 'Dashboard Pegawai',
        activePage: 'dashboard'
    });
};

module.exports = {
    showDashboard
};
