let adminLogado = false;

function loginAdmin() {

  const email = prompt("Login de administrador:");
  const senha = prompt("Login de administrador:");

  auth.signInWithEmailAndPassword(email, senha)

    .then((userCredential) => {

      adminLogado = true;

      alert("Login realizado com sucesso!");

      console.log(userCredential.user);

      render();

    })

    .catch((error) => {

      console.log(error);

      alert("Erro: " + error.message);

    });

}
