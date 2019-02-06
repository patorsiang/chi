// Imports the Google Cloud client library
const language = require('@google-cloud/language');
// Creates a client
const client = new language.LanguageServiceClient();

exports.handler = (change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();
    const previousData = change.before.data();
    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (previousData.theme){
        if (data.theme.toString() === previousData.theme.toString()) return null;
    }

    const document = {
        content: data.tag.toString(),
        type: 'PLAIN_TEXT',
    };

    return client.analyzeEntities({ document: document })
        .then((results) => {
            const entities = results[0].entities;
            const theme = [...new Set(entities.map(entity => entity.type))].toString();
            // Then return a promise of a set operation to update the count
            return change.after.ref.set({
                theme: theme
            }, { merge: true });
        })
}