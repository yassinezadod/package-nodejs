const os = require('os');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const cpuInfo = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const platform = os.platform();
  const userInfo = os.userInfo();


  const html = `
    <html>
      <head>
        <title>Informations sur le PC</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Informations sur le PC</h1>
        <table>
          <tr>
            <th>CPU</th>
            <td>${cpuInfo[0].model}</td>
          </tr>
          <tr>
            <th>Memoire totale</th>
            <td>${formatBytes(totalMemory)}</td>
          </tr>
          <tr>
            <th>Memoire libre</th>
            <td>${formatBytes(freeMemory)}</td>
          </tr>
          <tr>
            <th>Plateforme</th>
            <td>${platform}</td>
          </tr>
          <tr>
            <th>Nom d'utilisateur</th>
            <td>${userInfo.username}</td>
          </tr>
        </table>
      </body>
    </html>
  `;

  res.end(html);
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}
