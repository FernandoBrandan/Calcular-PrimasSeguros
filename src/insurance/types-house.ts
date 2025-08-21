export interface ObjetoAseguradoCasa {
    tipo: "casa"
    direccion: string
    superficie: number
    construccion: "madera" | "ladrillo" | "hormigon"
}

// zona

// - **Sistemas de seguridad**: Alarmas, GPS, etc. pueden dar descuentos


// ### 3. **Datos Geográficos**
// - **Código postal de circulación**: Zona de mayor riesgo de robo/accidentes
// - **Lugar de guardado**: Cochera cubierta vs. calle
// - **Zona de trabajo**: Si difiere del domicilio