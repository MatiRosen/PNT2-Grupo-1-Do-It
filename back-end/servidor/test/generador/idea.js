import { faker } from '@faker-js/faker'

const formData = new FormData()

const getIdea = _ => ({
    titulo: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    categoria: faker.commerce.productAdjective(),
    precio: faker.number.float({ min: 1 }),
    idCreador: faker.number.int({ min: 1, max: 10}),
    vecesVisto: faker.number.int({ min: 1, max: 20}),
    cantidadInversiones: faker.number.int({ min: 1, max: 20}),
    imagen: faker.image.url()
})

export default { getIdea }