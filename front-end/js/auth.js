// script.js
const form = document.getElementById('registration-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Registro bem-sucedido:', data);
      alert('Usuário registrado com sucesso!');
      // Redirecionar para a página de login, por exemplo
      window.location.href = 'homePage.html';
    } else {
      console.error('Erro no registro:', data);
      alert('Erro: ' + data.msg);
    }
  } catch (error) {
    console.error('Erro de rede:', error);
    alert('Não foi possível conectar ao servidor.');
  }
});