const grid = document.getElementById("grid");
const painel = document.getElementById("painel");

let dados = {};
let numeroSelecionado = null;

db.collection("rifa")
  .orderBy("timestamp")
  .onSnapshot((snapshot) => {

    dados = {};

    snapshot.forEach((doc) => {
      dados[doc.id] = doc.data();
    });

    render();
    atualizarProgresso();

  });

function copiarPix() {
  navigator.clipboard.writeText("lissandravitoria8@gmail.com");
  alert("PIX copiado!");
}

function reservarNumero(numero) {
  numeroSelecionado = numero;
  document.getElementById("formReserva").style.display = "block";
}

function reservarNumero(numero) {
  numeroSelecionado = numero;
  document.getElementById("formReserva").style.display = "block";
}

function fecharForm() {
  document.getElementById("formReserva").style.display = "none";

  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
}

async function confirmarReserva() {

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome || !telefone) {
    alert("Preencha todos os campos");
    return;
  }

  try {

    await db.runTransaction(async (transaction) => {

      const ref = db.collection("rifa").doc(String(numeroSelecionado));

      const doc = await transaction.get(ref);

      if (doc.exists) {
        throw "Número já reservado";
      }

      transaction.set(ref, {
        nome: nome.trim(),
        telefone: telefone.trim(),
        pago: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    });

    alert("Número reservado com sucesso!");
    fecharForm();

  } catch (error) {
    console.log(error);
    alert(error);
  }
}

async function confirmarReserva() {

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome || !telefone) {
    alert("Preencha todos os campos");
    return;
  }

  try {

    await db.runTransaction(async (transaction) => {

      const ref = db.collection("rifa").doc(String(numeroSelecionado));

      const doc = await transaction.get(ref);

      if (doc.exists) {
        throw "Número já reservado";
      }

      transaction.set(ref, {
        nome: nome.trim(),
        telefone: telefone.trim(),
        pago: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    });

    alert("Número reservado com sucesso!");
    fecharForm();

  } catch (error) {
    console.log(error);
    alert(error);
  }
}

function marcarPago(num) {

  if (!adminLogado) {
    alert("Faça login como admin");
    return;
  }

  db.collection("rifa")
    .doc(String(num))
    .update({
      pago: true
    });

}

function atualizarPainel() {

  painel.innerHTML = "";

  Object.keys(dados)
    .sort((a, b) => a - b)
    .forEach(function (num) {

      const item = dados[num];

      const div = document.createElement("div");
      div.className = "item";

      let html = `
        <div style="font-weight:bold; font-size:16px;">
          Nº ${String(num).padStart(2, "0")}
        </div>

        <div style="margin-top:5px;">
          ${item.nome}
        </div>
      `;

      if (item.pago) {

        html += `
          <div class="status">
            Pago
          </div>
        `;

      } else {

        html += `
          <div class="status">
            Aguardando pagamento
          </div>
        `;

        if (adminLogado) {
          html += `
            <button onclick="marcarPago(${num})">
              Já pagou
            </button>
          `;
        }
      }

      div.innerHTML = html;
      painel.appendChild(div);

    });

}

function atualizarProgresso() {

  const total = 150;
  const vendidos = Object.keys(dados).length;

  const porcentagem = (vendidos / total) * 100;

  const barra = document.getElementById("barra");
  const texto = document.getElementById("textoProgresso");

  if (barra) barra.style.width = porcentagem + "%";

  if (texto) {
    texto.innerText = `${vendidos} de ${total} números reservados`;
  }

}

function render() {

  grid.innerHTML = "";

  for (let i = 1; i <= 150; i++) {

    const div = document.createElement("div");
    div.className = "num";

    const item = dados[String(i)];

    if (item) {

      div.classList.add("reservado");

      if (item.pago) {
        div.classList.add("pago");
      }

      div.innerHTML = `
        <div class="numero">
          ${String(i).padStart(2, "0")}
        </div>

        <div class="nome">
          ${item.nome}
        </div>
      `;

      div.onclick = () => {
        alert("Número já reservado");
      };

    } else {

      div.innerHTML = `
        <div class="numero">
          ${String(i).padStart(2, "0")}
        </div>
      `;

      div.onclick = () => {
        reservarNumero(i);
      };

    }

    grid.appendChild(div);

  }

  atualizarPainel();

}

render();

function enviarComprovante() {
  window.open(
    "https://wa.me/55SEUNUMEROAQUI?text=Olá!%20Acabei%20de%20realizar%20o%20pagamento%20da%20rifa%20e%20gostaria%20de%20enviar%20o%20comprovante.",
    "_blank"
  );
}


