const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

const hostname = '192.168.100.71';
const port = 2000;

const connection = mysql.createConnection({
  host: 'localhost', // Remplacez par votre hôte MySQL
  port: 3306, // Remplacez par votre port MySQL
  user: 'root', // Remplacez par votre nom d'utilisateur MySQL
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'form' // Remplacez par le nom de votre base de données MySQL
});


connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie !');
});

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Chemin vers le fichier index.html
    const filePath = path.join(__dirname, 'index.html');

    // Lire le contenu du fichier index.html
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Une erreur est survenue.');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    });
  } else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const formData = JSON.parse(body);

      // Exemple : Insertion des données dans la table "users"
      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      const values = [formData.name, formData.email, formData.password];

      connection.query(query, values, (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion des données :', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Une erreur est survenue lors de l\'insertion des données.');
          return;
        }
        console.log('Données insérées avec succès !');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Données insérées avec succès !' }));
      });
    });
  } else if (req.url === '/results' && req.method === 'GET') {
    // Récupérer les données depuis la base de données
    const query = 'SELECT * FROM users';

    connection.query(query, (err, rows) => {
      if (err) {
        console.error('Erreur lors de la récupération des données :', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Une erreur est survenue lors de la récupération des données.');
        return;
      }

      // Générer le contenu du tableau HTML avec les données récupérées
      let tableHTML = '<table><thead><tr><th>Nom</th><th>Email</th></tr></thead><tbody>';

      rows.forEach((row) => {
        tableHTML += `<tr><td>${row.name}</td><td>${row.email}</td></tr>`;
      });

      tableHTML += '</tbody></table>';

      // Créer une nouvelle page HTML avec le tableau des résultats
      const newPage = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resultats</title>
          <link rel="stylesheet" type="text/css" href="st.css">
        </head>
        <body>
          <div class="container">
            <h2>Résultats</h2>
            ${tableHTML}
          </div>
        </body>
        </html>
      `;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(newPage);
    });
  } else {
    // Gérer les autres requêtes (par exemple, des fichiers CSS, JavaScript, etc.)
    // ...

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Actualiser la page.');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
