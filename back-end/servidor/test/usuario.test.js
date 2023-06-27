import generador from './generador/usuario.js'
import { expect } from 'chai'

describe('Test del generador de usuario aleatorio', () =>{
    it('Debe generar un usuario aleatorio con sus correspondientes campos', () => {
        const usuario = generador.getUsuario()

        expect(usuario).to.include.keys('nombre', 'apellido', 'email', 'dni', 'nacimiento', 'genero', 'telefono', 'direccion', 'contraseña', 'tipo')
    })    

    it('Deberia traer un usuario aleatorio', () => {
        const usuario1 = generador.getUsuario()
        const usuario2 = generador.getUsuario()

        expect(usuario1).to.not.equal(usuario2)
    })
})