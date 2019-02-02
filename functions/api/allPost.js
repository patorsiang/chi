const admin = require('firebase-admin');

exports.handler = (data, context) => {
    return admin.firestore().collection('diary').get().then(
        snapshot => {
            return snapshot.docs.filter(doc => {
                if (!doc.data().public) {
                    return false
                }
                return true
            }).map(
                post => {
                    return post.data()
                }
            )
        }
    )
}