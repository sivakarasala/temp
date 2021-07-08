/* eslint-disable */
const fs = require('fs');
const os = require('os');
const ytdl = require('./lib');

const url = `https://www.youtube.com/watch?v=EduLf_c5OIo`;
let bitrate;
let time;
let totalBits;
let rangeSize;
const blockCount = 2;
async function getBasicInfo() {
    try {
        const data = await ytdl.getInfo(url);
        time = data.player_response.videoDetails.lengthSeconds;
        const format = data.formats.filter(format => format.itag === 18);
        bitrate = format[0]["bitrate"];
        totalBits = time * bitrate;
        totalBytes = totalBits / 8;
        rangeSize = Math.floor(totalBytes / blockCount);
        const ranges = getRangesByRangeSize(totalBytes, rangeSize, blockCount);

        // console.log(data.player_response.videoDetails);
        console.log(ranges);
        const readableStreams = [];
        ranges.forEach((range, index) => {
            readableStreams[index] = ytdl(url, {range});
        });
        const writable = fs.createWriteStream('Dharma.mp4');
        readableStreams[0].pipe(writable, {end:false});
        readableStreams[0].on('end', function() {
            readableStreams[1].pipe(writable);
        })

    } catch (err) {
        console.log(err);
    }
}

getBasicInfo();

const threadCount = os.cpus().length - 1;

console.log(threadCount);

const getRangesByRangeSize = (totalBytes, size, count) => {
    const ranges = [];
    let start = 0;
    while(count > 0) {
        const rangeBlock = {};
        rangeBlock.start = start;
        rangeBlock.end = start + size;
        start = rangeBlock.end + 1;
        ranges.push(rangeBlock);
        count--;
    }
    return ranges;
}
