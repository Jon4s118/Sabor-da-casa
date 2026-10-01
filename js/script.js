const WHATSAPP = "556692171483"; // troque pelo número real: 55 + DDD + número

const carrinho = [];

// Adiciona item ao clicar em "+"
document.querySelectorAll(".add").forEach((botao) => {
  botao.addEventListener("click", () => {
    carrinho.push({
      nome: botao.dataset.nome,
      preco: parseFloat(botao.dataset.preco),
    });
    renderizar();
  });
});

// Remove item
document.getElementById("lista-pedido").addEventListener("click", (e) => {
  if (e.target.classList.contains("remover")) {
    const i = Number(e.target.dataset.indice);
    carrinho.splice(i, 1);
    renderizar();
  }
});

// Mostra carrinho ao clicar no botão do topo
document.getElementById("btn-carrinho").addEventListener("click", () => {
  document.getElementById("carrinho").scrollIntoView({ behavior: "smooth" });
});

function renderizar() {
  const lista = document.getElementById("lista-pedido");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, i) => {
    total += item.preco;
    const li = document.createElement("li");
    li.innerHTML =
      `${item.nome} — R$ ${item.preco.toFixed(2).replace(".", ",")}` +
      ` <button class="remover" data-indice="${i}">✕</button>`;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent =
    "R$ " + total.toFixed(2).replace(".", ",");
  document.getElementById("contador").textContent = carrinho.length;
}

// Monta a mensagem e abre o WhatsApp
document.getElementById("btn-enviar").addEventListener("click", (e) => {
  e.preventDefault();
  if (carrinho.length === 0) {
    alert("Seu pedido está vazio. Adicione itens ao carrinho!");
    return;
  }

  let total = 0;
  const linhas = carrinho.map((item, i) => {
    total += item.preco;
    return `${i + 1}. ${item.nome} — R$ ${item.preco.toFixed(2).replace(".", ",")}`;
  });

  const mensagem =
    "Olá! Meu pedido:\n\n" + linhas.join("\n") +
    "\n\nTotal: R$ " + total.toFixed(2).replace(".", ",");

  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
});
