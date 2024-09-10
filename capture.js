const express = require('express');
const bodyParser = require('body-parser');
const NodeWebcam = require('node-webcam');

const app = express();

const hostname = '192.168.11.114';
const port = 5000;

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

// Variable pour compter les tentatives infructueuses
let failedAttempts = 0;

// Route pour afficher le formulaire de connexion
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

          form {
            max-width: 300px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          }

          label {
            display: block;
            margin-bottom: 10px;
            color: #333;
          }

          input[type="email"],
          input[type="password"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          button[type="submit"] {
            width: 100%;
            padding: 10px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          button[type="submit"]:hover {
            background-color: #45a049;
          }

          .error-message {
            color: red;
            margin-top: 10px;
          }
        </style>
        </head>
      <body>
        <h1>Connexion</h1>
        <form action="/login" method="post">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br><br>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" name="password" required><br><br>
          <button type="submit">Se connecter</button>
        </form>
      </body>
    </html>
  `);
});

// Route pour gérer la soumission du formulaire de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérifier si les informations de connexion sont correctes
  if (email === 'yassine@gmail.com' && password === 'yassine1234') {
    // Réinitialiser le compteur des tentatives infructueuses
    failedAttempts = 0;
    res.redirect('/welcome');
  } else {
    failedAttempts++;

    // Capturer une photo si le mot de passe est faux trois fois
    if (failedAttempts === 3) {
      Webcam.capture("photo", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Photo prise avec succès. Emplacement : " + data);
        }
      });
    }

    res.send('Erreur de connexion : email ou mot de passe incorrect.');
  }
});

// Route de la page de bienvenue
app.get('/welcome', (req, res) => {
  res.send('Bienvenue !');
});

// Démarrer le serveur
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
