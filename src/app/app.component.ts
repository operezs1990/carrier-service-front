import { Component, Optional, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './authentication/services/auth.service';

@Component({
	selector: 'chankya-app',
	template: '<router-outlet></router-outlet>',
	encapsulation: ViewEncapsulation.None
})

export class ChankyaAppComponent {

	constructor(translate: TranslateService,
		private authService: AuthService) {

		translate.setDefaultLang('es');
		this.authService.loginCommands = ['/login'];
		this.authService.afterLoginCommands = ['/carrier'];
		this.authService.logoutCommands = ['/login'];
		this.authService.changePasswordCommands = ['/change-password'];

		// translate.addLangs(['es', 'en']);
		translate.addLangs(['es']);

		translate.setDefaultLang('es');
		const browserLang: string = translate.getBrowserLang();
		//translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
		translate.use('es');

	}
}
