const WHATSAPP = "5566992171483";

const carrinho = [];

// ===== Menu lateral =====
const menu = document.getElementById("menu-lateral");
const overlay = document.getElementById("overlay");

function abrirFecharMenu(abrir) {
  menu.classList.toggle("aberto", abrir);
  overlay.classList.toggle("ativo", abrir);
}

document.getElementById("hamburger").addEventListener("click", () => abrirFecharMenu(true));
document.getElementById("fechar-menu").addEventListener("click", () => abrirFecharMenu(false));
overlay.addEventListener("click", () => abrirFecharMenu(false));

// Fecha o menu e rola até a seção ao clicar em um link
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    abrirFecharMenu(false);
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// ===== Carrinho =====
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

// Envia pedido via WhatsApp
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

// ===== Reserva via WhatsApp =====
document.getElementById("form-reserva").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("res-nome").value.trim();
  const pessoas = document.getElementById("res-pessoas").value;
  const [ano, mes, dia] = document.getElementById("res-data").value.split("-");
  const hora = document.getElementById("res-hora").value;

  if (!nome) { alert("Informe seu nome."); return; }

  const mensagem =
    `Olá! Gostaria de fazer uma reserva.\n\n` +
    `👤 ${nome}\n` +
    `👥 ${pessoas} pessoas\n` +
    `📅 ${dia}/${mes} às ${hora}`;

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`, "_blank");
});
