const showDashboard = (req, res) => {

    res.render('layouts/main', {
        title: 'Dashboard Admin',
        pageStyle: 'admin',
        view: 'dashboard/admin',
        user: req.session.user,
        activePage: 'dashboard'
    });

};

module.exports = {
    showDashboard
};