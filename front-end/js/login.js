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
      Swal.fire({
        title: 'Sucesso!',
        text: 'Login bem-sucedido!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/studs';
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