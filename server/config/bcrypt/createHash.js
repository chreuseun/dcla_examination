var bcrypt = require('bcryptjs');



const hash = (string) => {
    var hash = bcrypt.hashSync(string, 14);
    return hash;
}

module.exports = hash