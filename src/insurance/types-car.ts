type FactorAnio = '-2000' | '2001-2010' | '2011-2020' | '2021-2023'
const FACTOR_ANIO: Record<FactorAnio, number> = {
    '-2000': 1.5,        // Vehículos muy antiguos
    '2001-2010': 1.2,    // Vehículos de 10 a 20 años
    '2011-2020': 1.0,    // Vehículos modernos
    '2021-2023': 0.9     // Vehículos nuevos
}

type FactorUso = 'particular' | 'comercial' | 'taxi_remis' | 'carga'
const FACTOR_USO: Record<FactorUso, number> = {
    'particular': 1.0,
    'comercial': 1.3,
    'taxi_remis': 1.8,
    'carga': 1.5
}

type FactorCilindrada = 'hasta_1400' | '1401_2000' | '2001_3000' | 'mas_3000'
const FACTOR_CILINDRADA: Record<FactorCilindrada, number> = {
    'hasta_1400': 0.9,
    '1401_2000': 1.0,
    '2001_3000': 1.2,
    'mas_3000': 1.4
}

type FactorCombustible = 'nafta' | 'diesel' | 'hibrido' | 'electrico'
const FACTOR_COMBUSTIBLE: Record<FactorCombustible, number> = {
    'nafta': 1.0,
    'diesel': 1.1,
    'hibrido': 0.9,
    'electrico': 0.8
}

export interface CarInsurance {
    readonly tipo: "auto"
    readonly marca: string
    readonly modelo: string
    readonly anio: FactorAnio
    readonly uso: FactorUso
    readonly cilindrada: FactorCilindrada
    readonly tipoCombustible: FactorCombustible
    readonly seguridad_Alarm: boolean

    obtenerAnio(anio: number): FactorAnio
    obtenerCilindrada(cilindrada: number): FactorCilindrada

    setMarca(marca: string): this
    setModelo(modelo: string): this
    setAnio(anio: number): this
    setUso(uso: FactorUso): this
    setCilindrada(cilindrada: number): this
    setTipoCombustible(tipoCombustible: FactorCombustible): this
    setSeguridadAlarm(seguridad_Alarm: boolean): this

    calcular(): number

}

// ### 1. Datos del Vehículo
// - Marca y modelo: Afecta directamente el costo de reparación y probabilidad de robo
// - Año del vehículo: Determina depreciación y valor de mercado

export class CarBuilder implements CarInsurance {

    tipo!: "auto"
    marca!: string
    modelo!: string
    anio!: FactorAnio
    uso!: FactorUso
    cilindrada!: FactorCilindrada
    tipoCombustible!: FactorCombustible
    seguridad_Alarm!: boolean

    obtenerAnio(anio: number): FactorAnio {
        if (anio <= 2000) return '-2000'
        if (anio >= 2001 && anio <= 2010) return '2001-2010'
        if (anio >= 2011 && anio <= 2020) return '2011-2020'
        return '2021-2023'
    }

    obtenerCilindrada(cilindrada: number): FactorCilindrada {
        if (cilindrada <= 1400) return 'hasta_1400'
        if (cilindrada >= 1401 && cilindrada <= 2000) return '1401_2000'
        if (cilindrada >= 2001 && cilindrada <= 3000) return '2001_3000'
        return 'mas_3000'
    }

    setMarca(marca: string): this {
        this.marca = marca
        return this
    }

    setModelo(modelo: string): this {
        this.modelo = modelo
        return this
    }

    setAnio(anio: number): this {
        this.anio = this.obtenerAnio(anio)
        return this
    }

    setUso(uso: FactorUso): this {
        this.uso = uso
        return this
    }

    setCilindrada(cilindrada: number): this {
        this.cilindrada = this.obtenerCilindrada(cilindrada)
        return this
    }

    setTipoCombustible(tipoCombustible: FactorCombustible): this {
        this.tipoCombustible = tipoCombustible
        return this
    }

    setSeguridadAlarm(seguridad_Alarm: boolean): this {
        this.seguridad_Alarm = seguridad_Alarm
        return this
    }

    calcular(): number {
        let factor = 1.0
        factor *= FACTOR_ANIO[this.anio] || 1.0
        factor *= FACTOR_USO[this.uso] || 1.0
        factor *= FACTOR_CILINDRADA[this.cilindrada] || 1.0
        factor *= FACTOR_COMBUSTIBLE[this.tipoCombustible] || 1.0
        if (this.seguridad_Alarm) factor *= 0.95 // Descuento por alarma
        return Math.round(factor * 100) / 100
    }

    build(): CarBuilder { return this }
}

// ### 4. Coberturas Elegidas 
// - Responsabilidad Civil: Obligatorio por ley
// - Daño Parcial: Cubre reparaciones por choques, granizo, etc.
// - Robo/Hurto Total: Muy común en Argentina
// - Incendio: Riesgo específico
// - Cristales: Cobertura adicional
// -  Franquicia elegida : A menor franquicia, mayor prima