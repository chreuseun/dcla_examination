const bcrypt = require('bcryptjs');

const unhash = (string, hash) => {
    var unhash =bcrypt.compareSync(string, hash);
    return(unhash);
}

module.exports = unhash
