const jwt = require('jsonwebtoken');
const secretKey = require('./../privatekey')

const verifyToken = (token) => {
    
    var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV1bmlsbGVVU0VSIiwiX2lkIjoiNWRmNWMzYjIzYTE4Yjk0MDM4NzA5MmI0IiwiaWF0IjoxNTc2NjI2Mjg3LCJleHAiOjE1NzY3MTI2ODd9.sYFVtnwdv3Euucut7AZHbQRxoHMOC-9_88tWwzmatR4', secretKey);

}

module.exports = verifyToken


