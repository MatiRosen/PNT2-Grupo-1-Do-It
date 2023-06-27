import generadorIdeas from './generador/idea.js'
import generadorInversion from './generador/inversion.js'
import { expect } from 'chai'
import supertest from 'supertest'

const request = supertest('http://localhost:8080/api/')

describe('Test ApiRestFul', () =>{
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
    describe('GET usuarios', () => {
        it('Obtener usuario por id deberia retornar un status 200', async () => {            
            const response = await request.get('usuarios/id/1')
            expect(response.status).to.eql(200)
        })
        it('Obtener usuario creador por id deberia retornar un status 200 y un usuario creador', async () => {            
            const response = await request.get('usuarios/creadores/')
            expect(response.status).to.eql(200)
            for (let i = 0; i < response.body.length; i++) {
                expect(response.body[i].tipo).eql('Creador')
            }
        })
        it('Obtener usuario creador por id que no existe deberia retornar un status 401', async () => {            
            const response = await request.get('usuarios/creadores/0')
            expect(response.status).to.eql(401)
        })
    })
    describe('GET inversiones', () => {
        it('Obtener inversiones deberia retornar un status 200', async () => {            
            const response = await request.get('inversiones/')
            expect(response.status).to.eql(200)
        })
        it('Obtener inversiones por id de idea e id de inversor deberia retornar un status 200', async () => {            
            const response = await request.get('inversiones/:idIdea/:idInversor')
            expect(response.status).to.eql(200)
        })
    })

    describe('POST ideas', () => {
        it('Agregar una idea deberia retornar un status 200', async () => {            
            const ideaEnviada = generadorIdeas.getIdea()
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