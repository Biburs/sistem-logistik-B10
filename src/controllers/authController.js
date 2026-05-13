const bcrypt = require('bcrypt');
const authService = require('../services/authService');

const showLogin = (req, res) => {
    res.render('auth/login', {
        error: null,
        oldEmail: ''
    });
};

const login = (req, res) => {

    const { email, password } = req.body;

    // Pesan error generic - sama untuk semua kegagalan login
   
    const GENERIC_ERROR = 'Email atau password salah';

    authService.findUserByEmail(email, async (err, result) => {

        // Database error - tampilkan ke halaman login juga
        if (err) {
            console.error('DB Error:', err);
            return res.render('auth/login', {
                error: 'Terjadi kesalahan sistem. Silakan coba lagi.',
                oldEmail: email
            });
        }

        // User tidak ditemukan - pakai pesan generic
        if (result.length === 0) {
            return res.render('auth/login', {
                error: GENERIC_ERROR,
                oldEmail: email
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        // Password salah - pakai pesan generic yang SAMA
        if (!isMatch) {
            return res.render('auth/login', {
                error: GENERIC_ERROR,
                oldEmail: email
            });
        }

        // Validasi: pastikan user punya role
        if (!user.role) {
            console.error('User tidak punya role:', user.email);
            return res.render('auth/login', {
                error: 'Akun belum memiliki role. Hubungi administrator.',
                oldEmail: email
            });
        }

        req.session.user = {
            id: user.id,
            nama: user.nama,
            role: user.role
        };

        console.log('✅ Login sukses:', req.session.user);

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.render('auth/login', {
                    error: 'Gagal menyimpan sesi. Silakan coba lagi.',
                    oldEmail: email
                });
            }

            if (user.role === 'admin') {
                return res.redirect('/admin');
            }

            if (user.role === 'pegawai') {
                return res.redirect('/pegawai');
            }

            // Fallback - role tidak dikenali
            return res.render('auth/login', {
                error: 'Role tidak dikenali. Hubungi administrator.',
                oldEmail: email
            });
        });

    });

};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Logout gagal');
        }
        res.redirect('/login');
    });
};

module.exports = {
    showLogin,
    login,
    logout
};