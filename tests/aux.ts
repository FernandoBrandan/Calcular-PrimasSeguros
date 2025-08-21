// import { BaseBuilder } from '../src/insurance/types-base'
// import { CustomerBuilder } from '../src/insurance/types-customer'
// import { CarBuilder } from '../src/insurance/types-car'

// describe('Sistema de Cálculo de Seguros', () => {
//     describe('BaseBuilder', () => { })
//     describe('CustomerBuilder', () => { })
//     describe('CarBuilder', () => { })
//     describe('PrimaBuilder - Cálculo de Prima', () => { })
//     describe('Casos de prueba específicos del negocio', () => { })
//     describe('Validación de límites y casos edge', () => { })
// })



// // Funciones auxiliares para testing
// export function crearConfiguracionBase(): BaseBuilder {
//     return new BaseBuilder()
//         .setGastosAdmin('0.12')
//         .setComisionBroker('0.15')
//         .setIVA('0.21')
//         .setImpuestoSellos('0.012')
// }

// export function crearClienteStandard(): CustomerBuilder {
//     return new CustomerBuilder()
//         .setEdad(35)
//         .setSexo('masculino')
//         .setEstadoCivil('casado')
//         .setOcupacion('empleado')
//         .setAntiguedadLicencia(10)
//         .setSiniestros(0)
//         .setZonaRiesgo('medio')
// }

// export function crearVehiculoStandard(): CarBuilder {
//     return new CarBuilder()
//         .setMarca('Toyota')
//         .setModelo('Corolla')
//         .setAnio(2020)
//         .setUso('particular')
//         .setCilindrada(1600)
//         .setTipoCombustible('nafta')
//         .setSeguridadAlarm(true)
// }