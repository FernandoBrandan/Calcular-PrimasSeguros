export class SeguroAutoCalculator {
    constructor() { }

    /**
     * Calcula la prima de seguro de auto
     * @param {Object} datos - Datos del vehículo, conductor y cobertura
     * @returns {Object} - Detalle completo del cálculo
     */
    calcularPrima(datos) {
        try {
            // Validar datos obligatorios
            this.validarDatos(datos)

            // 1. Prima base
            const primaBase = datos.valorVehiculo * this.TASAS_BASE[datos.tipoCobertura]

            // 2. Aplicar factores de riesgo
            const factorEdad = this.obtenerFactorEdad(datos.edadConductor)
            const factorZona = this.FACTOR_ZONA[datos.zonaRiesgo]
            const factorExperiencia = this.obtenerFactorExperiencia(datos.antiguedadLicencia)
            const factorSiniestros = this.obtenerFactorSiniestros(datos.cantidadSiniestros || 0)
            const factorVehiculo = this.calcularFactorVehiculo(datos.vehiculo)

            // 3. Prima ajustada por riesgo
            const primaAjustada = primaBase * factorEdad * factorZona *
                factorExperiencia * factorSiniestros * factorVehiculo

            // 4. Aplicar descuentos
            const descuentos = this.calcularDescuentos(datos.descuentos || {})
            const primaConDescuentos = primaAjustada * (1 - descuentos)

            // 5. Agregar gastos operativos
            const gastosAdmin = primaConDescuentos * this.GASTOS_ADMIN
            const comisionBroker = primaConDescuentos * this.COMISION_BROKER
            const subtotal = primaConDescuentos + gastosAdmin + comisionBroker

            // 6. Impuestos
            const impuestoSellos = subtotal * this.IMPUESTO_SELLOS
            const subtotalConSellos = subtotal + impuestoSellos
            const iva = subtotalConSellos * this.IVA
            const primaFinal = subtotalConSellos + iva

            // 7. Calcular cuotas si es necesario
            const cuotas = this.calcularCuotas(primaFinal, datos.formaPago || 'anual')

            return {
                success: true,
                calculo: {
                    primaBase,
                    factores: {
                        edad: factorEdad,
                        zona: factorZona,
                        experiencia: factorExperiencia,
                        siniestros: factorSiniestros,
                        vehiculo: factorVehiculo
                    },
                    primaAjustada,
                    descuentos: {
                        porcentaje: descuentos,
                        monto: primaAjustada * descuentos
                    },
                    gastos: {
                        administrativos: gastosAdmin,
                        comisionBroker: comisionBroker
                    },
                    impuestos: {
                        sellos: impuestoSellos,
                        iva: iva
                    },
                    primaFinal,
                    cuotas
                },
                metadata: {
                    fechaCalculo: new Date().toISOString(),
                    validez: '30 días',
                    moneda: 'ARS'
                }
            }

        } catch (error) {
            return {
                success: false,
                error: error.message
            }
        }
    }

    // Métodos auxiliares
    validarDatos(datos) {
        const camposRequeridos = ['valorVehiculo', 'tipoCobertura', 'edadConductor', 'zonaRiesgo']
        for (const campo of camposRequeridos) {
            if (!datos[campo]) {
                throw new Error(`Campo requerido faltante: ${campo} `)
            }
        }

        if (datos.valorVehiculo <= 0) {
            throw new Error('El valor del vehículo debe ser mayor a 0')
        }

        if (!this.TASAS_BASE[datos.tipoCobertura]) {
            throw new Error(`Tipo de cobertura inválido: ${datos.tipoCobertura} `)
        }
    }



}

// Ejemplo de uso
const calculadora = new SeguroAutoCalculator()

// Datos de ejemplo para una Corolla 2020 en CABA
const datosEjemplo = {
    valorVehiculo: 5500000,           // $5.5M ARS
    tipoCobertura: 'todo_riesgo',
    edadConductor: 35,
    antiguedadLicencia: 10,
    zonaRiesgo: 'medio',              // CABA zona centro
    cantidadSiniestros: 0,
    vehiculo: {
        cilindrada: '1401_2000',      // 1.8L
        antiguedad: '4_7',            // 5 años
        uso: 'particular'
    },
    descuentos: {
        alarma: true,
        cochera: true,
        debito: true,
        antiguedadCliente: 5
    },
    formaPago: 'mensual'
}

// Calcular prima
const resultado = calculadora.calcularPrima(datosEjemplo)

if (resultado.success) {
    console.log('=== COTIZACIÓN DE SEGURO AUTO ===')
    console.log(`Prima Base: $${resultado.calculo.primaBase.toLocaleString()} `)
    console.log(`Prima Ajustada: $${resultado.calculo.primaAjustada.toLocaleString()} `)
    console.log(`Prima Final: $${resultado.calculo.primaFinal.toLocaleString()} `)
    console.log(`Forma de Pago: ${resultado.calculo.cuotas.cantidadCuotas} cuotas de $${resultado.calculo.cuotas.valorCuota.toLocaleString()} `)
} else {
    console.error('Error en el cálculo:', resultado.error)
}

// Exportar para uso como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SeguroAutoCalculator
}