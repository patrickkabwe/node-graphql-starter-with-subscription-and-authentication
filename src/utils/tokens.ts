import { createSecretKey } from 'crypto';
import * as jose from 'jose';

const genKey = async () => {
  const privateKey = createSecretKey(process.env.SECRET_KEY as any);
  
  return  privateKey;
}

export const createToken = async (userId: string) => {
  const token = await new jose.SignJWT({uid: userId})
    .setProtectedHeader({ alg: process.env.ALGO as string })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(await genKey());
  return token;
};

export const verifyToken = async (token: string) => {
  const privateKey = await genKey()
  const { payload } = await jose.jwtVerify(token, privateKey)
  return payload as { uid: string };
};

export const decodeToken = (token: string) => {
  const decoded = jose.decodeJwt(token)
  return decoded as { uid: string };
};
