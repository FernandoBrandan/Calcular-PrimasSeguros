import { BaseBuilder } from '../insurance/types-base'
import { operatingExpenses, InsuranceType, CoverageLevel } from '../config'
import { CustomerBuilder } from '../insurance/types-customer'
import { CarBuilder } from '../insurance/types-car'
import { PrimaBuilder } from '../prima-builder'


export const ejemploCalculoPrima = async () => {
    // Configuración base
    const base = new BaseBuilder()
        .setAdminExpenses(operatingExpenses.admin_expenses.toString())
        .setBrokerCommission(operatingExpenses.broker_commission.toString())
        .setIVA(operatingExpenses.IVA.toString())
        .setSealTax(operatingExpenses.seal_tax.toString())
        .setTasaBase(InsuranceType.AUTO, CoverageLevel.COMPLETO)
        .build()

    // Datos del cliente
    const customer = new CustomerBuilder()
        .build()

    // Datos del vehículo
    const vehicle = new CarBuilder()
        .build()

    // Calcular prima
    const primaCalculator = new PrimaBuilder(base, customer, vehicle)

    try {
        const primaAnual = await primaCalculator.calculate()
        console.log(`Prima anual calculada: $${primaAnual}`)

        // Calcular cuotas // Quien la debe calcular ???
        const cuotasMensual = base.calculateCuotes(primaAnual, 'mensual')
        console.log(`Cuotas mensuales: ${cuotasMensual.cantidadCuotas} cuotas de $${cuotasMensual.valorCuota}`)

        return {
            primaAnual,
            cuotasMensual
        }
    } catch (error) {
        console.error('Error calculando prima:', error)
        throw error
    }
}
