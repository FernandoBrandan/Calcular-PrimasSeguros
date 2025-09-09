// Factores por edad del conductor
type Edad = '18-21' | '22-25' | '26-30' | '31-45' | '46-60' | '61-70' | '71+'
const FACTORES_EDAD: Record<Edad, number> = {
    '18-21': 1.8,    // Muy alto riesgo
    '22-25': 1.5,    // Alto riesgo
    '26-30': 1.2,    // Riesgo moderado
    '31-45': 1.0,    // Riesgo base
    '46-60': 0.9,    // Riesgo bajo
    '61-70': 1.1,    // Riesgo moderado por edad
    '71+': 1.4       // Alto riesgo por edad
}

type Sexo = 'masculino' | 'femenino'
const FACTORES_SEXO: Record<Sexo, number> = {
    'masculino': 1.2,   //  Hombres tienen más siniestros 
    'femenino': 0.8     //  Mujeres tienen menos siniestros
}

type EstadoCivil = 'soltero' | 'casado' | 'divorciado' | 'viudo'
const FACTORES_ESTADO_CIVIL: Record<EstadoCivil, number> = {
    'soltero': 1.2,     //  Solteros tienen más siniestros
    'casado': 0.9,      //  Casados tienen menos siniestros
    'divorciado': 1.1,  //  Divorciados tienen riesgo moderado
    'viudo': 1.0,      //  Viudos riesgo base 
}

type Ocupacion = 'empleado' | 'profesional' | 'comerciante' | 'independiente' | 'estudiante'
const FACTORES_OCUPACION: Record<Ocupacion, number> = {
    'empleado': 1.0,        // Riesgo base
    'profesional': 0.9,     // Riesgo bajo
    'comerciante': 1.1,     // Riesgo moderado
    'independiente': 1.2,   // Riesgo alto
    'estudiante': 1.3,      // Riesgo muy alto 
}

//  Factor por antigüedad de licencia
type Antiguedad = '0-1' | '2-3' | '4-10' | '11+'
const FACTORES_ANTIGUEDAD: Record<Antiguedad, number> = {
    '0-1': 1.4,     //  Conductor novel
    '2-3': 1.2,     //  Poca experiencia
    '4-10': 1.0,    //  Experiencia normal
    '11+': 0.9      //  Conductor experimentado
}

type Siniestros = 0 | 1 | 2 | 3 | 4
const FACTORES_SINIESTRO: Record<Siniestros, number> = {
    0: 0.9,     //  Buen conductor(descuento)
    1: 1.0,     //  Base
    2: 1.3,     //  Penalización moderada
    3: 1.6,     //  Alta penalización
    4: 2.0,     //  Muy alta penalización
}

// Factores por zona de riesgo(basado en códigos postales CABA / GBA)
type Zona = 'muy_bajo' | 'bajo' | 'medio' | 'alto' | 'muy_alto'
const FACTORES_ZONA: Record<Zona, number> = {
    'muy_bajo': 0.8,   // Zonas residenciales premium
    'bajo': 0.9,       // Zonas residenciales
    'medio': 1.0,      // Zona base
    'alto': 1.3,       // Zonas comerciales / centro
    'muy_alto': 1.8    // Zonas de alto riesgo
}

/**
 * Opciones: 
 * Customer:
 * Antiguedad de cliente
 * Tipo : Debito credito
 *
 * Auto:
 * gps
 * cochera
 */

export interface CustomerInsurance {
    readonly edad: Edad
    readonly sexo: Sexo
    readonly estadoCivil: EstadoCivil
    readonly ocupacion: Ocupacion
    readonly antiguedadLicencia: Antiguedad
    readonly siniestros: Siniestros
    readonly zonaRiesgo: Zona

    obtenerEdad(edad: number): Edad
    obtenerAntiguedadLicencia(anios: number): Antiguedad

    setEdad(edad: number): this
    setSexo(sexo: Sexo): this
    setEstadoCivil(estadoCivil: EstadoCivil): this
    setOcupacion(ocupacion: Ocupacion): this
    setAntiguedadLicencia(antiguedad: number): this
    setSiniestros(siniestros: Siniestros): this
    setZonaRiesgo(zonaRiesgo: Zona): this

    calculate(): number
}

export class CustomerBuilder implements CustomerInsurance {
    // Datos adicionales del conductor
    edad!: Edad
    sexo!: Sexo
    estadoCivil!: EstadoCivil
    ocupacion!: Ocupacion
    antiguedadLicencia!: Antiguedad
    siniestros!: Siniestros
    zonaRiesgo!: Zona

    obtenerEdad(edad: number): Edad {
        if (edad >= 18 && edad <= 21) return '18-21'
        if (edad >= 22 && edad <= 25) return '22-25'
        if (edad >= 26 && edad <= 30) return '26-30'
        if (edad >= 31 && edad <= 45) return '31-45'
        if (edad >= 46 && edad <= 60) return '46-60'
        if (edad >= 61 && edad <= 70) return '61-70'
        return '71+'
    }
    obtenerAntiguedadLicencia(anios: number): Antiguedad {
        if (anios >= 0 && anios <= 1) return '0-1'
        if (anios >= 2 && anios <= 3) return '2-3'
        if (anios >= 4 && anios <= 10) return '4-10'
        return '11+'
    }

    setEdad(edad: number): this {
        this.edad = this.obtenerEdad(edad)
        return this
    }

    setSexo(sexo: Sexo): this {
        this.sexo = sexo
        return this
    }

    setEstadoCivil(estadoCivil: EstadoCivil): this {
        this.estadoCivil = estadoCivil
        return this
    }

    setOcupacion(ocupacion: Ocupacion): this {
        this.ocupacion = ocupacion
        return this
    }

    setAntiguedadLicencia(antiguedad: number): this {
        this.antiguedadLicencia = this.obtenerAntiguedadLicencia(antiguedad)
        return this
    }

    setSiniestros(siniestros: Siniestros): this {
        this.siniestros = siniestros
        return this
    }

    setZonaRiesgo(zonaRiesgo: Zona): this {
        this.zonaRiesgo = zonaRiesgo
        return this
    }

    calculate(): number {
        let factor = 1.0
        factor *= FACTORES_EDAD[this.edad] ?? 1.0
        factor *= FACTORES_SEXO[this.sexo] ?? 1.0
        factor *= FACTORES_ESTADO_CIVIL[this.estadoCivil] ?? 1.0
        factor *= FACTORES_OCUPACION[this.ocupacion] ?? 1.0
        factor *= FACTORES_ANTIGUEDAD[this.antiguedadLicencia] ?? 1.0
        factor *= FACTORES_SINIESTRO[this.siniestros] ?? 1.0
        factor *= FACTORES_ZONA[this.zonaRiesgo] || 1.0
        return Math.round(factor * 100) / 100
    }

    build(): CustomerBuilder {
        return this
    }
}