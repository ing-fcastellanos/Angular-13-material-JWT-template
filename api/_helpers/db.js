const config = require('config.json');
const mongoose = require('mongoose');

var currentConfig;
switch (process.env.NODE_ENV) {
    case "PROD": currentConfig = config['PROD']; break;
    case "QA": currentConfig = config['QA']; break;
    case "DEV": currentConfig = config['DEV']; break;
    default: currentConfig = config['PROD']; break;
} 

console.log('Conectando a MongoDB: ', currentConfig.connectionString);
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || currentConfig.connectionString, connectionOptions).then(result => {
    //console.log(result);
});
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('accounts/account.model'),
    RefreshToken: require('accounts/refresh-token.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}