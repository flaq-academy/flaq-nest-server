import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import configuration from '../../common/configuration';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class JwtsService {
  constructor(private readonly AuthService: AuthService) {}

  /**Create Access  */
  async createAccesstoken(email) {
    return jwt.sign({ email }, configuration().jwtsecret, {
      expiresIn: '2h',
    });
  }
  // validate Access token
  async decodeAccessToken(token: string) {
    // try {
    const data: any = jwt.verify(token, configuration().jwtsecret);

    return data.email;
    // } catch (e) {
    //   throw new HttpException('Invalid Access Token', HttpStatus.UNAUTHORIZED);
    // }
  }
  /** Create refresh token */
  async createRefreshToken(user) {
    const { _id, userId } = user;
    const token = jwt.sign({ userId }, configuration().jwtsecret, {
      expiresIn: '60d',
      jwtid: String(_id),
    });
    return token;
  }

  /**Validate Refreshtoken */
  async decodeRefreshToken(refreshtokens: any): Promise<any> {
    try {
      const payload: string | jwt.JwtPayload = jwt.verify(
        refreshtokens,
        configuration().jwtsecret,
      );
      return payload;
    } catch (e) {
      throw new HttpException('Invalid RefreshToken', HttpStatus.NOT_FOUND);
    }
  }
}
