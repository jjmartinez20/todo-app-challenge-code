import basicAuth from 'express-basic-auth';
import Auth from '../services/auth.service';

export default basicAuth({
    authorizeAsync: true,
    challenge: true,
    unauthorizedResponse: { message: "Unauthorized Access"},
    authorizer: async (user: string, password: string, cb: basicAuth.AsyncAuthorizerCallback) => {
        const auth: Auth = new Auth();
        const result: boolean = await auth.verify(user, password);
        return cb(null, result );
    }
})