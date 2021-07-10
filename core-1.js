/* eslint-disable */
const fs = require('fs');
const os = require('os');
const ytdl = require('./lib');
const childProcess = require('child_process');

// const url = `https://www.youtube.com/watch?v=EduLf_c5OIo`;
// let bitrate;
// let time;
// let totalBits;
// let rangeSize;
// const blockCount = 2;
// async function getBasicInfo() {
//     try {
//         const data = await ytdl.getInfo(url);
//         time = data.player_response.videoDetails.lengthSeconds;
//         const format = data.formats.filter(format => format.itag === 18);
//         bitrate = format[0]["bitrate"];
//         totalBits = time * bitrate;
//         totalBytes = totalBits / 8;
//         rangeSize = Math.floor(totalBytes / blockCount);
//         const ranges = getRanges(totalBytes, rangeSize, blockCount);

//         // console.log(data.player_response.videoDetails);
//         console.log(ranges);
//         // const readableStreams = [];
//         const fileName = "output";
//         ranges.forEach((range, index) => {
//             // readableStreams[index] = ytdl(url, {range});
//             const child = childProcess.fork('./childProcess.js');
//             const outputFile = `${fileName}-${index}.txt`;
//             child.on('message', (message) => {
//             console.log(message);
//             });

//             child.send({event: 'START', range, url, outputFile });
//         });
//         // const writable = fs.createWriteStream('Dharma.mp4');
//         // readableStreams[0].pipe(writable, {end:false});
//         // readableStreams[0].on('end', function() {
//         //     readableStreams[1].pipe(writable);
//         // })

//     } catch (err) {
//         console.log(err);
//     }
// }

// getBasicInfo();

// const threadCount = os.cpus().length - 1;

// console.log(threadCount);

// const getRanges = (totalBytes, size, count) => {
//     const ranges = [];
//     let start = 0;
//     while(count > 0) {
//         const rangeBlock = {};
//         rangeBlock.start = start;
//         rangeBlock.end = start + size;
//         start = rangeBlock.end + 1;
//         ranges.push(rangeBlock);
//         count--;
//     }
//     ranges[ranges.length-1]["end"] = undefined;
//     return ranges;
// }

const rs1 = fs.createReadStream('output-0.txt');
const rs2 = fs.createReadStream('output-1.txt');

const writable = fs.createWriteStream('Dharma.mp4');
rs1.pipe(writable, {end:false});
rs1.on('end', function() {
    rs2.pipe(writable);
})



const createReadableStreams = chunkedOutputFiles => {
    return chunkedOutputFiles.map((chunkedOutputFile) => {
        return fs.createReadStream(chunkedOutputFile);
    });
};

const pipeReadableStreamsSync = (readableStreams, writableStream) => {
    readableStreams.forEach((readableStream, index) => {
        if(index !== readableStreams.length - 1) {
            readableStream.pipe(writableStream, {end: false});
            readableStream.on('end', () => r)
        }
    });
    if(readableStreams.length > 2) {
        readableStreams[0].piple(writableStream, {end: false});
        readableStreams[0].on('end', () => {
            
        })
    }
}

const rsList = ["rs1", "rs2", "rs3", "rs4"];

rs1.pipe(ws, {end: false})
rs1.on('end', () => )
