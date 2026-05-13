const bcrypt = require('bcrypt');

async function generatePassword() {

    const hash = await bcrypt.hash('pegawai123', 10);

    console.log(hash);

}

generatePassword();