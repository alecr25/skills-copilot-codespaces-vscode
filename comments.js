// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const comments = require('./comments');
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    // Get the filename
    let pathname = `.${parsedUrl.pathname}`;
    // Print the filename
    console.log(`Request for ${pathname} received.`);
    // Read the file content
    fs.readFile(pathname, (err, data) => {
        // If the file does not exist
        if (err) {
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        // HTTP Status: 200 : OK
        // Content Type: text/plain
        res.writeHead(200, {'Content-Type': 'text/html'});
        // Write the content of the file to response body
        res.write(data.toString());
        // End the response
        return res.end();
    });
});
// Listen on port 8080
server.listen(8080);
console.log('Server started on http://localhost:8080; press Ctrl-C to terminate....');
