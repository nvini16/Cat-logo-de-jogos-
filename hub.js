function salvarPontuacao(nomeJogo, pontos) {
  let ranking = JSON.parse(localStorage.getItem("rankingCentral")) || {};

  if (!ranking[nomeJogo]) {
    ranking[nomeJogo] = 0;
  }

  if (pontos > ranking[nomeJogo]) {
    ranking[nomeJogo] = pontos;
  }

  localStorage.setItem("rankingCentral", JSON.stringify(ranking));
}

function pegarRanking() {
  return JSON.parse(localStorage.getItem("rankingCentral")) || {};
}

function calcularNivel() {
  let ranking = pegarRanking();
  let total = 0;

  for (let jogo in ranking) {
    total += ranking[jogo];
  }

  return Math.floor(total / 500);
}
