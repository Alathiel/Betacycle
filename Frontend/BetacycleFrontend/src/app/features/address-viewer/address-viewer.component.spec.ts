import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressViewerComponent } from './address-viewer.component';

describe('AddressViewerComponent', () => {
  let component: AddressViewerComponent;
  let fixture: ComponentFixture<AddressViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
