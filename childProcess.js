/* eslint-disable */
const fs = require('fs');
const ytdl = require('./lib');

const processVideoDownloadByRange = (url, range, outputFile) => {
    const readableStream = ytdl(url, {range});
    const writableStream = fs.createWriteStream(outputFile);
    readableStream.pipe(writableStream);
    readableStream.on('end', () => {
        process.send(`wrote to file ${outputFile} successfully`);
    })
}
  
process.on('message', (message) => {
    if (typeof message === "object" && message.event === 'START') {
        const {url, range, outputFile} = message;
        console.log('Child process received START message');
        processVideoDownloadByRange(url, range, outputFile);
    }
});
