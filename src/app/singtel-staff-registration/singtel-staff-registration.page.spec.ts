import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingtelStaffRegistrationPage } from './singtel-staff-registration.page';

describe('SingtelStaffRegistrationPage', () => {
  let component: SingtelStaffRegistrationPage;
  let fixture: ComponentFixture<SingtelStaffRegistrationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingtelStaffRegistrationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingtelStaffRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
