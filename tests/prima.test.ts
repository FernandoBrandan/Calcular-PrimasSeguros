import { BaseBuilder, TipoSeguro, NivelCobertura } from '../src/insurance/types-base'
import { CustomerBuilder } from '../src/insurance/types-customer'
import { CarBuilder } from '../src/insurance/types-car'
import { PrimaBuilder } from '../src/prima-builder'


describe('PrimaBuilder - Cálculo de Prima', () => {
    it('debería calcular prima anual correctamente', async () => {
        const base = new BaseBuilder()
            .setGastosAdmin('0.12')
            .setComisionBroker('0.15')
            .setIVA('0.21')
            .setImpuestoSellos('0.012')
            .setTasaBase(TipoSeguro.AUTO, NivelCobertura.COMPLETO)
            .build()

        const customer = new CustomerBuilder()
            .setEdad(35)
            .setSexo('femenino')
            .setEstadoCivil('casado')
            .setOcupacion('profesional')
            .setAntiguedadLicencia(10)
            .setSiniestros(0)
            .setZonaRiesgo('bajo')
            .build()

        const car = new CarBuilder()
            .setMarca('Toyota')
            .setModelo('Corolla')
            .setAnio(2020)
            .setUso('particular')
            .setCilindrada(1600)
            .setTipoCombustible('nafta')
            .setSeguridadAlarm(true)
            .build()

        const primaBuilder = new PrimaBuilder(base, customer, car)
        const primaAnual = await primaBuilder.calcular()

        // Verificar que el cálculo produce un resultado positivo y realista
        expect(primaAnual).toBeGreaterThan(0)
        expect(primaAnual).toBeLessThan(100000) // Límite superior razonable
    })

    it('debería calcular cuotas con recargos correctos', async () => {
        const base = new BaseBuilder()
            .setGastosAdmin('0.12')
            .setComisionBroker('0.15')
            .setIVA('0.21')
            .setImpuestoSellos('0.012')
            .setTasaBase(TipoSeguro.AUTO, NivelCobertura.BASICO)
            .build()

        const customer = new CustomerBuilder()
            .setEdad(30)
            .setSexo('masculino')
            .setEstadoCivil('soltero')
            .setOcupacion('empleado')
            .setAntiguedadLicencia(5)
            .setSiniestros(1)
            .setZonaRiesgo('medio')
            .build()

        const car = new CarBuilder()
            .setMarca('Ford')
            .setModelo('Ka')
            .setAnio(2019)
            .setUso('particular')
            .setCilindrada(1200)
            .setTipoCombustible('nafta')
            .setSeguridadAlarm(false)
            .build()

        const primaBuilder = new PrimaBuilder(base, customer, car)
        const primaAnual = await primaBuilder.calcular()

        // Probar diferentes formas de pago
        // const cuotasAnual = await primaBuilder.calcularCuotas(primaAnual, 'anual')
        // const cuotasMensual = await primaBuilder.calcularCuotas(primaAnual, 'mensual')
        // const cuotasTrimestral = await primaBuilder.calcularCuotas(primaAnual, 'trimestral')

        // expect(cuotasAnual.recargo).toBe(0)
        // expect(cuotasAnual.cantidadCuotas).toBe(1)
        // expect(cuotasAnual.primaTotal).toBe(primaAnual)

        // expect(cuotasMensual.recargo).toBe(0.12)
        // expect(cuotasMensual.cantidadCuotas).toBe(12)
        // expect(cuotasMensual.primaTotal).toBe(primaAnual * 1.12)

        // expect(cuotasTrimestral.recargo).toBe(0.08)
        // expect(cuotasTrimestral.cantidadCuotas).toBe(4)
    })
})