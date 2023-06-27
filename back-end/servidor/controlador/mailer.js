import nodemailer from 'nodemailer'
import ServicioUsuarios from '../servicio/usuarios.js'
import ServicioIdeas from '../servicio/ideas.js'

class ControladorMailer {
    constructor() {
        this.ServicioUsuarios = new ServicioUsuarios();      
        this.ServicioIdeas = new ServicioIdeas();  
    }
    
    opcionesMail = async (inversion) => {
        const inversor =  await this.ServicioUsuarios.obtenerUsuario(inversion.idInversor)
        const idea = await this.ServicioIdeas.obtenerIdeasPorCampo("id", inversion.idIdea)
        const creador = await this.ServicioUsuarios.obtenerCreadores(idea[0].idCreador)

        const opciones = {
            from: '"Do It!" <do-it@example.com>',
            to: creador.email,
            subject: "Nueva Inversion",
            html: `<h1>¡Hola ${creador.nombre}!</h1>
            <p>El usuario ${inversor.nombre} ${inversor.apellido} ha invertido en tu idea ${idea[0].titulo}.</p>
            <p>¡Felicitaciones!</p>`,
        }
        return opciones
    }
    
    enviarMail = async (inversion) => {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a7d1658b386d82",
                pass: "00d29f36ffbcfa"
            }
        })   
        this.opcionesMail(inversion)    
        try {
            const data = await transporter.sendMail(await this.opcionesMail(inversion))
            console.log('Mail sent', data)
        } catch (error) {
            console.error('Failure',error)
        }
    }
}

export default ControladorMailer