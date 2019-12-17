import {passport} from 'passport';
import {Strategy} from 'passport-jwt';
import {ExtractJwt} from'passport-jwt';

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = 'secret';

