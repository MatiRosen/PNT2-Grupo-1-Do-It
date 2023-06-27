import { faker } from '@faker-js/faker'

const getUsuario = () => ({
    nombre: faker.person.firstName(),
    apellido: faker.person.lastName(),
    email: faker.internet.email(),
    dni: faker.number.int({ min:1000000 }),
    nacimiento: faker.date.birthdate(),
    genero: faker.person.gender(),
    telefono: faker.phone.number(),
    direccion: faker.location.streetAddress(),
    contraseña: faker.internet.password(),
    tipo: faker.helpers.arrayElement(['Creador', 'Inversor']),
})

export default { getUsuario }