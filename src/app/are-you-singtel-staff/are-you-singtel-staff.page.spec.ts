import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreYouSingtelStaffPage } from './are-you-singtel-staff.page';

describe('AreYouSingtelStaffPage', () => {
  let component: AreYouSingtelStaffPage;
  let fixture: ComponentFixture<AreYouSingtelStaffPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AreYouSingtelStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreYouSingtelStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
