import generador from '../generador/idea.js'
import { expect } from 'chai'

describe('Test del generador de idea aleatoria', () =>{
    it('Debe generar una idea aleatoria con sus correspondientes campos', () => {
        const idea = generador.getIdea()

        expect(idea).to.include.keys('titulo', 'descripcion', 'categoria', 'precio', 'idCreador', 'vecesVisto', 'cantidadInversiones')
    })    

    it('Deberia traer una idea aleatoria', () => {
        const idea1 = generador.getIdea()
        const idea2 = generador.getIdea()

        expect(idea1).to.not.equal(idea2)
    })
})