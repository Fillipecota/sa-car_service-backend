type ManutencaoVeiculos = {
    descricao: string;
    equipamento: string;
    responsavel: string;
    tipo: "Preventiva" | "Corretiva";
    status?: "Pendente" | "Concluída";
    agendado: string;
}