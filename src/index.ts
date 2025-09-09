import { ejemploCalculoPrima as b } from "./use-cases/execBase"
import { ejemploCalculoPrima as p } from "./use-cases/execPesonalized"

// Ejecutar el ejemplo base o personalizado según se desee
// Aquí se ejecuta el base, pero puedes cambiar a 'p()' para el personalizado

if (require.main === module) {

    b()
        .then(resultado => console.log('Cálculo completado:', resultado))
        .catch(error => {
            console.error('Error en el cálculo:', error)
            process.exit(1)
        }).finally(() => {
            console.log("=== Fin del Cálculo de Prima Base ===\n\n")
        })


    p()
        .then(resultado => console.log('Cálculo completado:', resultado))
        .catch(error => {
            console.error('Error en el cálculo:', error)
            process.exit(1)
        }).finally(() => {
            console.log("=== Fin del Cálculo de Prima Personalizada ===")
        })

} 