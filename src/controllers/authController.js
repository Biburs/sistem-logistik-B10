const bcrypt = require('bcrypt');
const authService = require('../services/authService');

const showLogin = (req, res) => {
    res.render('auth/login');
};

const login = (req, res) => {

    const { email, password } = req.body;

    authService.findUserByEmail(email, async (err, result) => {

        if (err) {
            return res.send('Terjadi error');
        }

        if (result.length === 0) {
            return res.send('User tidak ditemukan');
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send('Password salah');
        }

        req.session.user = {
            id: user.id,
            nama: user.nama,
            role: user.role
        };

        if (user.role === 'admin') {
            return res.redirect('/admin');
        }

        if (user.role === 'pegawai') {
            return res.redirect('/pegawai');
        }

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