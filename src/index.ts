import { ejemploCalculoPrima as b } from "./use-cases/execBase"



if (require.main === module) {

    b()
        .then(resultado => console.log('Cálculo completado:', resultado))
        .catch(error => {
            console.error('Error en el cálculo:', error)
            process.exit(1)
        })
} 