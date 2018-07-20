This is the final product of a brief hackathon exercise to allow a browser to record microphone audio, send it to a node server that then uses the google speech to text engine to return text. 

credit goes to: 
https://addpipe.com/blog/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/
https://cloud.google.com/speech-to-text/

To get this to work, follow the setup instructions for the Google Cloud speech to text sample code with node.js

install express
npm install express

I may update this project if I feel like toying around with it: 
This works perfectly while using localhost, but will need changes to support https so the microphone recording can work outside of localhost. 
