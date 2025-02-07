import { inject } from "@angular/core";
import { GuardResult, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export default function canActivateRequireLogin(): GuardResult  {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.tokenValue() == null) {
    return router.createUrlTree(["/"]);
  }
  return true;
}
