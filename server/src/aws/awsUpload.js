const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIA2KK7V26FY5YD3MFM",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const uploadFile = async (files) => {
  return new Promise(function (resolve, reject) {
    let s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    let uploadParams = {
      ACL: "public-read",
      Bucket: "geekybytes",
      Key: "Geeky/Blog-Management/" + files.originalname,
      Body: files.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      return resolve(data.Location);
    });
  });
};

module.exports.uploadFile = uploadFile;
