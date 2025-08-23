const formCadastro = document.getElementById('registration-form');

if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = '/'; 
      } else {
        alert('Erro: ' + data.msg);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Não foi possível conectar ao servidor.');
    }
  });
}