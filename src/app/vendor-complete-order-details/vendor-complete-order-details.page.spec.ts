import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorCompleteOrderDetailsPage } from './vendor-complete-order-details.page';

describe('VendorCompleteOrderDetailsPage', () => {
  let component: VendorCompleteOrderDetailsPage;
  let fixture: ComponentFixture<VendorCompleteOrderDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorCompleteOrderDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCompleteOrderDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
