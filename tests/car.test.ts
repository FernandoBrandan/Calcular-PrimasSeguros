import { CarBuilder } from '../src/insurance/types-car'

describe('CarBuilder', () => {
    it('debería crear un vehículo con características correctas', () => {
        const car = new CarBuilder()
            .setMarca('Toyota')
            .setModelo('Corolla')
            .setAnio(2018)
            .setUso('particular')
            .setCilindrada(1800)
            .setTipoCombustible('nafta')
            .setSeguridadAlarm(true)
            .build()

        expect(car.marca).toBe('Toyota')
        expect(car.modelo).toBe('Corolla')
        expect(car.anio).toBe('2011-2020')
        expect(car.cilindrada).toBe('1401_2000')
        expect(car.seguridad_Alarm).toBe(true)
    })

    it('debería calcular factor de vehículo correctamente', () => {
        const car = new CarBuilder()
            .setMarca('Honda')
            .setModelo('Civic')
            .setAnio(2018) // factor: 1.0
            .setUso('particular') // factor: 1.0
            .setCilindrada(1800) // factor: 1.0
            .setTipoCombustible('nafta') // factor: 1.0
            .setSeguridadAlarm(true) // factor: 0.95
            .build()

        const factor = car.calcular()
        // 1.0 * 1.0 * 1.0 * 1.0 * 0.95 = 0.95
        expect(factor).toBe(0.95)
    })

    it('debería penalizar vehículos de alto riesgo', () => {
        const carAltoRiesgo = new CarBuilder()
            .setMarca('BMW')
            .setModelo('X5')
            .setAnio(1998) // factor: 1.5
            .setUso('comercial') // factor: 1.3
            .setCilindrada(3500) // factor: 1.4
            .setTipoCombustible('diesel') // factor: 1.1
            .setSeguridadAlarm(false) // sin descuento
            .build()

        const factor = carAltoRiesgo.calcular()
        // 1.5 * 1.3 * 1.4 * 1.1 = 2.9925
        expect(factor).toBeCloseTo(3, 2)
    })
})