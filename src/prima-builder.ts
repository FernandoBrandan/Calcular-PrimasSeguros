import { BaseBuilder } from './insurance/types-base'
import { CustomerInsurance } from './insurance/types-customer'
import { CarInsurance } from './insurance/types-car'

type InsuredObject = CarInsurance // | HomeInsurance | HealthInsurance | LifeInsurance

class Prima {
    constructor(
        private base: BaseBuilder,
        private customer: CustomerInsurance,
        private insured_object: InsuredObject
    ) { }
}

export class PrimaBuilder {
    private prima: Prima

    constructor(
        base: BaseBuilder,
        customer: CustomerInsurance,
        insured_object: InsuredObject
    ) {
        this.prima = new Prima(base, customer, insured_object)
    }

    async calculate(): Promise<number> {
        const base = this.prima['base']
        const customer = this.prima['customer']
        const insured_object = this.prima['insured_object']

        // Tasa base según tipo de seguro y nivel de cobertura
        const tasa_base = base.tasa_base[base.coverageLevel] || 0.01

        // Calcular factores
        const factor_client = customer.calculate()
        const factor_object = insured_object.calculate()

        const valorAsegurado = insured_object.getValorAsegurado()

        // Prima anual antes de gastos operativos e impuestos
        let prima_anual = tasa_base * factor_client * factor_object * (valorAsegurado / 1000) // Por cada $1000 asegurados

        // Aplicar gastos operativos
        const admin_expenses = parseFloat(base.admin_expenses) || 0.12
        const broker_commission = parseFloat(base.broker_commission) || 0.15
        prima_anual *= (1 + admin_expenses + broker_commission)

        // Aplicar impuestos
        const iva = parseFloat(base.IVA) || 0.21
        const seal_tax = parseFloat(base.seal_tax) || 0.012
        prima_anual *= (1 + iva + seal_tax)

        return Math.round(prima_anual * 100) / 100
    }

    build(): Prima { return this.prima }
}
