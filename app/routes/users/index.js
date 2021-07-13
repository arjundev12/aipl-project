/* used for combining all routes and exporting only index
    dirs array for protecting acidental dir added in routes.
*/

var express = require('express')
  ,router = express.Router()
var fs = require('fs');
const currentPath = __dirname;
//const dirs = ['admin', 'customer'];

    fs.readdirSync(`${currentPath}`).forEach(function(file) {
        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
            return;
        var name = file.substr(0, file.indexOf('.'));
        router.use(require(`./${name}`));
    });

module.exports = router