import { SendgridService } from './sendgrid.service'
import { TokenDto } from "../dtos/auth/response/token.dto";
import { plainToClass } from 'class-transformer';

jest.mock('@sendgrid/mail', () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          statusCode: 200,
          headers: {},
          body: '',
        },
      ]),
    ),
  }
})

describe('SendgridService', () => {
  describe('sendEmail', () => {
    it('should send a email', async () => {
      const to = "example_email@example.com"
      const fakeToken = plainToClass(TokenDto,{ accessToken: "my.web.token", exp: 60 });

      const result = await SendgridService.sendEmail(to,fakeToken)

      expect(result).toBeUndefined()
    })
  })
})
