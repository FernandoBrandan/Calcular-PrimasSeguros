// Gastos operativos(obligatorios por ley)
export interface IGastos_Operativos {
    GASTOS_ADMIN: string        // 12 % gastos administrativos
    COMISION_BROKER: string     // 15 % comisión corredor
    IVA: string                 // 21 % IVA
    IMPUESTO_SELLOS: string     // 1.2 % impuesto a los sellos(varía por provincia)
}

export enum TipoSeguro {
    AUTO = 'auto',
    HOGAR = 'hogar',
    VIDA = 'vida',
    COMERCIO = 'comercio'
}

export enum NivelCobertura {
    BASICO = 'basico',
    INTERMEDIO = 'intermedio',
    COMPLETO = 'completo',
    PREMIUM = 'premium'
}

const FACTORES_TASA_BASE: Record<TipoSeguro, Record<NivelCobertura, number>> = {
    [TipoSeguro.AUTO]: {
        [NivelCobertura.BASICO]: 0.008,     // RC
        [NivelCobertura.INTERMEDIO]: 0.015, // RC + Incendio + Robo  
        [NivelCobertura.COMPLETO]: 0.035,   // Cobertura total
        [NivelCobertura.PREMIUM]: 0.045     // Con servicios adicionales
    },
    [TipoSeguro.HOGAR]: {
        [NivelCobertura.BASICO]: 0.005,     // Solo incendio
        [NivelCobertura.INTERMEDIO]: 0.012, // + robo
        [NivelCobertura.COMPLETO]: 0.025,   // + RC + contenido
        [NivelCobertura.PREMIUM]: 0.035     // + servicios
    },
    [TipoSeguro.VIDA]: {
        [NivelCobertura.BASICO]: 0.002,
        [NivelCobertura.INTERMEDIO]: 0.004,
        [NivelCobertura.COMPLETO]: 0.006,
        [NivelCobertura.PREMIUM]: 0.008
    },
    [TipoSeguro.COMERCIO]: {
        [NivelCobertura.BASICO]: 0.002,
        [NivelCobertura.INTERMEDIO]: 0.004,
        [NivelCobertura.COMPLETO]: 0.006,
        [NivelCobertura.PREMIUM]: 0.008
    }
}

export class BaseBuilder implements IGastos_Operativos {
    GASTOS_ADMIN!: string
    COMISION_BROKER!: string
    IVA!: string
    IMPUESTO_SELLOS!: string

    TipoSeguro!: TipoSeguro
    NivelCobertura!: NivelCobertura
    tasa_base!: Record<NivelCobertura, number>

    constructor() { }

    setGastosAdmin(gastos: string): this {
        this.GASTOS_ADMIN = gastos
        return this
    }

    setComisionBroker(comision: string): this {
        this.COMISION_BROKER = comision
        return this
    }

    setIVA(iva: string): this {
        this.IVA = iva
        return this
    }

    setImpuestoSellos(impuesto: string): this {
        this.IMPUESTO_SELLOS = impuesto
        return this
    }

    setTasaBase(tipo: TipoSeguro, nivel: NivelCobertura): this {
        this.TipoSeguro = tipo
        this.NivelCobertura = nivel
        this.tasa_base = FACTORES_TASA_BASE[tipo]
        return this
    }

    build(): BaseBuilder { return this }
}