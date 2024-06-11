const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (callBack) => {
        MongoClient.connect('mongodb://localhost:27017/ECO16D')
            .then((client) => {
                dbConnection = client.db()
                return callBack()
            })
            .catch(e => {
                console.log(e)
                return callBack(e)
            })
    },
    getDb: () => dbConnection
}