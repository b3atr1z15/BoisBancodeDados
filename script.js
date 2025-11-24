document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nomeanimal', document.getElementById('nomeanimal').value);
    formData.append('nomedono', document.getElementById('nomedono').value);
    formData.append('raca', document.getElementById('raça').value);
    formData.append('sexo', document.getElementById('sexo').value);
    formData.append('phone', document.getElementById('phone').value);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Dados enviados com sucesso!');
            carregarTabela(); // atualiza a tabela após inserir
        } else {
            alert('Erro ao enviar dados.');
        }
    })
    .catch(err => console.error('Erro:', err));
});


function carregarTabela() {
    fetch('http://localhost:3000/listar')
        .then(res => res.json())
        .then(dados => {
            let html = `
                <table border="1" style="margin-top:20px;width:100%;text-align:center;">
                    <tr>
                        <th>ID</th>
                        <th>Nome do Animal</th>
                        <th>Nome do Dono</th>
                        <th>Raça</th>
                        <th>Sexo</th>
                        <th>Telefone</th>
                    </tr>
            `;

            dados.forEach(item => {
                html += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nomeanimal}</td>
                        <td>${item.nomedono}</td>
                        <td>${item.raca}</td>
                        <td>${item.sexo}</td>
                        <td>${item.phone}</td>
                    </tr>
                `;
            });

            html += `</table>`;

            document.getElementById('lista').innerHTML = html;
        });
}

// Carrega a tabela quando abrir a página
carregarTabela();

function carregarTabela() {
    fetch('http://localhost:3000/listar')
        .then(res => res.json())
        .then(dados => {

            let html = `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Animal</th>
                        <th>Nome do Dono</th>
                        <th>Raça</th>
                        <th>Sexo</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
            `;

            dados.forEach(item => {
                html += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nomeanimal}</td>
                        <td>${item.nomedono}</td>
                        <td>${item.raca}</td>
                        <td>${item.sexo}</td>
                        <td>${item.phone}</td>
                        <td>
                            <button onclick="editarRegistro(${item.id})">Editar</button>
                            <button onclick="excluirRegistro(${item.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });

            html += `</table>`;

            document.getElementById('lista').innerHTML = html;
        });
}

carregarTabela();

function excluirRegistro(id) {
    if (!confirm('Tem certeza que deseja excluir?')) return;

    fetch(`http://localhost:3000/excluir/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Registro excluído com sucesso!');
            carregarTabela();
        } else {
            alert('Erro ao excluir.');
        }
    });
}

function editarRegistro(id) {
    const nomeanimal = prompt('Novo nome do animal:');
    const nomedono = prompt('Novo nome do dono:');
    const raca = prompt('Nova raça:');
    const sexo = prompt('Novo sexo:');
    const phone = prompt('Novo telefone:');

    if (!nomeanimal || !nomedono) {
        alert('Edição cancelada.');
        return;
    }

    fetch(`http://localhost:3000/editar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeanimal,
            nomedono,
            raca,
            sexo,
            phone
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Registro atualizado!');
            carregarTabela();
        } else {
            alert('Erro ao editar.');
        }
    });
}
