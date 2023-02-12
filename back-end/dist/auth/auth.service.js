"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../auth/constants");
let AuthService = class AuthService {
    constructor(userrepo, jwt) {
        this.userrepo = userrepo;
        this.jwt = jwt;
    }
    async login(dto, res) {
        console.log('Im in');
        const { username, password } = dto;
        const theUser = await this.userrepo.findOne({ where: { username: (0, typeorm_2.Equal)(username) } });
        if (!theUser) {
            throw new common_1.BadRequestException("wrong credential");
        }
        const bufferedPass = Buffer.from(password);
        const hashed = theUser.password.toString();
        const isSame = bcrypt.compare(bufferedPass, hashed);
        if (!isSame) {
            throw new common_1.BadRequestException("wrong credential");
        }
        const token = await this.theToken({ name: theUser.username, pass: theUser.password });
        if (!token) {
            throw new common_1.ForbiddenException();
        }
        res.cookie('middleware', token);
        res.send();
        return res.send("Login successful");
    }
    async signup(dto) {
        const { username, password } = dto;
        const theUser = await this.userrepo.findOne({ where: { username: (0, typeorm_2.Equal)(username) } });
        if (theUser) {
            throw new common_1.BadRequestException("username already taken");
        }
        const bufferedPass = Buffer.from(password);
        const user = new users_entity_1.Users();
        user.username = username;
        user.password = await this.hashPassword(bufferedPass);
        this.userrepo.create(user);
        return "signup successfully ....";
    }
    async signout(dto) {
        const { username, password } = dto;
        const theUser = await this.userrepo.findOne({ where: { username: (0, typeorm_2.Equal)(username) } });
        await this.userrepo.delete({ username: username });
        return "wish you come back again";
    }
    async logout(req, res) {
        res.clearCookie('middleware');
        return "logout successful";
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }
    async theToken(args) {
        return this.jwt.signAsync(args, { secret: constants_1.jwtConstants.secret });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map