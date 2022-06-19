//When I want to require a directory I have to make a file called index that keeps them all together

const blue = require('./blue')
const sadie = require('./saide')
const janet = require('./janet')

const allCats = [blue, sadie, janet]

module.exports = allCats;