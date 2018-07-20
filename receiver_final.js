const express = require('express');
const fs = require('fs');
const speech = require('@google-cloud/speech');
const app = express();


app.get('/', function(req, res){
    console.log('GET /');
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.post('/', function(req, res){
    console.log('POST /');
    var filename = 'test.wav';

    var pipe = req.pipe(fs.createWriteStream(filename));
    pipe.on('finish', function () {
    //Creates a client
    const client = new speech.SpeechClient();

    const languageCode = 'en-US';

    const config = {
      languageCode: languageCode,
    };
    const audio = {
      content: fs.readFileSync(filename).toString('base64'),
    };

    const request = {
      config: config,
      audio: audio,
    };

    // Detects speech in the audio file
    client
      .recognize(request)
      .then(data => {
        const response = data[0];
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        console.log(`Transcription: `, transcription);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 'transcription': transcription }));
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    });
});

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)