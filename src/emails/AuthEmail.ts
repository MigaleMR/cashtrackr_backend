import { transport } from "../config/nodemailer"

type EmailType = {
    name: string
    email: string
    token: string
}

export class AuthEmail{
    static sendConfirmation = async (user : EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <alemarra98@gmail.com>',
            to: user.email,
            subject: 'CashTrackr - Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en CashTrackr, ya está casi lista </p>
                <p> Visita el siguiente enlace:</p>
                <a href="#">Confirmar Cuenta</a>
                <p>e ingresa el código: <b>${user.token}</b></p>`
        })
        console.log('Mensaje enviado', email.messageId)
    }
    static sendPasswordResetToken = async (user : EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <alemarra98@gmail.com>',
            to: user.email,
            subject: 'CashTrackr - Reestablece tu Password',
            html: `<p> Hola: ${user.name}, has solicitado reestablecer tu password</p>
                <p> Visita el siguiente enlace:</p>
                <a href="#">Reestablecer password</a>
                <p>e ingresa el código: <b>${user.token}</b></p>`
        })
        console.log('Mensaje enviado', email.accepted)
    }
}