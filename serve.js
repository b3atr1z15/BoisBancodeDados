const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONEXÃO COM O BANCO
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'boizinhos_db'   
});

// ROTA PARA LISTAR OS DADOS
app.get('/listar', (req, res) => {
    db.query('SELECT * FROM animais', (err, results) => {
        if (err) {
            console.error(err);
            res.json([]);
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
