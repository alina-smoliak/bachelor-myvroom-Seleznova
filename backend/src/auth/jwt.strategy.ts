import {Injectable, UnauthorizedException} from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'supersecretkey',
        })
    }

    async validate(payload: any) {
        const user = await this.userModel.findById(payload.sub).select('-password');
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user
    }
}
