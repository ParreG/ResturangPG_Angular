import '@sebgroup/green-core/components/dropdown/index.js';
import '@sebgroup/green-core/components/button/index.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app-module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: unknown) => console.error(err));
