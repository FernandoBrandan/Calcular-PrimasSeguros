
https://api-sandbox.fedpat.com.ar/documentacion-cotizador.html#tag/Cotizacion-auto/operation/cotizarPorApi

## Calcular descuentos

```js
function calcularDescuentos(): number {
    let totalDescuento = 0
    if (descuentos.alarma) totalDescuento += 0.05                   // 5% por alarma
    if (descuentos.gps) totalDescuento += 0.03                      // 3% por GPS
    if (descuentos.cochera) totalDescuento += 0.08                  // 8% por cochera
    if (descuentos.antiguedadCliente > 3) totalDescuento += 0.10    // 10% cliente antiguo
    if (descuentos.debito) totalDescuento += 0.02                   // 2% débito automático
    return Math.min(totalDescuento, 0.25)                           // Máximo 25% descuento
}
```

## Ejemplos básicos de las mejoras:

### 1. Validaciones robustas
```typescript
setEdad(edad: number): this {
    if (edad < 18 || edad > 120) throw new Error('Edad debe estar entre 18 y 120 años')
    this.edad = this.obtenerEdad(edad)
    return this
}
```

### 2. Campos obligatorios con validación
```typescript
build(): CustomerBuilder {
    const requiredFields = ['edad', 'sexo', 'estadoCivil']
    const missing = requiredFields.filter(field => !this[field])
    if (missing.length > 0) throw new Error(`Campos obligatorios faltantes: ${missing.join(', ')}`)
    return this
}
```

### 3. Manejo seguro de factores
```typescript
calcular(): number {
    let factor = 1.0
    factor *= FACTORES_EDAD[this.edad] ?? 1.0  // Usar ?? en lugar de ||
    factor *= FACTORES_SEXO[this.sexo] ?? 1.0
    // ...
    return Math.round(factor * 100) / 100
}
```

### 4. Unificar arquitectura (todo en clases)
```typescript
class PrimaBuilder {
    // Mover calcular() dentro de la clase en lugar de prototype
    async calcular(): Promise<number> {
        // lógica aquí
    }
}
```

### 5. Factores externalizados
```typescript
// config/factores.json
// Los factores están centralizados y son fáciles de actualizar
// Los factores están hardcodeados, deberían venir de configuración/BD
{
    "edad": {
        "18-21": 1.8,
        "22-25": 1.5
    }
}

// Cargar en runtime
const FACTORES_EDAD = await loadConfig('factores.edad')
```

### 6. Logging para auditoría
```typescript
calcular(): number {
    const details = {
        factorEdad: FACTORES_EDAD[this.edad],
        factorSexo: FACTORES_SEXO[this.sexo]
    }
    console.log('Cálculo realizado:', details)
    
    return factor
}
```

### 7. Interfaces más estrictas
```typescript
interface CustomerData {
    readonly edad: number
    readonly sexo: Sexo
    readonly estadoCivil: EstadoCivil
    readonly ocupacion: Ocupacion
    // Todos obligatorios, sin opcionales
}
```

### 8. Manejo de errores comprehensivo
```typescript
async calcular(): Promise<number> {
    try {
        // lógica de cálculo
    } catch (error) {
        throw new PrimaCalculationError(
            `Error calculando prima: ${error.message}`,
            { customer: this.customer, vehicle: this.objeto_asegurado }
        )
    }
}
```

### 9. Sistema de configuración
```typescript
class ConfigManager {
    static loadFactors(type: 'edad' | 'zona' | 'vehiculo') {
        // Cargar desde BD o archivo según environment
        return process.env.NODE_ENV === 'test' 
            ? mockFactors[type] 
            : dbFactors[type]
    }
}
```

### 10. Descuentos dinámicos
```typescript
interface Descuento {
    nombre: string
    condicion: (customer: Customer, vehicle: Vehicle) => boolean
    factor: number
}

const descuentos: Descuento[] = [
    {
        nombre: 'Cliente fiel',
        condicion: (c) => c.antiguedadCliente > 5,
        factor: 0.9
    }
]
```