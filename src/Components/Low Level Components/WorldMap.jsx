import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function WorldMap() {
    const chartRef = useRef(null);

    useEffect(() => {
        let chartInstance = null;

        // 1. Traemos el JSON del mapa (CDN confiable)
        fetch('https://raw.githubusercontent.com/apache/echarts/master/test/data/map/json/world.json')
            .then(res => res.json())
            .then(geoJson => {
                // 2. Registramos el mapa "world"
                echarts.registerMap('world', geoJson);

                if (chartRef.current) {
                    chartInstance = echarts.init(chartRef.current);

                    const options = {
                        backgroundColor: 'transparent', // Fondo transparente para que use el del div blanco
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderWidth: 0,
                            shadowBlur: 8,
                            shadowColor: 'rgba(0,0,0,0.1)',
                            textStyle: { color: '#333', fontSize: 12 }
                        },
                        visualMap: {
                            show: false, // Lo ocultamos para que quede limpio
                            min: 0,
                            max: 1000,
                            // Escala de azules de Tailwind (celeste a azul fuerte)
                            inRange: { color: ['#f1f5f9', '#93c5fd', '#3b82f6'] }
                        },
                        series: [{
                            type: 'map',
                            map: 'world',
                            roam: true, // Permitimos moverlo y zoom (pinch-to-zoom)

                            // --- ESTO ES LO QUE LO HACE CHICO Y CENTRADO ---
                            top: '15%',           // Bajamos un poco para que no pegue arriba
                            bottom: '15%',        // Subimos un poco del borde inferior
                            layoutCenter: ['50%', '50%'], // Centro matemático del div
                            layoutSize: '120%',   // Tamaño compacto para que no se "caiga" ni explote

                            // Estilo de los países (bordes finos, color base)
                            itemStyle: {
                                areaColor: '#f1f5f9', // Gris claro de fondo
                                borderColor: '#cbd5e1', // Gris más fuerte para las fronteras
                                borderWidth: 0.5
                            },
                            // Estilo cuando pasas el mouse (Emphasis)
                            emphasis: {
                                label: { show: false },
                                itemStyle: { areaColor: '#1d4ed8' } // Azul más oscuro al hover
                            },

                            data: [
                                { name: 'United States', value: 1000 },
                                { name: 'Argentina', value: 900 },
                                { name: 'Brazil', value: 600 },
                                { name: 'China', value: 850 },
                                { name: 'Germany', value: 700 }
                            ]
                        }]
                    };

                    chartInstance.setOption(options);

                    // Hacer responsivo al resize de la ventana
                    const handleResize = () => chartInstance.resize();
                    window.addEventListener('resize', handleResize);

                    return () => window.removeEventListener('resize', handleResize);
                }
            });

        return () => {
            if (chartInstance) {
                chartInstance.dispose();
            }
        };
    }, []);

    // DIV con ref. Usamos h-full para que use el alto que le demos en Analytics.
    return (
        <div className="w-full h-full min-h-[180px]" ref={chartRef} />
    );
}