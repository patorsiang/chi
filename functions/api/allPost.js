const admin = require('firebase-admin');

exports.handler = (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        return admin.firestore().collection('diary').orderBy("date", "desc").get().then(
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

    return admin.firestore().collection('diary').orderBy("date", "desc").get().then(
        snapshot => {
            return snapshot.docs.filter(doc => {
                if (!doc.data().public) {
                    return false
                }
                if (doc.data().report) {
                    if (doc.data().report.includes(context.auth.uid)) {
                        return false
                    }
                }
                return true
            }).map(
                post => {
                    return {
                        id: post.id,
                        data: post.data()
                    }
                }
            )
        }
    )
}
