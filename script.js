const catalogo = document.getElementById("catalogo");
const jogos = document.querySelectorAll(".jogo");
const indicadores = document.getElementById("indicadores");

let indexAtual = 0;
let autoScrollTimer = null;
const intervalo = 4000;

/* ===== Criar indicadores ===== */
jogos.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("ativo");
  indicadores.appendChild(dot);
});

const dots = indicadores.querySelectorAll("span");

/* ===== Largura real do item ===== */
function larguraItem() {
  const estilo = window.getComputedStyle(jogos[0]);
  const gap = parseInt(window.getComputedStyle(catalogo).gap) || 0;
  return jogos[0].offsetWidth + gap;
}

/* ===== Atualizar indicador ===== */
function atualizarIndicador() {
  const index = Math.round(catalogo.scrollLeft / larguraItem());
  indexAtual = index;

  dots.forEach(dot => dot.classList.remove("ativo"));
  dots[index]?.classList.add("ativo");
}

catalogo.addEventListener("scroll", atualizarIndicador);

/* ===== Auto Scroll Inteligente ===== */
function iniciarAutoScroll() {
  pararAutoScroll();

  autoScrollTimer = setInterval(() => {
    indexAtual = (indexAtual + 1) % jogos.length;

    catalogo.scrollTo({
      left: larguraItem() * indexAtual,
      behavior: "smooth"
    });

  }, intervalo);
}

function pararAutoScroll() {
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }
}

/* ===== Pausar em interação ===== */
catalogo.addEventListener("mouseenter", pararAutoScroll);
catalogo.addEventListener("mouseleave", iniciarAutoScroll);
catalogo.addEventListener("touchstart", pararAutoScroll);
catalogo.addEventListener("touchend", iniciarAutoScroll);

/* ===== Animação de entrada ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visivel");
    }
  });
}, { threshold: 0.4 });

jogos.forEach(jogo => observer.observe(jogo));

/* ===== Modo apresentação (tecla P) ===== */
let apresentacao = false;

document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "p") {
    apresentacao = !apresentacao;
    apresentacao ? iniciarAutoScroll() : pararAutoScroll();
  }
});

/* ===== Inicialização ===== */
iniciarAutoScroll();


function enviarFeedback() {
  const texto = document.getElementById("mensagem").value;

  if (!texto.trim()) {
    alert("Escreva algo antes de enviar.");
    return;
  }

  const mensagemFormatada = encodeURIComponent(
    "Feedback - Roda de Vôlei:\n\n" + texto
  );

  window.open(
    "https://ig.me/m/roda_de_volei.mls?text=" + mensagemFormatada,
    "_blank"
  );
}
