// Route for speech-to-text conversion, using multer middleware backenor file uploads
// require('dotenv').config(); // Load environment variables from .env file

// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const speech = require('@google-cloud/speech');
// const ffmpeg = require('fluent-ffmpeg');

// // Google Cloud Speech client setup
// const speechClient = new speech.SpeechClient({
//     keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
// });

// // Route for speech-to-text conversion
// router.post('/speech', async (req, res) => {
//     const data = req.body;
//     console.log("call api :", data)
//     if (data.file) {
//         console.log("data found")
//         const name = data.file.hapi.filename;
//         const path = __dirname + "/uploads/" + name;
//         const encodedPath = __dirname + "/uploads/encoded_" + name;
//         const file = fs.createWriteStream(path);

//         file.on('error', (err) => console.error(err));

//         data.file.pipe(file);

//         data.file.on('end', async () => {
//             const ret = {
//                 filename: data.name,
//                 headers: data.file.hapi.headers
//             }

//             ffmpeg()
//                 .input(path)
//                 .outputOptions([
//                     '-f s16le',
//                     '-acodec pcm_s16le',
//                     '-vn',
//                     '-ac 1',
//                     '-ar 41k',
//                     '-map_metadata -1'
//                 ])
//                 .save(encodedPath)
//                 .on('end', async () => {
//                     const savedFile = fs.readFileSync(encodedPath)

//                     const audioBytes = savedFile.toString('base64');
//                     const audio = {
//                         content: audioBytes,
//                     }
//                     const sttConfig = {
//                         enableAutomaticPunctuation: false,
//                         encoding: "LINEAR16",
//                         sampleRateHertz: 41000,
//                         languageCode: "en-US",
//                         model: "default"
//                     }

//                     const request = {
//                         audio: audio,
//                         config: sttConfig,
//                     }

//                     try {
//                         const [response] = await speechClient.recognize(request);
//                         const transcription = response.results
//                             .map(result => result.alternatives[0].transcript)
//                             .join('\n');

//                         fs.unlinkSync(path);
//                         fs.unlinkSync(encodedPath);
//                         res.json({ ...ret, transcript: transcription });
//                     } catch (error) {
//                         console.error('Error recognizing speech:', error);
//                         res.status(500).json({ error: 'An error occurred while recognizing speech' });
//                     }
//                 })
//         });
//     } else {
//         res.status(400).json({ error: 'No file provided' });
//     }
// });

// module.exports = router;
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const router = express.Router();
const fs = require('fs');
const speech = require('@google-cloud/speech');
const ffmpeg = require('fluent-ffmpeg');
const multer = require('multer');
ffmpeg.setFfmpegPath('C:/ProgramData/chocolatey/bin/ffmpeg.exe');
ffmpeg.setFfprobePath('C:/ProgramData/chocolatey/bin/ffmpeg.exe');

// Set up Google Cloud Speech client
const speechClient = new speech.SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// Configure multer for file storage
const upload = multer({ dest: 'uploads/' });

// Route for speech-to-text conversion, using multer middleware for file uploads
router.post('/speech', upload.single('file'), async (req, res) => {
    
    const data = req.file
    console.log("data",data)
    if (!data) {
        return res.status(400).json({ error: 'No file provided' });
    }

    console.log("File uploaded:", data);
    const path = data.path;
    const encodedPath = __dirname + "/uploads/encoded_" + data.filename+ ".wav";

    ffmpeg()
        .input(path)
        .outputOptions([
            '-f s16le',
            '-acodec pcm_s16le',
            '-vn',
            '-ac 1',
            '-ar 41k',
            '-map_metadata -1'
        ])
        .save(encodedPath)
        .on('end', async () => {
            try {
                const savedFile = fs.readFileSync(encodedPath);
                const audioBytes = savedFile.toString('base64');
                const audio = { content: audioBytes };
                const sttConfig = {
                    enableAutomaticPunctuation: false,
                    encoding: "LINEAR16",
                    sampleRateHertz: 41000,
                    languageCode: "th-TH",
                    model: "default"
                };
                const request = {
                    audio: audio,
                    config: sttConfig,
                };

                const [response] = await speechClient.recognize(request);
                const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

                // Clean up files after processing
                fs.unlinkSync(path);
                fs.unlinkSync(encodedPath);

                console.log(transcription);
                res.json(transcription);
                // res.json({ filename: req.file.filename, transcript: transcription });
            } catch (error) {
                console.error('Error recognizing speech:', error);
                // Attempt to clean up files even in case of error
                fs.unlinkSync(path);
                fs.unlinkSync(encodedPath);

                res.status(500).json({ error: 'An error occurred while recognizing speech' });
            }
        })
        .on('error', (error) => {
            console.error('Error processing file:', error);
            fs.unlinkSync(path); // Attempt to clean up original file
            res.status(500).json({ error: 'An error occurred while processing the file' });
        });
});

module.exports = router;
