import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches,
} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @IsString({ message: 'O nome deve ser uma string' })
    @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' })
    username: string

    @IsNotEmpty({ message: 'O email é obrigatório' })
    @IsEmail({}, { message: 'Formato de email inválido' })
    email: string

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
            message:
                'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
        },
    )
    password: string
}
