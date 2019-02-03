const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

exports.handler = (data, context) => {
    const ref = storage.bucket('app-chi.appspot.com').file(`${data.id}/${data.file}`)

    // Get metadata properties
    return ref.getMetadata().then((metadata) => {
        // Metadata now contains the metadata for 'images/forest.jpg'
        if (metadata[0].metadata.tags){
            if (!metadata[0].metadata.tags.toUpperCase().includes(data.keyword.toUpperCase())) {
                return false
            } 
            return true
        } else {
            return false
        }
    }).catch((error) => {
        // Uh-oh, an error occurred!
        return error
    });
}