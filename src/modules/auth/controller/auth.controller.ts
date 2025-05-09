import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { AuthDto } from '../dto/auth.dto'
import { Public } from '../../../core/common/decorators/public.decorator'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post()
    @HttpCode(HttpStatus.OK)
    async authenticate(@Body() data: AuthDto) {
        return this.authService.authenticate(data)
    }
}
