// Tipagem dos dados para atualização da qualidade
type UpdateQualityRequest = {
    id: string;
    status: string;
}

type AprovarQuality = {
    lote: string;
    status: 'Aprovado' | 'Reprovado';
}