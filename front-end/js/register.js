const formCadastro = document.getElementById('registration-form');

if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Cadastro realizado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        // Redireciona somente após o usuário fechar o alerta
        if (result.isConfirmed) {
          window.location.href = '/';
        }
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: data.msg,
        icon: 'error',
        confirmButtonText: 'Tentar Novamente'
      });
    }
    
    } catch (error) {
      console.error('Erro de rede:', error);
      Swal.fire({
        title: 'Erro de conexão!',
        text: 'Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  });
}