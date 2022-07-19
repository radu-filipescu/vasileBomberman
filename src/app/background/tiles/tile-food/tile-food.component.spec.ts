import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileFoodComponent } from './tile-food.component';

describe('TileFoodComponent', () => {
  let component: TileFoodComponent;
  let fixture: ComponentFixture<TileFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
