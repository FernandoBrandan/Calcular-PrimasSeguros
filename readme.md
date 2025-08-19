
https://api-sandbox.fedpat.com.ar/documentacion-cotizador.html#tag/Cotizacion-auto/operation/cotizarPorApi


## Parámetros Principales para Calcular Primas

### 1. **Datos del Vehículo**
- **Marca y modelo**: Afecta directamente el costo de reparación y probabilidad de robo
- **Año del vehículo**: Determina depreciación y valor de mercado
- **Valor asegurado**: Base para calcular coberturas
- **Tipo de uso**: Particular, comercial, taxi, etc.
- **Cilindrada del motor**: Mayor cilindrada = mayor riesgo
- **Tipo de combustible**: Nafta, diesel, GNC, eléctrico

### 2. **Datos del Conductor/Asegurado**
- **Edad**: Conductores jóvenes (18-25) y mayores (+65) tienen primas más altas
- **Sexo**: Estadísticamente los hombres tienen más siniestros
- **Antigüedad de licencia**: Más experiencia = menor riesgo
- **Historial de siniestros**: Factor crítico - cada siniestro previo aumenta la prima
- **Estado civil**: Casados estadísticamente tienen menos siniestros
- **Ocupación**: Ciertas profesiones consideradas de mayor/menor riesgo

### 3. **Datos Geográficos**
- **Código postal de circulación**: Zona de mayor riesgo de robo/accidentes
- **Lugar de guardado**: Cochera cubierta vs. calle
- **Zona de trabajo**: Si difiere del domicilio

### 4. **Coberturas Elegidas**
- **Responsabilidad Civil**: Obligatorio por ley
- **Daño Parcial**: Cubre reparaciones por choques, granizo, etc.
- **Robo/Hurto Total**: Muy común en Argentina
- **Incendio**: Riesgo específico
- **Cristales**: Cobertura adicional
- **Franquicia elegida**: A menor franquicia, mayor prima

### 5. **Factores de Riesgo Específicos**
- **Kilometraje anual**: Mayor uso = mayor exposición
- **Conductor habitual**: Si hay conductores adicionales
- **Sistemas de seguridad**: Alarmas, GPS, etc. pueden dar descuentos
- **Uso nocturno**: Circulación en horarios de mayor riesgo

## Fórmula Conceptual Básica

```javascript
function calcularPrimaConceptual(parametros) {
    const {
        valorVehiculo,
        edadConductor,
        antiguedadLicencia,
        historialSiniestros,
        zonaRiesgo,
        tipoCobertura,
        franquicia,
        descuentos
    } = parametros;
    
    // Prima base según valor del vehículo y tipo de cobertura
    let primaBase = valorVehiculo * TASA_BASE[tipoCobertura];
    
    // Factores de multiplicación
    const factorEdad = calcularFactorEdad(edadConductor);
    const factorExperiencia = calcularFactorExperiencia(antiguedadLicencia);
    const factorSiniestros = calcularFactorSiniestros(historialSiniestros);
    const factorZona = FACTOR_ZONA[zonaRiesgo];
    const factorFranquicia = calcularFactorFranquicia(franquicia);
    
    // Aplicar factores
    let primaAjustada = primaBase * factorEdad * factorExperiencia * 
                        factorSiniestros * factorZona * factorFranquicia;
    
    // Aplicar descuentos
    primaAjustada = primaAjustada * (1 - descuentos);
    
    // Gastos administrativos y comisiones
    primaAjustada = primaAjustada * (1 + GASTOS_ADMIN + COMISIONES);
    
    return primaAjustada;
}
```

## Consideraciones Técnicas Importantes

### Tablas Actuariales
Necesitarás acceso a:
- Tablas de mortalidad vehicular por zona
- Estadísticas de siniestralidad por perfil de conductor
- Valores de mercado actualizados de vehículos
- Tasas de criminalidad por código postal

### Reservas Técnicas
Las aseguradoras deben mantener reservas para siniestros no reportados (IBNR) como establece la SSN.

### Validaciones Regulatorias
Las primas deben tener respaldo actuarial y no ser abusivas ni discriminatorias, especialmente para seguros de personas.

## Recomendación para tu Desarrollo

Para un MVP o prototipo, podrías:

1. **Usar APIs externas** especializadas en cálculo de primas (varias aseguradoras tienen APIs)
2. **Implementar un motor simplificado** con los parámetros básicos
3. **Consultar con un actuario** para validar tu modelo
4. **Usar machine learning** entrenado con datos históricos de siniestros

El cálculo real involucra modelos estadísticos complejos, análisis de riesgo geográfico y consideraciones macroeconómicas (inflación, devaluación) específicas de Argentina.

¿Te interesa que profundice en algún aspecto específico o que te ayude con la implementación de alguna parte en particular?
