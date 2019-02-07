const mkdirp = require('mkdirp-promise')
const { Storage } = require('@google-cloud/storage');
const path = require('path')
const os = require('os')
const fs = require('fs')
const gm = require('gm').subClass({ imageMagick: true });
const spawn = require('child-process-promise').spawn;

exports.handler = (object) => {
    const filePath = object.name
    const bucketName = object.bucket
    const metadata = object.metadata

    if (metadata.RilcaWaterMark) {
        console.log('This is already added RILCA Water Mark')
        return null
    }

    const tempLocalFile = path.join(os.tmpdir(), filePath)
    const tempLocalDir = path.dirname(tempLocalFile)

    const storage = new Storage();
    const bucket = storage.bucket(bucketName)

    if (!filePath.startsWith('WYHLMiznfHekKgd3qgQQfHTj6S82/')) {
        if (!object.contentType.startsWith('image/')) {
            console.log('This is not an image.')
            return null
        }
    
        if (!metadata.autoOrientNResize) {
            console.log('This has not rotated yet')
            return null
        }
        console.log('This is not an image from center.')
        return mkdirp(tempLocalDir).then(() => {
            // Download file from bucket.
            return bucket.file(filePath).download({ destination: tempLocalFile })
        }).then(() => {
            metadata.RilcaWaterMark = true
            return bucket.upload(tempLocalFile, {
                destination: filePath,
                metadata: { metadata: metadata }
            })
        }).then(() => {
            console.log('image uploaded to Storage at', filePath)
            // Once the image has been converted delete the local files to free up disk space.
            fs.unlinkSync(tempLocalFile)
            return console.log('Deleted local file', filePath)
        })
       
    }

    const font = 'Arial.ttf';
    const logo = 'BharatMahidol.png';

    const fontTempFile = path.join(os.tmpdir(), font);
    const logoTempFile = path.join(os.tmpdir(), logo);

    // const fontLocalDir = path.dirname(fontTempFile)
    // const logoLocalDir = path.dirname(logoTempFile)

    if (!object.contentType.startsWith('image/')) {
        console.log('This is not an image.')
        return null
    }

    if (!metadata.autoOrientNResize) {
        console.log('This has not rotated yet')
        return null
    }

    return mkdirp(tempLocalDir).then(() => {
        // Download file from bucket.
        return bucket.file(filePath).download({ destination: tempLocalFile })
    }).then(() => {
        return bucket.file(font).download({ destination: fontTempFile })
    }).then(() => {
        return bucket.file(logo).download({ destination: logoTempFile })
    }).then(() => {
        console.log('The file has been downloaded to', tempLocalFile)
        // Convert the image using ImageMagick.
        return new Promise((resolve, reject) => {
            gm(tempLocalFile)
                .size((err, size) => {
                    if (!err) {
                        gm(tempLocalFile)
                            .drawRectangle(0, size.height - 100, size.width, size.height)
                            .font(fontTempFile, 25)
                            .fill("#FFA500")
                            .drawText(25, size.height - 50, "Centre for Bharat Studies")
                            .fill("#fff")
                            .drawText(25, size.height - 25, "Research Institute for Languages and Cultures of Asia, Mahidol University")
                            .write(tempLocalFile, (err, stdout) => {
                                if (err) {
                                    console.error('Failed to box.', err);
                                    reject(err);
                                } else {
                                    resolve(stdout);
                                }
                            })
                    }
                })
        });
    }).then(() => {
        return new Promise((resolve, reject) => {
            gm(logoTempFile)
                .resize(100, 100, '!')
                .write(logoTempFile, (err, stdout) => {
                    if (err) {
                        console.error('Failed to box.', err);
                        reject(err);
                    } else {
                        resolve(stdout);
                    }
                })
        })
    }).then(() => {
        return spawn('convert', [tempLocalFile, logoTempFile, '-gravity', 'SouthEast', '-composite', tempLocalFile]);
    }).then(() => {
        console.log('add watermark image created at', tempLocalFile)
        metadata.RilcaWaterMark = true
        return bucket.upload(tempLocalFile, {
            destination: filePath,
            metadata: { metadata: metadata }
        })
    }).then(() => {
        console.log('image uploaded to Storage at', filePath)
        // Once the image has been converted delete the local files to free up disk space.
        fs.unlinkSync(tempLocalFile)
        fs.unlinkSync(logoTempFile)
        fs.unlinkSync(fontTempFile)
        return console.log('Deleted local file', filePath)
    })
}