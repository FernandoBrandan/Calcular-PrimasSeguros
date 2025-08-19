import { gastos_operativos, tasa_base } from "./insurance/types-base"
import { ObjetoAseguradoAuto } from './insurance/types-car'
import { ObjetoAseguradoCasa } from './insurance/types-house'
import { PrimaBuilder } from './index'

const gastos: gastos_operativos = {
    GASTOS_ADMIN: '10%',
    COMISION_BROKER: '5%',
    IVA: '21%',
    IMPUESTO_SELLOS: '1%'
}

const tasas: tasa_base = {
    responsabilidad_civil: '0.8%',
    terceros_completo: '1.2%',
    todo_riesgo: '2.5%',
    todo_riesgo_premium: '3.5%'
}

const auto: ObjetoAseguradoAuto = {
    tipo: 'auto',
    marca: 'Toyota',
    modelo: 'Corolla',
    anio: 2020,
    antiguedad: '0_3',
    cilindrada: '1401_2000'
}

const casa: ObjetoAseguradoCasa = {
    tipo: 'casa',
    direccion: 'Av. Siempreviva 742',
    superficie: 120,
    construccion: 'ladrillo'
}

// Prima para auto
const primaAuto = new PrimaBuilder(gastos, tasas, auto)
    .setEdad('35')
    .setZona('CABA')
    .build()

// Prima para casa
const primaCasa = new PrimaBuilder(gastos, tasas, casa)
    .setZona('Provincia')
    .build()


// console.log(primaAuto.calcularRiesgo()) // Riesgo AUTO: Toyota Corolla
// console.log(primaCasa.calcularRiesgo()) // Riesgo CASA: ladrillo en Av. Siempreviva 742