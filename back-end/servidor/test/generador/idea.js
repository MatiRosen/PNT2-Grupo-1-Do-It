import { faker } from '@faker-js/faker'

const getIdea = _ => ({
    titulo: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    categoria: faker.commerce.productAdjective(),
    precio: faker.commerce.price(),
    idCreador: faker.number.int({ min: 1, max: 10}),
    vecesVisto: faker.number.int({ min: 1, max: 20}),
    cantidadInversiones: faker.number.int({ min: 1, max: 20}),
    imagen: '../../../public/images/idea.png'
})

export default { getIdea }