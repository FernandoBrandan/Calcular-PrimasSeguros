import { BaseBuilder, TipoSeguro, NivelCobertura } from './insurance/types-base'
import { CustomerBuilder } from './insurance/types-customer'
import { CarBuilder } from './insurance/types-car'
import { PrimaBuilder } from './prima-builder'

async function ejemploCalculoPrima() {
    // Configuración base
    const base = new BaseBuilder()
        .setGastosAdmin('0.12')
        .setComisionBroker('0.15')
        .setIVA('0.21')
        .setImpuestoSellos('0.012')
        .setTasaBase(TipoSeguro.AUTO, NivelCobertura.COMPLETO)
        .build()

    // Datos del cliente
    const customer = new CustomerBuilder()
        .setEdad(35)
        .setSexo('masculino')
        .setEstadoCivil('casado')
        .setOcupacion('empleado')
        .setAntiguedadLicencia(10)
        .setSiniestros(0)
        .setZonaRiesgo('medio')
        .build()

    // Datos del vehículo
    const vehicle = new CarBuilder()
        .setMarca('Toyota')
        .setModelo('Corolla')
        .setAnio(2020)
        .setUso('particular')
        .setCilindrada(1600)
        .setTipoCombustible('nafta')
        .setSeguridadAlarm(true)
        .build()

    // Calcular prima
    const primaCalculator = new PrimaBuilder(base, customer, vehicle)

    try {
        const primaAnual = await primaCalculator.calcular()
        console.log(`Prima anual calculada: $${primaAnual}`)

        // Calcular cuotas
        // const cuotasMensual = await primaCalculator.calcularCuotas(primaAnual, 'mensual')
        // console.log(`Cuotas mensuales: ${cuotasMensual.cantidadCuotas} cuotas de $${cuotasMensual.valorCuota}`)

        return {
            primaAnual,
            // cuotasMensual
        }
    } catch (error) {
        console.error('Error calculando prima:', error)
        throw error
    }
}

if (require.main === module) {
    ejemploCalculoPrima()
        .then(resultado => console.log('Cálculo completado:', resultado))
        .catch(error => {
            console.error('Error en el cálculo:', error)
            process.exit(1)
        })
}

export {
    BaseBuilder,
    CustomerBuilder,
    CarBuilder,
    PrimaBuilder,
    TipoSeguro,
    NivelCobertura
}