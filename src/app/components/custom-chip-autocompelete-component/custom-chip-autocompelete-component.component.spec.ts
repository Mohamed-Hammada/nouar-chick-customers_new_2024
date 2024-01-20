import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChipAutocompeleteComponentComponent } from './custom-chip-autocompelete-component.component';

describe('CustomChipAutocompeleteComponentComponent', () => {
  let component: CustomChipAutocompeleteComponentComponent;
  let fixture: ComponentFixture<CustomChipAutocompeleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomChipAutocompeleteComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomChipAutocompeleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
