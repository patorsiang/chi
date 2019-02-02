const admin = require('firebase-admin');

exports.handler = (data, context) => {
    return admin.firestore().collection('user').doc(data.id).get().then(
        snapshot => {
            return snapshot.data()
        }
    )
}