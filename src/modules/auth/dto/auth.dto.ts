import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Matches,
} from 'class-validator'

export class AuthDto {
    @IsEmail({}, { message: 'O email fornecido não é válido' })
    @IsNotEmpty({ message: 'O email é obrigatório' })
    email: string

    @IsString({ message: 'A senha deve ser uma string' })
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
            'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial',
    })
    password: string
}
