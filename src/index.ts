import { ejemploCalculoPrima as b } from "./use-cases/execBase"
import { ejemploCalculoPrima as p } from "./use-cases/execPesonalized"


if (require.main === module) {

    p()
        // b()
        .then(resultado => console.log('Cálculo completado:', resultado))
        .catch(error => {
            console.error('Error en el cálculo:', error)
            process.exit(1)
        })
}