let adminLogado = false;

function loginAdmin() {

  const email = prompt("Digite seu email:");
  const senha = prompt("Digite sua senha:");

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