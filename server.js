

const http = require('http');

const PUERTO = 3000;
const NOTA_MINIMA = 3.0;
const notasDelCurso = [4.5, 3.5, 2.5, 4.0];
const datosEquipo = {
    equipo: 'Equipo NN',
    integrantes: ['Jose Barranco']
};

function calcularPromedio(notas) {
    return notas.reduce((suma, nota) => suma + nota, 0) / notas.length;
}

function estaAprobado(promedio) {
    return promedio >= NOTA_MINIMA;
}

function responder(res, codigo, datos) {
    res.writeHead(codigo, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(datos, null, 2));
}

function obtenerResumenNotas() {
    const promedio = calcularPromedio(notasDelCurso);
    return { promedio: promedio, aprobado: estaAprobado(promedio) };
}

const rutas = {
    '/salud': () => ({ estado: 'ok' }),
    '/equipo': () => datosEquipo,
    '/notas': () => obtenerResumenNotas()
};

const servidor = http.createServer((req, res) => {
    const manejador = rutas[req.url];
    if (manejador) {
        responder(res, 200, manejador());
    }   else {
        responder(res, 404, { error: 'Ruta no encontrada' });
    }
});

servidor.listen(80);






