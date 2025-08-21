# Calculadora de Primas de Seguros

Sistema para el cálculo de primas de seguros utilizando el patrón Builder, diseñado para ser extensible y manejar diferentes tipos de seguros (automotor, hogar, vida).

## Características

- **Arquitectura modular**: Implementa el patrón Builder para una construcción flexible de objetos
- **Extensible**: Preparado para manejar múltiples tipos de seguros
- **Cálculos precisos**: Incluye factores de riesgo, gastos operativos e impuestos
- **TypeScript**: Completamente tipado para mayor seguridad en el desarrollo

## API

### PrimaBuilder

Calculadora principal:

### BaseBuilder

Configura los parámetros base del seguro:

- `setGastosAdmin(porcentaje: string)`: Gastos administrativos
- `setComisionBroker(porcentaje: string)`: Comisión del broker
- `setIVA(porcentaje: string)`: Impuesto al Valor Agregado
- `setImpuestoSellos(porcentaje: string)`: Impuesto a los sellos
- `setTasaBase(tipo: TipoSeguro, nivel: NivelCobertura)`: Configura la tasa base

### CustomerBuilder

Construye el perfil del cliente:

- `setEdad(edad: number)`: Edad del asegurado
- `setSexo(sexo: string)`: Género ('masculino' | 'femenino')
- `setEstadoCivil(estado: string)`: Estado civil
- `setOcupacion(ocupacion: string)`: Ocupación del cliente
- `setAntiguedadLicencia(anos: number)`: Años con licencia de conducir
- `setSiniestros(cantidad: number)`: Cantidad de siniestros previos
- `setZonaRiesgo(zona: string)`: Nivel de riesgo de la zona ('bajo' | 'medio' | 'alto')

### CarBuilder

Construye los datos del vehículo:

- `setMarca(marca: string)`: Marca del vehículo
- `setModelo(modelo: string)`: Modelo del vehículo
- `setAnio(anio: number)`: Año de fabricación
- `setUso(uso: string)`: Tipo de uso ('particular' | 'comercial')
- `setCilindrada(cc: number)`: Cilindrada del motor
- `setTipoCombustible(tipo: string)`: Tipo de combustible
- `setSeguridadAlarm(tiene: boolean)`: Si tiene alarma de seguridad

## Enums Disponibles

### TipoSeguro
- `AUTO`: Seguro automotor
- `HOGAR`: Seguro de hogar (pendiente implementación)
- `VIDA`: Seguro de vida (pendiente implementación)

### NivelCobertura
- `BASICO`: Cobertura básica
- `INTERMEDIO`: Cobertura intermedia
- `COMPLETO`: Cobertura completa

### Extensibilidad

Para agregar nuevos tipos de seguro:

1. Crear el builder correspondiente en `insurance/`
2. Implementar la interfaz de cálculo de factores
3. Agregar el tipo al enum `ObjetoAsegurado`
4. Configurar las tasas base en `BaseBuilder`

# Scripts disponibles

npm install 
npm run build           - Compila TypeScript a JavaScript
npm run dev             - Ejecuta en modo desarrollo con ts-node
npm start               - Ejecuta la versión compilada
npm test                - Ejecuta los tests con Jest
npm run test:watch      - Ejecuta tests en modo watch
npm run test:coverage   - Genera reporte de cobertura

