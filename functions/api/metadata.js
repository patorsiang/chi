const functions = require('firebase-functions')

exports.handler = (data, context) => {
    const ref = functions.storage().refFromURL(data.file)
    // Get metadata properties
    return ref.getMetadata().then((metadata) => {
        // Metadata now contains the metadata for 'images/forest.jpg'
        if (metadata[0].metadata.safeAdult.includes('UNLIKELY')) {//&& metadata[0].metadata.safeMedical.includes('UNLIKELY') && metadata[0].metadata.safeRacy.includes('UNLIKELY') && metadata[0].metadata.safeSpoof.includes('UNLIKELY') && metadata[0].metadata.safeViolence.includes('UNLIKELY')) {
            return { safe: 'safe', tags: metadata[0].metadata.tags.split(','), themes: metadata[0].metadata.themes.split(',') }
        } else if (metadata[0].metadata.safeAdult.includes('LIKELY')) {//|| metadata[0].metadata.safeMedical.includes('LIKELY') || metadata[0].metadata.safeRacy.includes('LIKELY') || metadata[0].metadata.safeSpoof.includes('LIKELY') || metadata[0].metadata.safeViolence.includes('LIKELY')) {
            return { safe: 'bad', tags: metadata[0].metadata.tags.split(','), themes: metadata[0].metadata.themes.split(',') }
        } else {
            return { safe: 'maybe', tags: metadata[0].metadata.tags.split(','), themes: metadata[0].metadata.themes.split(',') }
        }
    }).catch((error) => {
        // Uh-oh, an error occurred!
        return error
    });
}
