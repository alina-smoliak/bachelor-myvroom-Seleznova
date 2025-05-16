import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/entities/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        JwtModule.register({
            secret: 'supersecretkey',
            signOptions: {expiresIn: '1h'}
        })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}
