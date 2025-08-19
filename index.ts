import { gastos_operativos, tasa_base } from './insurance/types-base'
import { ObjetoAseguradoAuto } from './insurance/types-car'
import { ObjetoAseguradoCasa } from './insurance/types-house'
import { IlifeInsurance } from './insurance/types-life'

type ObjetoAsegurado =
    ObjetoAseguradoAuto |
    ObjetoAseguradoCasa |
    IlifeInsurance

class Prima {
    edad: string
    zona: string
    experiecia: string
    siniestros: string
    constructor(
        private gastos_operativos: gastos_operativos,
        private tasa_base: tasa_base,
        private objeto_asegurado: ObjetoAsegurado
    ) { }
}

export class PrimaBuilder {
    private prima: Prima
    calcular: () => void
    obtenerFactorEdad: (edad: number) => string
    obtenerFactorExperiencia: (anios: number) => string
    obtenerFactorSiniestros: (cantidad?: number) => string

    constructor(
        gastos_operativos: gastos_operativos,
        tasa_base: tasa_base,
        objeto_asegurado: ObjetoAsegurado
    ) {
        this.prima = new Prima(gastos_operativos, tasa_base, objeto_asegurado)
    }

    setEdad(edad: string) {
        this.prima.edad = edad
        return this
    }

    setZona(zona: string) {
        this.prima.zona = zona
        return this
    }

    build(): Prima { return this.prima }
}


PrimaBuilder.prototype.obtenerFactorEdad = function (edad: number) {
    if (edad >= 18 && edad <= 21) return '18-21'
    if (edad >= 22 && edad <= 25) return '22-25'
    if (edad >= 26 && edad <= 30) return '26-30'
    if (edad >= 31 && edad <= 45) return '31-45'
    if (edad >= 46 && edad <= 60) return '46-60'
    if (edad >= 61 && edad <= 70) return '61-70'
    return '71+'
}

PrimaBuilder.prototype.obtenerFactorExperiencia = function (anios: number) {
    if (anios <= 1) return '0-1'
    if (anios <= 3) return '2-3'
    if (anios <= 10) return '4-10'
    return '11+'
}

PrimaBuilder.prototype.obtenerFactorSiniestros = function (cantidad?: number) {
    if (!cantidad) return '0'
    if (cantidad >= 4) return '4+'
    return cantidad.toString()
}

PrimaBuilder.prototype.calcular = async function () {


}

// calcularDescuentos(descuentos) {
//     let totalDescuento = 0

//     // Descuentos comunes en Argentina
//     if (descuentos.alarma) totalDescuento += 0.05           // 5% por alarma
//     if (descuentos.gps) totalDescuento += 0.03              // 3% por GPS
//     if (descuentos.cochera) totalDescuento += 0.08          // 8% por cochera
//     if (descuentos.antiguedadCliente > 3) totalDescuento += 0.10 // 10% cliente antiguo
//     if (descuentos.debito) totalDescuento += 0.02           // 2% débito automático

//     return Math.min(totalDescuento, 0.25) // Máximo 25% descuento
// }



// calcularCuotas(primaAnual, formaPago) {
//     const recargos = {
//         'anual': 0,
//         'semestral': 0.05,      // 5% recargo
//         'trimestral': 0.08,     // 8% recargo
//         'mensual': 0.12         // 12% recargo
//     }

//     const divisores = {
//         'anual': 1,
//         'semestral': 2,
//         'trimestral': 4,
//         'mensual': 12
//     }

//     const recargo = recargos[formaPago] || 0
//     const primaConRecargo = primaAnual * (1 + recargo)
//     const cantidadCuotas = divisores[formaPago] || 1
//     const valorCuota = primaConRecargo / cantidadCuotas

//     return {
//         formaPago,
//         cantidadCuotas,
//         recargo,
//         primaTotal: primaConRecargo,
//         valorCuota: Math.round(valorCuota * 100) / 100
//     }
// }