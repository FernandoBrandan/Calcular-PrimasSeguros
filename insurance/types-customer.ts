// Factores por edad del conductor
type Edad = '18-21' | '22-25' | '26-30' | '31-45' | '46-60' | '61-70' | '71+'
const FACTORES_EDAD: Record<Edad, number> = {
    '18-21': 1.8,    // Muy alto riesgo
    '22-25': 1.5,    // Alto riesgo
    '26-30': 1.2,    // Riesgo moderado
    '31-45': 1.0,    // Riesgo base
    '46-60': 0.9,    // Riesgo bajo
    '61-70': 1.1,    // Riesgo moderado por edad
    '71+': 1.4       // Alto riesgo por edad
}

// Factores por zona de riesgo(basado en códigos postales CABA / GBA)
type Zona = 'muy_bajo' | 'bajo' | 'medio' | 'alto' | 'muy_alto'
const FACTORES_Zona: Record<Zona, number> = {
    'muy_bajo': 0.8,   // Zonas residenciales premium
    'bajo': 0.9,       // Zonas residenciales
    'medio': 1.0,      // Zona base
    'alto': 1.3,       // Zonas comerciales / centro
    'muy_alto': 1.8    // Zonas de alto riesgo
}

//  Factor por antigüedad de licencia
type Antiguedad = '0-1' | '2-3' | '4-10' | '11+'
const FACTORES_ANTIGUEDAD: Record<Antiguedad, number> = {
    '0-1': 1.4,     //  Conductor novel
    '2-3': 1.2,     //  Poca experiencia
    '4-10': 1.0,    //  Experiencia normal
    '11+': 0.9      //  Conductor experimentado
}

type Siniestros = 0 | 1 | 2 | 3 | 4
const FACTORES_USO: Record<Siniestros, number> = {
    0: 0.9,     //  Buen conductor(descuento)
    1: 1.0,     //  Base
    2: 1.3,     //  Penalización moderada
    3: 1.6,     //  Alta penalización
    4: 2.0,     //  Muy alta penalización
}

type Claims = 0 | 1 | 2 | 3 | 4
const FACTORES_CLAIMS: Record<Claims, number> = {
    0: 0.9,
    1: 1.0,
    2: 1.3,
    3: 1.6,
    4: 2.0,
}


