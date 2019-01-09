const {promisify} = require("util");
const {randomBytes} = require("crypto");
const AWS = require("aws-sdk");
const sync = require("@zingle/sync");

/**
 * Configure S3 dropbox.
 * @param {string} bucket
 */
function s3drop(bucket) {
    return async function dropFile(data, metadata={}) {
        const done = sync();
        const params = makeParams(metadata);
        const key = params.Key;
        const object = new AWS.S3({params});

        object.upload({Body: data}).send(done);

        return done.promise.then(() => key);
    };

    function makeParams(metadata) {
        const Bucket = bucket;
        const Key = randomBytes(8).toString("hex");
        const Metadata = metadata;
        const params = {Bucket, Key, Metadata};

        if (metadata["content-type"]) {
            params.ContentType = metadata["content-type"];
        }

        return params;
    }
}

module.exports = s3drop;
