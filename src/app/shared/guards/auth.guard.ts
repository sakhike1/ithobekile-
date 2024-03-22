import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserManagementService } from "../services/user-management.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const userManagementService = inject(UserManagementService);
  const router = inject(Router);
  const userId = await userManagementService.getCurrentlyLoggedInUserId();

  if (route.routeConfig?.path === "" && userId) return router.parseUrl("/home");

  return true;
};
