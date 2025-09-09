import { divisores, PaymentFrequency, recargos } from "../config/config"

// Servicio o clase aparte
export const calculateCuotes = (primaAnual: number, paymentFrequency: PaymentFrequency) => {
    const recargo = recargos[paymentFrequency] || 0
    const primaConRecargo = primaAnual * (1 + recargo)
    const cantidadCuotas = divisores[paymentFrequency] || 1
    const valorCuota = primaConRecargo / cantidadCuotas
    return {
        paymentFrequency,
        cantidadCuotas,
        recargo,
        primaTotal: primaConRecargo,
        valorCuota: Math.round(valorCuota * 100) / 100
    }
}