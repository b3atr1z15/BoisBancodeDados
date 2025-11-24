const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

// Criação do servidor Express
const app = express();
const port = 3000;

// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Altere com seu usuário
  password: '', // Altere com sua senha
  database: 'animais', // Nome do seu banco de dados
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');

});

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório para salvar os arquivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
  },
});

const upload = multer({ storage });

// Configuração do middleware para processar dados JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para adicionar os dados com arquivo
app.post('/upload', upload.single('attachment'), (req, res) => {
  const { nomeanimal, nomedono, raça, sexo, phone } = req.body;
  const attachment = req.file ? req.file.path : null;

  // Inserir no banco de dados
  const query = 'INSERT INTO sua_tabela (nomeanimal, nomedono, raça, sexo, phone) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nomeanimal, nomedono, raça, sexo, phone], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).json({ success: false, message: 'Erro ao gravar dados no banco' });
    } else {
      res.json({ success: true, message: 'Dados gravados com sucesso!', data: result });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});