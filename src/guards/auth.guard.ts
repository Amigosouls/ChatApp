import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from 'src/services/supabase.service';

export  const authGuard: CanActivateFn = async  (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const user = await supabase.getUser();
  
  if (user) {
    return true;
  } else {
    router.navigate(['/auth']); // Redirect to login page if not authenticated
    return false;
  }
};
