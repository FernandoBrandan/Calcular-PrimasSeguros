import { BaseBuilder } from './insurance/types-base'
import { CustomerInsurance } from './insurance/types-customer'
import { CarInsurance } from './insurance/types-car'
import { ObjetoAseguradoCasa } from './insurance/types-house'
import { IlifeInsurance } from './insurance/types-life'

type ObjetoAsegurado =
    CarInsurance
// ObjetoAseguradoCasa |
// IlifeInsurance

class Prima {
    constructor(
        private base: BaseBuilder,
        private customer: CustomerInsurance,
        private objeto_asegurado: ObjetoAsegurado
    ) { }
}

export class PrimaBuilder {
    private prima: Prima

    constructor(
        base: BaseBuilder,
        customer: CustomerInsurance,
        objeto_asegurado: ObjetoAsegurado
    ) {
        this.prima = new Prima(base, customer, objeto_asegurado)
    }

    async calcular(): Promise<number> {
        const base = this.prima['base']
        const customer = this.prima['customer']
        const objeto_asegurado = this.prima['objeto_asegurado']

        // Calcular factores
        const factor_cliente = customer.calcular()
        const factor_objeto = objeto_asegurado.calcular()

        // Tasa base según tipo de seguro y nivel de cobertura
        const tasa_base = base.tasa_base[base.NivelCobertura] || 0.01

        // Prima anual antes de gastos operativos e impuestos
        let prima_anual = tasa_base * factor_cliente * factor_objeto * 1000 // Por cada $1000 asegurados

        // Aplicar gastos operativos
        const gastos_admin = parseFloat(base.GASTOS_ADMIN) || 0.12
        const comision_broker = parseFloat(base.COMISION_BROKER) || 0.15
        prima_anual *= (1 + gastos_admin + comision_broker)

        // Aplicar impuestos
        const iva = parseFloat(base.IVA) || 0.21
        const impuesto_sellos = parseFloat(base.IMPUESTO_SELLOS) || 0.012
        prima_anual *= (1 + iva + impuesto_sellos)

        return Math.round(prima_anual * 100) / 100 // Redondear a 2 decimales
    }

    build(): Prima { return this.prima }
}



// PrimaBuilder.prototype.calcularCuotas = async function (primaAnual, formaPago: string) {
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