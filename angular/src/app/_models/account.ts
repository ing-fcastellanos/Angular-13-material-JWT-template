import { Role } from './role';

export class Account {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    theme: string;
    jwtToken?: string;
    notificaciones;
}
