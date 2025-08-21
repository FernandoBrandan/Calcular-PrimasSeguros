import { CustomerBuilder } from '../src/insurance/types-customer'

describe('CustomerBuilder', () => {
    it('debería crear un cliente con factores correctos', () => {
        const customer = new CustomerBuilder()
            .setEdad(35)
            .setSexo('masculino')
            .setEstadoCivil('casado')
            .setOcupacion('empleado')
            .setAntiguedadLicencia(8)
            .setSiniestros(0)
            .setZonaRiesgo('medio')
            .build()

        expect(customer.edad).toBe('31-45')
        expect(customer.sexo).toBe('masculino')
        expect(customer.estadoCivil).toBe('casado')
        expect(customer.antiguedadLicencia).toBe('4-10')
    })

    it('debería calcular factor de cliente correctamente', () => {
        const customer = new CustomerBuilder()
            .setEdad(35) // factor: 1.0
            .setSexo('masculino') // factor: 1.2
            .setEstadoCivil('casado') // factor: 0.9
            .setOcupacion('empleado') // factor: 1.0
            .setAntiguedadLicencia(8) // factor: 1.0
            .setSiniestros(0) // factor: 0.9
            .setZonaRiesgo('medio') // factor: 1.0
            .build()

        const factor = customer.calcular()
        // 1.0 * 1.2 * 0.9 * 1.0 * 1.0 * 0.9 * 1.0 = 0.972
        expect(factor).toBeCloseTo(0.97, 2)
    })

    it('debería manejar casos extremos de edad', () => {
        const customerJoven = new CustomerBuilder()
            .setEdad(19)
            .setSexo('masculino')
            .setEstadoCivil('soltero')
            .setOcupacion('estudiante')
            .setAntiguedadLicencia(0)
            .setSiniestros(0)
            .setZonaRiesgo('muy_alto')
            .build()

        expect(customerJoven.edad).toBe('18-21')
        expect(customerJoven.antiguedadLicencia).toBe('0-1')

        // Este debería ser un factor alto debido a la edad, experiencia y zona
        const factor = customerJoven.calcular()
        expect(factor).toBeGreaterThan(2)
    })
})