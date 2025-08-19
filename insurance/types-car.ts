type FactorUso = 'particular' | 'comercial' | 'taxi_remis' | 'carga'
const FACTORES_USO: Record<FactorUso, number> = {
    'particular': 1.0,
    'comercial': 1.3,
    'taxi_remis': 1.8,
    'carga': 1.5
}

type factorAntiguedad = '0_3' | '4_7' | '8_15' | 'mas_15'
const FACTORES_ANTIGUEDAD: Record<factorAntiguedad, number> = {
    '0_3': 1.0,
    '4_7': 0.9,
    '8_15': 0.8,
    'mas_15': 0.7
}

type FactorCilindrada = 'hasta_1400' | '1401_2000' | '2001_3000' | 'mas_3000'
const FACTORES_CILINDRADA: Record<FactorCilindrada, number> = {
    'hasta_1400': 0.9,
    '1401_2000': 1.0,
    '2001_3000': 1.2,
    'mas_3000': 1.4
}

export interface ObjetoAseguradoAuto {
    tipo: 'auto'
    marca: string
    modelo: string
    anio: number,
    antiguedad: factorAntiguedad,
    cilindrada: FactorCilindrada
}

class Car implements ObjetoAseguradoAuto {
    tipo: "auto"
    marca: string
    modelo: string
    anio: number
    antiguedad: factorAntiguedad
    cilindrada: FactorCilindrada
    uso: FactorUso

    setCilindrada: (valor: number) => void
    calcular: () => void
}

Car.prototype.setCilindrada = function (valor: number) {
    let str: string = 'hasta_1400'
    if (valor >= 1401 && valor <= 2000) str = '1401_2000'
    if (valor >= 2001 && valor <= 3000) str = '2001_3000'
    if (valor >= 3000) str = 'mas_3000'
    this.cilindrada = str
}

Car.prototype.calcular = function () {
    let factor = 1.0
    if (this.cilindrada) factor *= FACTORES_CILINDRADA[this.cilindrada] || 1.0
    if (this.antiguedad) factor *= FACTORES_ANTIGUEDAD[this.antiguedad] || 1.0
    if (this.uso) factor *= FACTORES_USO[this.uso] || 1.0
    this.final = factor
}


// GENERAR COMO BUILDERS!!!!!!!!!!!!!!!!


class Car2 implements ObjetoAseguradoAuto {
    tipo: 'auto' = 'auto';
    marca!: string
    modelo!: string
    anio!: number
    antiguedad!: factorAntiguedad
    cilindrada!: FactorCilindrada
    uso!: FactorUso
    final?: number

    setMarca(marca: string) { this.marca = marca; return this }
    setModelo(modelo: string) { this.modelo = modelo; return this }
    setAnio(anio: number) { this.anio = anio; return this }
    setAntiguedad(antiguedad: factorAntiguedad) { this.antiguedad = antiguedad; return this }
    setUso(uso: FactorUso) { this.uso = uso; return this }

    setCilindrada(valor: number) {
        this.cilindrada = valor <= 1400 ? 'hasta_1400'
            : valor <= 2000 ? '1401_2000'
                : valor <= 3000 ? '2001_3000'
                    : 'mas_3000'
        return this
    }

    calcular() {
        let factor = 1.0
        factor *= FACTORES_CILINDRADA[this.cilindrada] || 1.0
        factor *= FACTORES_ANTIGUEDAD[this.antiguedad] || 1.0
        factor *= FACTORES_USO[this.uso] || 1.0
        this.final = factor
        return this
    }
}


// const miAuto = new Car()
//     .setMarca('Toyota')
//     .setModelo('Corolla')
//     .setAnio(2020)
//     .setAntiguedad('4_7')
//     .setUso('particular')
//     .setCilindrada(1600)
//     .calcular()

// const primaAuto = new PrimaBuilder(gastos, tasas, miAuto)
//     .setEdad('35')
//     .setZona('CABA')
//     .build()
