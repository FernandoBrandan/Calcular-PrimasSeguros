import { recargos, divisores, PaymentFrequency } from '../config'
import { CoverageLevel, FACTORS_TASA_BASE, InsuranceType } from "../config"

export interface IOperatingExpenses {
    admin_expenses: string
    broker_commission: string
    IVA: string
    seal_tax: string

    insuranceType: InsuranceType
    coverageLevel: CoverageLevel
    tasa_base: Record<CoverageLevel, number>

    recargo: string
    divisor: string

    setAdminExpenses(expenses: string): this
    setBrokerCommission(comission: string): this
    setIVA(iva: string): this
    setSealTax(tax: string): this

    setTasaBase(tipo: InsuranceType, nivel: CoverageLevel): this

    setRecargo(recargo: string): this
    setDivisor(divisor: string): this

    build(): BaseBuilder
}

export class BaseBuilder implements IOperatingExpenses {
    admin_expenses!: string
    broker_commission!: string
    IVA!: string
    seal_tax!: string

    insuranceType!: InsuranceType
    coverageLevel!: CoverageLevel
    tasa_base!: Record<CoverageLevel, number>

    recargo!: string
    divisor!: string

    constructor() { }

    setAdminExpenses(expenses: string): this {
        this.admin_expenses = expenses
        return this
    }

    setBrokerCommission(comission: string): this {
        this.broker_commission = comission
        return this
    }

    setIVA(iva: string): this {
        this.IVA = iva
        return this
    }

    setSealTax(tax: string): this {
        this.seal_tax = tax
        return this
    }

    setTasaBase(tipo: InsuranceType, nivel: CoverageLevel): this {
        this.insuranceType = tipo
        this.coverageLevel = nivel
        this.tasa_base = FACTORS_TASA_BASE[tipo]
        return this
    }

    setRecargo(recargo: string): this {
        this.recargo = recargo
        return this
    }
    setDivisor(divisor: string): this {
        this.divisor = divisor
        return this
    }

    // Servicio o clase aparte
    calculateCuotes(primaAnual: number, paymentFrequency: PaymentFrequency) {
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

    build(): BaseBuilder { return this }
}