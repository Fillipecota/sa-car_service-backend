export const createProducaoSchema = {
    body: {
        type: "object",
        required: ["categoria", "modelo", "cor", "motor", "pneu"],
        properties: {
            categoria: { type: "string" },
            modelo: { type: "string" },
            cor: { type: "string" },
            motor: { type: "number" },
            pneu: { type: "string" },
        }
    }
};

export const generalProducaoSchema = {
    response: {
        body: {
            type: "objeto",
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    categoria: { type: "string" },
                    modelo: { type: "string" },
                    ano: { type: "number" },
                    cor: { type: "string" },
                    motor: { type: "number" },
                    pneu: { type: "string" },
                    user_id: { type: "string" }
                }
            }
        }
    }
};