import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorIncomingOrderDetailsPage } from './vendor-incoming-order-details.page';

describe('VendorIncomingOrderDetailsPage', () => {
  let component: VendorIncomingOrderDetailsPage;
  let fixture: ComponentFixture<VendorIncomingOrderDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorIncomingOrderDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorIncomingOrderDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
