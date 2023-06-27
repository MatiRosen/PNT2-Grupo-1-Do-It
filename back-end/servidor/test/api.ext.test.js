import generador from './generador/idea.js'
import { expect } from 'chai'
import supertest from 'supertest'
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../back-end/public/images');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});

const request = supertest('http://localhost:8080/api/')
const upload = multer({ storage: storage });

describe('Test ApiRestFul', () =>{
    //CASOS DE PRUEBAS DE TODOS LOS GET
    describe('GET ideas', () => {
        it('Obtener ideas por creador deberia retornar un status 200', async () => {            
            const response = await request.get('ideas/creador/:idCreador?')
            expect(response.status).to.eql(200)
        })
        it('Obtener ideas filtradas por titulo deberia retornar un status 200', async () => {            
            const response = await request.get('ideas/filtro/titulo/Tech Haven')
            expect(response.status).to.eql(200)
        })
        it('Obtener ideas filtradas por categoria deberia retornar un status 200', async () => {            
            const response = await request.get('ideas/filtro/categoria/Salud')
            expect(response.status).to.eql(200)
        })
        it('Obtener ideas filtradas por un campo que no existe deberia retornar un status 500', async () => {            
            const response = await request.get('ideas/filtro/error/Salud')
            expect(response.status).to.eql(500)
        })
        it('Obtener top de ideas deberia retornar un status 200', async () => {            
            const response = await request.get('ideas/obtenerTop')
            expect(response.status).to.eql(200)
        })
    }) 
    //CASOS DE PRUEBAS DE TODOS LOS POST
    describe('POST ideas', () => {
        it('Agregar una idea deberia retornar un status 200', async () => {            
            const ideaEnviada = generador.getIdea()
            console.log(ideaEnviada);
            const response = await request.post('ideas/').send(ideaEnviada)
            expect(response.status).to.eql(200)

            const ideaRecibida = response.body
            expect(ideaRecibida).to.include.keys('titulo', 'descripcion', 'categoria', 'precio', 'idCreador', 'vecesVisto', 'cantidadInversiones')
            expect(ideaRecibida.titulo).to.eql(ideaEnviada.titulo)
            expect(ideaRecibida.descripcion).to.eql(ideaEnviada.descripcion)
            expect(ideaRecibida.categoria).to.eql(ideaEnviada.categoria)
            expect(ideaRecibida.precio).to.eql(ideaEnviada.precio)
            expect(ideaRecibida.idCreador).to.eql(ideaEnviada.idCreador)
            expect(ideaRecibida.vecesVisto).to.eql(ideaEnviada.vecesVisto)
            expect(ideaRecibida.cantidadInversiones).to.eql(ideaEnviada.cantidadInversiones)
            expect(ideaRecibida.imagen).to.eql(ideaEnviada.imagen)
        })
    })
})