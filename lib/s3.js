const S3 = require('aws-sdk/clients/s3');

//Deals with AWS image upload
module.exports = new S3({
  region: 'eu-west-1',
  params: { Bucket: 'wdildnproject2' },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});
