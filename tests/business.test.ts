import { BaseBuilder, TipoSeguro, NivelCobertura } from '../src/insurance/types-base'
import { CustomerBuilder } from '../src/insurance/types-customer'
import { CarBuilder } from '../src/insurance/types-car'
import { PrimaBuilder } from '../src/prima-builder'

describe('Casos de prueba específicos del negocio', () => {
    it('debería penalizar correctamente a conductores jóvenes con historial de siniestros', async () => {
        const base = new BaseBuilder()
            .setGastosAdmin('0.12')
            .setComisionBroker('0.15')
            .setIVA('0.21')
            .setImpuestoSellos('0.012')
            .setTasaBase(TipoSeguro.AUTO, NivelCobertura.COMPLETO)
            .build()

        const customerAltoRiesgo = new CustomerBuilder()
            .setEdad(20) // Alto riesgo por edad
            .setSexo('masculino') // Factor masculino
            .setEstadoCivil('soltero') // Soltero = más riesgo
            .setOcupacion('estudiante') // Ocupación de riesgo
            .setAntiguedadLicencia(1) // Poca experiencia
            .setSiniestros(2) // Historial de siniestros
            .setZonaRiesgo('muy_alto') // Zona peligrosa
            .build()

        const customerBajoRiesgo = new CustomerBuilder()
            .setEdad(40)
            .setSexo('femenino')
            .setEstadoCivil('casado')
            .setOcupacion('profesional')
            .setAntiguedadLicencia(15)
            .setSiniestros(0)
            .setZonaRiesgo('muy_bajo')
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

        const primaAltoRiesgo = new PrimaBuilder(base, customerAltoRiesgo, car)
        const primaBajoRiesgo = new PrimaBuilder(base, customerBajoRiesgo, car)

        const primaAnualAltoRiesgo = await primaAltoRiesgo.calcular()
        const primaAnualBajoRiesgo = await primaBajoRiesgo.calcular()

        // La prima de alto riesgo debe ser significativamente mayor
        expect(primaAnualAltoRiesgo).toBeGreaterThan(primaAnualBajoRiesgo * 2)
    })

    it('debería aplicar descuentos a vehículos eléctricos con sistemas de seguridad', async () => {
        const base = new BaseBuilder()
            .setGastosAdmin('0.12')
            .setComisionBroker('0.15')
            .setIVA('0.21')
            .setImpuestoSellos('0.012')
            .setTasaBase(TipoSeguro.AUTO, NivelCobertura.PREMIUM)
            .build()

        const customer = new CustomerBuilder()
            .setEdad(45)
            .setSexo('masculino')
            .setEstadoCivil('casado')
            .setOcupacion('profesional')
            .setAntiguedadLicencia(20)
            .setSiniestros(0)
            .setZonaRiesgo('bajo')
            .build()

        const carElectrico = new CarBuilder()
            .setMarca('Tesla')
            .setModelo('Model 3')
            .setAnio(2023)
            .setUso('particular')
            .setCilindrada(1500) // Equivalente eléctrico
            .setTipoCombustible('electrico')
            .setSeguridadAlarm(true)
            .build()

        const carNafta = new CarBuilder()
            .setMarca('Toyota')
            .setModelo('Camry')
            .setAnio(2023)
            .setUso('particular')
            .setCilindrada(1500)
            .setTipoCombustible('nafta')
            .setSeguridadAlarm(false)
            .build()

        const primaElectrico = new PrimaBuilder(base, customer, carElectrico)
        const primaNafta = new PrimaBuilder(base, customer, carNafta)

        const primaAnualElectrico = await primaElectrico.calcular()
        const primaAnualNafta = await primaNafta.calcular()

        // El vehículo eléctrico con alarma debe tener prima menor
        expect(primaAnualElectrico).toBeLessThan(primaAnualNafta)
    })
})