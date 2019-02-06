exports.handler = (change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (!data.read) return null;

    // Then return a promise of a set operation to update the count
    return change.after.ref.delete().then( () => {
        return console.log("Document successfully deleted!");
    }).catch((error) => {
        return console.error("Error removing document: ", error);
    });
}