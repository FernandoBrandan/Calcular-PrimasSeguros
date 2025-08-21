import { BaseBuilder, TipoSeguro, NivelCobertura } from '../src/insurance/types-base'

describe('BaseBuilder', () => {
    it('debería crear una configuración base correcta', () => {
        const base = new BaseBuilder()
            .setGastosAdmin('0.12')
            .setComisionBroker('0.15')
            .setIVA('0.21')
            .setImpuestoSellos('0.012')
            .setTasaBase(TipoSeguro.AUTO, NivelCobertura.COMPLETO)
            .build()

        expect(base.GASTOS_ADMIN).toBe('0.12')
        expect(base.COMISION_BROKER).toBe('0.15')
        expect(base.IVA).toBe('0.21')
        expect(base.IMPUESTO_SELLOS).toBe('0.012')
        expect(base.TipoSeguro).toBe(TipoSeguro.AUTO)
        expect(base.NivelCobertura).toBe(NivelCobertura.COMPLETO)
        expect(base.tasa_base[NivelCobertura.COMPLETO]).toBe(0.035)
    })
})