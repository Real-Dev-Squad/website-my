import { rest } from 'msw';
import ENV from 'website-my/config/environment';

export const handlers = [
  rest.get(`${ENV.BASE_API_URL}/users/self`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
         incompleteUserDetails:true,
         username:'test'
      })
    );
  }),

  rest.patch(`${ENV.BASE_API_URL}/users/self`, (req, res, ctx) => {
    return res(
      ctx.status(204),
    );
  }),
];
