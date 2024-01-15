import crypto from 'crypto';

// const SECRET = 'ZAIM-REST-API';

export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SESSION_TOKEN).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');
