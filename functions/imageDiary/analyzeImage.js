// const vision = require('@google-cloud/vision')({
//     projectId: 'your-project-id',
//     keyfileName: '../config/serviceAccountKey.json'
// });

const vision = require('@google-cloud/vision');
const visionClient = new vision.ImageAnnotatorClient();

// const language = require('@google-cloud/language');
// const languageClient = new language.LanguageServiceClient();

const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const path = require('path')
const os = require('os')
const mkdirp = require('mkdirp-promise')
const fs = require('fs')

exports.handler = (object) => {
    const filePath = object.name
    const bucketName = object.bucket
    const metadata = object.metadata

    const tempLocalFile = path.join(os.tmpdir(), filePath)
    const tempLocalDir = path.dirname(tempLocalFile)

    if (!metadata.RilcaWaterMark) {
        console.log('not add water mark');
        return null
    }

    if (metadata.tags) {
        console.log('already to look the meaning of the image');
        return null
    }

    const bucket = storage.bucket(bucketName)
    const imageUri = `gs://${bucketName}/${filePath}`;

    return mkdirp(tempLocalDir).then(() => {
        // Download file from bucket.
        return bucket.file(filePath).download({ destination: tempLocalFile })
    }).then(() => {
        return visionClient.labelDetection(imageUri);
    }).then((response) => {
        metadata.tags = response[0].labelAnnotations.map(obj => obj.description).toString()
        return bucket.upload(tempLocalFile, {
            destination: filePath,
            metadata: { metadata: metadata }
        })
    }).then(() => {
        return visionClient.safeSearchDetection(imageUri);
    }).then((response) => {
        const detections = response[0].safeSearchAnnotation;
        console.log(detections);
        
        metadata.safeAdult = detections.adult
        // metadata.safeMedical = detections.medical
        // metadata.safeSpoof = detections.spoof
        // metadata.safeViolence = detections.violence
        // metadata.safeRacy = detections.racy

        return bucket.upload(tempLocalFile, {
            destination: filePath,
            metadata: { metadata: metadata }
        })
        // console.log(response[0].safeSearchAnnotation.map(obj => obj.detections));
        // return
    }).then(() => {
        console.log('image uploaded to Storage at', filePath)
        // Once the image has been converted delete the local files to free up disk space.
        fs.unlinkSync(tempLocalFile)
        return console.log('Deleted local file', filePath)
    })
}