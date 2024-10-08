import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import   
 { UsersService } from './users.service';

@Injectable()
export class JwtStrategy extends   
 PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService)   
 {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // Replace with your secret key
    });
  }

  async validate(payload: any) {
    // Check if user exists in the database
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // User object will be available in request.user
  }
}