Amazon S3 Dropbox: s3drop
=========================
Create a function to drop files into an Amazon S3 bucket.

Example
-------
```js
const fs = require("fs");
const s3drop = require("s3drop");
const bucket = "my-bucket";
const filename = "my-file.txt";
const file = fs.createReadStream(filename);

// create drop function for S3 bucket
const drop = s3drop(bucket);

// set arbitrary metadata
const metadata = {filename};

// if content-type set in metadata, it will be set on S3 object
metadata["content-type"] = "text/plain";

// use drop function to store file to S3
drop(file, metadata).then(key => {
    console.log(`s3://${bucket}/${key}`);
}).catch(err => {
    console.error(err.message);
});
```
