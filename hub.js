// ===============================
// SALVAR RECORD POR JOGO
// ===============================
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


// ===============================
// PEGAR TODOS OS RECORDES
// ===============================
function pegarRanking() {
  return JSON.parse(localStorage.getItem("rankingCentral")) || {};
}


// ===============================
// CALCULAR XP TOTAL (soma de todos os recordes)
// ===============================
function calcularXP() {
  let ranking = pegarRanking();
  let total = 0;

  for (let jogo in ranking) {
    total += ranking[jogo];
  }

  return total;
}


// ===============================
// CALCULAR NÍVEL GLOBAL
// 500 XP = 1 nível
// ===============================
function calcularNivel() {
  let totalXP = calcularXP();
  return Math.floor(totalXP / 500);
}


// ===============================
// PEGAR RECORD DE UM JOGO ESPECÍFICO
// ===============================
function pegarRecord(nomeJogo) {
  let ranking = pegarRanking();
  return ranking[nomeJogo] || 0;
}


// ===============================
// RESETAR TUDO (opcional para debug)
// ===============================
function resetarRanking() {
  localStorage.removeItem("rankingCentral");
}

salvarPontuacao("Memoria", pontuacaoFinal);


let record = pegarRecord("Memoria");


let nivel = calcularNivel();
let xp = calcularXP();
