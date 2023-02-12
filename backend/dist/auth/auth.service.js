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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async signUp(authCredentialsDto) {
        const user = new user_entity_1.User();
        user.salt = await bcrypt.genSalt();
        user.username = authCredentialsDto.username;
        user.password = await this.hashPassword(authCredentialsDto.password, user.salt);
        try {
            await this.userRepository.save(user);
        }
        catch (error) {
            if (error.code == "23505") {
                throw new common_1.ConflictException(`User with the username ${user.username} already exists. Pick another username.`);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async logIn(authCredentialsDto) {
        let { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && await user.checkPassword(password)) {
            console.log(user.checkPassword(password));
            return "login";
        }
        else if (user == null) {
            throw new common_1.NotFoundException(`That username doesn't exist.`);
        }
        else {
            throw new common_1.BadRequestException(`The username and the password don't match.`);
        }
    }
    async hashPassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map