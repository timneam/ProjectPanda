import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLauncher } from '@capacitor/app-launcher';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.page.html',
  styleUrls: ['./payment-options.page.scss'],
})
export class PaymentOptionsPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  async paymentOption(value) {
    
    if (value == '1') {
      this.routeToApp("com.SingTel.mWallet")
    } else if (value == '2') {
      this.routeToApp("com.dbs.sg.posbmbanking")
    } else if (value == '3') {
      this.routeToApp("com.dbs.dbspaylah")
    } else if (value == '4') {
      this.route.navigateByUrl('/order-confirmation')
    }
  }

  async routeToApp(appString) {
    // Check if app exist, Output is true/false
    const { value } = await AppLauncher.canOpenUrl({ url: appString })
    if (value == true) {
      // Route to external app
      await AppLauncher.openUrl({ url: appString });
    } else {
      // Route to Playstore
      await AppLauncher.openUrl({ url: `https://play.google.com/store/apps/details?id=${appString}` });
    }
  };

}
