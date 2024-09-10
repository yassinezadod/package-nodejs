const express = require('express');
const bodyParser = require('body-parser');
const NodeWebcam = require('node-webcam');

const app = express();

// Configuration de bodyParser pour récupérer les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Définir les options de la webcam
const webcamOptions = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: false,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false
};

// Créer une instance de webcam
const Webcam = NodeWebcam.create(webcamOptions);

// Route pour afficher la page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
          }

          h1 {
            color: #333;
          }

          .capture-button {
            padding: 10px 20px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .capture-button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
      <center>
        <h1>Capture de photo</h1>
        <button class="capture-button" onclick="capturePhoto()">Capturer une photo</button>
        </center>

        <script>
          function capturePhoto() {
            // Envoyer une requête au serveur pour capturer la photo
            fetch('/capture', { method: 'POST' })
              .then(response => response.text())
              .then(data => {
                console.log(data);
                alert('Photo capturée avec succès !');
              })
              .catch(error => {
                console.error(error);
                alert('Erreur lors de la capture de la photo.');
              });
          }
        </script>
      </body>
    </html>
  `);
});

// Route pour capturer la photo
app.post('/capture', (req, res) => {
  Webcam.capture("photo", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la capture de la photo.');
    } else {
      console.log("Photo capturée avec succès. Emplacement : " + data);
      res.send('Photo capturée avec succès.');
    }
  });
});

// Démarrer le serveur
const port = 9000;
const hostname = '192.168.100.86';
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
