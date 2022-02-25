import sgMail from "@sendgrid/mail"
import { EmailType } from '../utils/types'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export class SendgridService {

  static async sendEmail(data: EmailType): Promise<void> {
    sgMail
      .send({
        ...data,
        from: {
          name: "Ravn Development Team",
          email: process.env.SENDGRID_SENDER_EMAIL as string
        }
      })
      .then(
        (body) => {
          console.log(body);
        },
        (error) => {
          console.error(error);
        },
      )
  }
}
