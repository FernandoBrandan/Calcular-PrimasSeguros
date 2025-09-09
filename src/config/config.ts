
// 5. Factores externalizados
// config/factores.json
// Los factores están centralizados y son fáciles de actualizar
// Los factores están hardcodeados, deberían venir de configuración/BD
// {
//     "edad": {
//         "18-21": 1.8,
//             "22-25": 1.5
//     }
// }



// Gastos operativos(obligatorios por ley)
export const operatingExpenses = {
    admin_expenses: 0.12,        // 12 % gastos administrativos
    broker_commission: 0.15,     // 15 % comisión corredor
    IVA: 0.21,                   // 21 % IVA
    seal_tax: 0.012              // 1.2 % impuesto a los sellos(varía por provincia)
}

export type PaymentFrequency = 'anual' | 'semestral' | 'trimestral' | 'mensual'
// Recargos por forma de pago
// Fuente: https://www.argentina.gob.ar/ssn/recargos-por-forma-de-pago
export const recargos: Record<PaymentFrequency, number> = {
    'anual': 0,
    'semestral': 0.05,      // 5% recargo
    'trimestral': 0.08,     // 8% recargo
    'mensual': 0.12         // 12% recargo
}

export const divisores: Record<PaymentFrequency, number> = {
    'anual': 1,
    'semestral': 2,
    'trimestral': 4,
    'mensual': 12
}

export enum InsuranceType {
    AUTO = 'auto',
    HOGAR = 'hogar',
    VIDA = 'vida',
    COMERCIO = 'comercio'
}

export enum CoverageLevel {
    BASICO = 'basico',
    INTERMEDIO = 'intermedio',
    COMPLETO = 'completo',
    PREMIUM = 'premium'
}

export const FACTORS_TASA_BASE: Record<InsuranceType, Record<CoverageLevel, number>> = {
    [InsuranceType.AUTO]: {
        [CoverageLevel.BASICO]: 0.008,     // RC
        [CoverageLevel.INTERMEDIO]: 0.015, // RC + Incendio + Robo  
        [CoverageLevel.COMPLETO]: 0.035,   // Cobertura total
        [CoverageLevel.PREMIUM]: 0.045     // Con servicios adicionales
    },
    [InsuranceType.HOGAR]: {
        [CoverageLevel.BASICO]: 0.005,     // Solo incendio
        [CoverageLevel.INTERMEDIO]: 0.012, // + robo
        [CoverageLevel.COMPLETO]: 0.025,   // + RC + contenido
        [CoverageLevel.PREMIUM]: 0.035     // + servicios
    },
    [InsuranceType.VIDA]: {
        [CoverageLevel.BASICO]: 0.002,
        [CoverageLevel.INTERMEDIO]: 0.004,
        [CoverageLevel.COMPLETO]: 0.006,
        [CoverageLevel.PREMIUM]: 0.008
    },
    [InsuranceType.COMERCIO]: {
        [CoverageLevel.BASICO]: 0.002,
        [CoverageLevel.INTERMEDIO]: 0.004,
        [CoverageLevel.COMPLETO]: 0.006,
        [CoverageLevel.PREMIUM]: 0.008
    }
}
