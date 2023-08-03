import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { selectAuth } from './store/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<fromApp.AppState>);

  return store.select(selectAuth).pipe(
    take(1),
    map((authState) => authState.user),
    map((user) => {
      const isAuth = !!user;

      if (isAuth) return true;

      return router.createUrlTree(['/auth']);
    })
    // tap((isAuth) => {
    //   if (!isAuth) {
    //     router.navigate(['/auth']);
    //   }
    // })
  );
};
