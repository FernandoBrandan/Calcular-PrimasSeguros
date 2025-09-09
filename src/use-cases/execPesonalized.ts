import { operatingExpenses, InsuranceType, CoverageLevel } from '../config/config'
import { PrimaBuilder } from '../prima-builder'
import { CarBuilder } from '../insurance/types-car'
import { BaseBuilder } from '../insurance/types-base'
import { CustomerBuilder } from '../insurance/types-customer'
import { calculateCuotes } from '../services/calculateCuotes'


export const ejemploCalculoPrima = async () => {
    // Configuración base
    const base = new BaseBuilder()
        .setAdminExpenses(operatingExpenses.admin_expenses.toString())
        .setBrokerCommission(operatingExpenses.broker_commission.toString())
        .setIVA(operatingExpenses.IVA.toString())
        .setSealTax(operatingExpenses.seal_tax.toString())
        .setTasaBase(InsuranceType.AUTO, CoverageLevel.BASICO)
        .build()

    // Datos del cliente
    const customer = new CustomerBuilder()
        .setEdad(18)
        .setSexo('masculino')
        .setEstadoCivil('soltero')
        .setOcupacion('estudiante')
        .setAntiguedadLicencia(0)
        .setSiniestros(0)
        .setZonaRiesgo('muy_alto')
        .build()

    // Datos del vehículo
    const vehicle = new CarBuilder()
        .setValor(320000)
        .setBrand('Toyota')
        .setModel('Corolla')
        .setYear(2018)
        .setUsage('particular')
        .setEngineCapacity(1600)
        .setFuelType('nafta')
        .setHasAlarm(true)
        .build()

    // Calcular prima
    const primaCalculator = new PrimaBuilder(base, customer, vehicle)

    try {
        const primaAnual = await primaCalculator.calculate()
        console.log(`Prima anual calculada: $${primaAnual}`)

        // Calcular cuotas // Quien la debe calcular ???
        const cuotasMensual = calculateCuotes(primaAnual, 'mensual')
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
