const admin = require('firebase-admin');

exports.handler = (data, context) => {    
    return admin.firestore().collection('user').get().then(
        snapshot => {
            return snapshot.docs.filter(doc => {
                if (!doc.data().displayName.toUpperCase().includes(data.keyword.toUpperCase())) {
                    return false
                }
                return true
            }).map(
                user => {
                    return user.id
                }
            )
        }
    )
}