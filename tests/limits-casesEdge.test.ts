import { BaseBuilder, TipoSeguro, NivelCobertura } from '../src/insurance/types-base'
import { CustomerBuilder } from '../src/insurance/types-customer'
import { CarBuilder } from '../src/insurance/types-car'
import { PrimaBuilder } from '../src/prima-builder'

describe('Validación de límites y casos edge', () => {
    it('debería manejar valores límite correctamente', () => {
        // Edad límite superior
        const customerMayorEdad = new CustomerBuilder()
            .setEdad(75)
            .setSexo('femenino')
            .setEstadoCivil('viudo')
            .setOcupacion('profesional')
            .setAntiguedadLicencia(50)
            .setSiniestros(0)
            .setZonaRiesgo('medio')
            .build()

        expect(customerMayorEdad.edad).toBe('71+')
        expect(customerMayorEdad.antiguedadLicencia).toBe('11+')

        // Vehículo muy antiguo
        const carAntiguo = new CarBuilder()
            .setMarca('Peugeot')
            .setModelo('504')
            .setAnio(1985)
            .setUso('particular')
            .setCilindrada(1300)
            .setTipoCombustible('nafta')
            .setSeguridadAlarm(false)
            .build()

        expect(carAntiguo.anio).toBe('-2000')
        expect(carAntiguo.cilindrada).toBe('hasta_1400')
    })

    it('debería mantener precisión en cálculos con decimales', async () => {
        const base = new BaseBuilder()
            .setGastosAdmin('0.12')
            .setComisionBroker('0.15')
            .setIVA('0.21')
            .setImpuestoSellos('0.012')
            .setTasaBase(TipoSeguro.AUTO, NivelCobertura.BASICO)
            .build()

        const customer = new CustomerBuilder()
            .setEdad(35)
            .setSexo('masculino')
            .setEstadoCivil('casado')
            .setOcupacion('empleado')
            .setAntiguedadLicencia(10)
            .setSiniestros(0)
            .setZonaRiesgo('medio')
            .build()

        const car = new CarBuilder()
            .setMarca('Chevrolet')
            .setModelo('Onix')
            .setAnio(2021)
            .setUso('particular')
            .setCilindrada(1000)
            .setTipoCombustible('nafta')
            .setSeguridadAlarm(true)
            .build()

        const primaBuilder = new PrimaBuilder(base, customer, car)
        const primaAnual = await primaBuilder.calcular()

        // Verificar que el resultado tiene máximo 2 decimales
        const decimales = primaAnual.toString().split('.')[1]
        if (decimales) {
            expect(decimales.length).toBeLessThanOrEqual(2)
        }
    })
})