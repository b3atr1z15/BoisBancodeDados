document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    const formData = new FormData();
    formData.append('nomeanimal', document.getElementById('name').value);
    formData.append('nomedono', document.getElementById('email').value);
    formData.append('raça', document.getElementById('phone').value);
    formData.append('sexo', document.getElementById('work').value);
    formData.append('phone', document.getElementById('attachment').value);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Dados enviados com sucesso!');
        } else {
            alert('Erro ao enviar dados.');
        }
    })
    .catch(error => console.error('Erro:', error));
});