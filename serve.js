const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petshop'
});

// Rota para inserir dados
app.post('/upload', (req, res) => {
    const { nomeanimal, nomedono, raca, sexo, phone } = req.body;

    const sql = `
        INSERT INTO animais (nomeanimal, nomedono, raca, sexo, phone)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [nomeanimal, nomedono, raca, sexo, phone], (err) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});

// Rota para listar os dados
app.get('/listar', (req, res) => {
    db.query('SELECT * FROM animais', (err, results) => {
        if (err) {
            console.error(err);
            return res.json([]);
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

app.delete('/excluir/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM animais WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});

app.put('/editar/:id', (req, res) => {
    const id = req.params.id;
    const { nomeanimal, nomedono, raca, sexo, phone } = req.body;

    const sql = `
        UPDATE animais 
        SET nomeanimal = ?, nomedono = ?, raca = ?, sexo = ?, phone = ?
        WHERE id = ?
    `;

    db.query(sql, [nomeanimal, nomedono, raca, sexo, phone, id], (err) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});
