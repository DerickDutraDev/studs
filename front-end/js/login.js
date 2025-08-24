const formLogin = document.getElementById('login-form');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login bem-sucedido! Redirecionando...');
      // Redireciona para a rota /studs após o login
      window.location.href = '/studs';
    } else {
      alert('Erro: ' + data.msg); // Exibe a mensagem de erro do back-end
    }
  } catch (error) {
    console.error('Erro de rede:', error);
    alert('Não foi possível conectar ao servidor.');
  }
});