// Gastos operativos(obligatorios por ley)
// GASTOS_ADMIN = 0.12       # 12 % gastos administrativos
// COMISION_BROKER = 0.15    # 15 % comisión corredor
// IVA = 0.21               # 21 % IVA
// IMPUESTO_SELLOS = 0.012   # 1.2 % impuesto a los sellos(varía por provincia)


// Tasas base por tipo de cobertura(% del valor del vehículo)
// TASAS_BASE_responsabilidad_civil = 0.008,     # 0.8 % - Mínimo legal
// TASAS_BASE_terceros_completo = 0.015,         # 1.5 % - RC + Incendio + Robo
// TASAS_BASE_todo_riesgo = 0.035,               # 3.5 % - Cobertura total
// TASAS_BASE_todo_riesgo_premium = 0.045        # 4.5 % - Con servicios adicionales


export interface gastos_operativos {
    GASTOS_ADMIN: string
    COMISION_BROKER: string
    IVA: string
    IMPUESTO_SELLOS: string
}

export interface tasa_base {
    responsabilidad_civil: string
    terceros_completo: string
    todo_riesgo: string
    todo_riesgo_premium: string
}



