import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app-module';
import { 
  GdsButton, 
  GdsText 
} from '@sebgroup/green-core/pure';

GdsButton.define();
GdsText.define();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: unknown) => console.error(err));
