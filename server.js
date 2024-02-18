/*
This file initializes a Node/Express server.
   - Listens on port 3004 (or specified by the environment variable PORT)
   - Routes requests to the Express app defined in the express.js file.
*/

import app from './express.js';

const port = process.env.PORT || 3004;

app.listen(port, (err) => {
    if (err) console.log(err);
    console.info(`Server started on port ${port}.`)
})