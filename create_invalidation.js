const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let invalidation = {
    Paths: {
        Quantity: 3,
        Items: [ "/*", "/index.html", "/" ]
    },
    CallerReference: `cli-example-${uuidv4()}`
}

let data = JSON.stringify(invalidation);
fs.writeFileSync('all_files.json', data);




