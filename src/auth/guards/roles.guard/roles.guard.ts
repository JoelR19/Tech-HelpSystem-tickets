
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../users/entities/user.entity/user.entity'; 
import { ROLES_KEY } from '../../decorators/roles.decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; 
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    const userWithRole = user as { role: string }; 

    if (!userWithRole || !userWithRole.role) {
      return false; 
    }

    return requiredRoles.includes(userWithRole.role);
  }
}
