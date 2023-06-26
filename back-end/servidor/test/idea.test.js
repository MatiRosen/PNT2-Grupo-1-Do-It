import generador from './generador/idea.js'
import { expect } from 'chai'

describe('Test del generador de idea aleatoria', () =>{
    it('Debe generar una idea aleatoria con sus correspondientes campos', () => {
        const idea = generador.getIdea()
        console.log(idea)

        expect(idea).to.include.keys('titulo', 'descripcion', 'categoria', 'precio', 'idCreador', 'vecesVisto', 'cantidadInversiones', 'imagen')
    })    
})