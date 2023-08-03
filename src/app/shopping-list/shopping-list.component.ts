import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import { selectShoppingList } from './store/shopping-list.selectors';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select(selectShoppingList);

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(ShoppingListActions.startEdit({ payload: { index } }));
  }
}
