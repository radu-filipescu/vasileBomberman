import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileWallComponent } from './tile-wall.component';

describe('TileWallComponent', () => {
  let component: TileWallComponent;
  let fixture: ComponentFixture<TileWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
