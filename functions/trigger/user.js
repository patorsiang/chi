const admin = require('firebase-admin');

exports.handler = (change, context) => {
  // Retrieve the current and previous value
  const data = change.after.data();
  const previousData = change.before.data();
  // We'll only update if the name has changed.
  // This is crucial to prevent infinite loops.
  if (!data.admin) {
    return change.after.ref.set({
      admin: false
    }, { merge: true });
  }

  if (data.Photo !== previousData.Photo || data.displayName !== previousData.displayName) {
    return admin.firestore().collection('notification')
      .where("owner.User_UID", "==", context.params.userId)
      .get().then(querySnapshot => {
        return querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            admin.firestore().collection('notification').doc(doc.id).set({
              owner: {
                User_UID: context.params.userId,
                displayName: data.displayName,
                Photo: data.Photo
              }
            }, {merge: true})
        });
      }).then(() => {
        // eslint-disable-next-line promise/no-nesting
        return admin.firestore().collection('diary')
        .where("writer.User_UID", "==", context.params.userId)
        .get().then(querySnapshot => {
          return querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            admin.firestore().collection('notification').doc(doc.id).set({
              writer: {
                User_UID: context.params.userId,
                displayName: data.displayName,
                Photo: data.Photo
              }
            }, { merge: true })
          });
        })})
  }

  return null;
}
