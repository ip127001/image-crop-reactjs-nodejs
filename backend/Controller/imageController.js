const sharp = require('sharp');
const ImageModel = require('../model/image');

exports.imageController = (req, res, next) => {
    console.log('her i am ahere', req.file.path);
    let imagePosition = req.body.select;
    sharp(req.file.path)
    .resize({
        width: 755,
        height: 450,
        fit: sharp.fit.cover,
        position: imagePosition
    })
    .toFile('images/horizontal.jpeg')
    .then(file_info => {
        sharp(req.file.path)
        .resize({
            width: 365,
            height: 450,
            fit: sharp.fit.cover,
            position: imagePosition
        })
        .toFile('images/vertical.jpeg')
        .then(file_info => {
            sharp(req.file.path)
            .resize({
                width: 365,
                height: 212,
                fit: sharp.fit.cover,
                position: imagePosition
            })
            .toFile('images/small.jpeg')
            .then(file_info => {
                sharp(req.file.path)
                .resize({
                    width: 380,
                    height: 380,
                    fit: sharp.fit.cover,
                    position: imagePosition
                })
                .toFile('images/gallary.jpeg')
                .then(file_info => {
                    console.log('file-info', file_info);
                    console.log("Image cropped and saved");
                    res.json({message: 'image cropped'})
                })
            })
        })
    })
    .catch(err => {
        console.log("An error occured");
    });
}