
type ProduzirVeiculos = {
    id: string;
    categoria: string;
    modelo: string;
    cor: string;
    motor: number;
    pneu: string;
    status: string
    quantidade: number;
};

type UpdateProduzirVeiculos = {
    status: string;
}