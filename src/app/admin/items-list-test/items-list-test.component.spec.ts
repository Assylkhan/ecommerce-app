import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListTestComponent } from './items-list-test.component';

describe('ItemsListTestComponent', () => {
  let component: ItemsListTestComponent;
  let fixture: ComponentFixture<ItemsListTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsListTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
