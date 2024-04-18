import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewContainerRef } from '@angular/core';

import { User } from './auth-form/auth-form.interface';
import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  imports: [],
  standalone: true,
  template: `
    <div>
      <div #entry>
      </div>
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  
  //static - true to resolve query results before change detection runs
  //static queries with static - true resolve once the view has been created, but before
  //change detection runs (before the ngOnInit() callback is called)
  @ViewChild('entry',{read: ViewContainerRef}) entry!: ViewContainerRef;

  constructor(private cd: ChangeDetectorRef){}

  ngAfterViewInit():void{
    // const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    // const component = this.entry.createComponent(authFormFactory)

    if(this.entry){
      const component = this.entry.createComponent(AuthFormComponent);
      component.instance.title="Create Account";
      component.instance.submitted.subscribe(this.loginUser);
      this.cd.detectChanges();
    } 

  }

  loginUser(user: User) {
    console.log('Login', user);
  }

}
