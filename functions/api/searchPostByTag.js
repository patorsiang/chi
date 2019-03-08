const admin = require('firebase-admin');

exports.handler = (data, context) => {
    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        return admin.firestore().collection('diary').orderBy("date", "desc").get().then(
            snapshot => {
                return snapshot.docs.filter(doc => {
                    if (!doc.data().public) {
                        return false
                    }
                    if (doc.data().tag) {
                        if (!doc.data().tag.toString().toUpperCase().includes(data.keyword.toUpperCase())) {
                            return false
                        }
                    } else {
                        return false
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

    return admin.firestore().collection('diary').get().then(
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
                if (doc.data().tag) {
                    if (!doc.data().tag.toString().toUpperCase().includes(data.keyword.toUpperCase())) {
                        return false
                    }
                } else {
                    return false
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
