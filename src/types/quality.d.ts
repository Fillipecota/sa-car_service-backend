
//  criação
type CreateQualidade = {
    name: string;
    description: string;
    amount: number;
    category: string;
    markId: string;
    status: string;
}

// atualizar status
type UpdateStatus = {
    id: string;
    status: string;
}