import { faker } from '@faker-js/faker'

const getInversion = () => ({
    idIdea: faker.number.int({ min:1, max: 10 }),
    idInversor: 1,
    dineroInvertido: faker.number.int({ min:1, max: 100000 }),
})

export default { getInversion }