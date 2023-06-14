import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './propeties-page.component.html',
  styleUrls: ['./propeties-page.component.css']
})
export class PropetiesPageComponent implements OnDestroy, OnInit {
  public user = signal<User>({
    id        : 1, 
    email     : "george.bluth@reqres.in",
    first_name: "George",
    last_name : "Bluth",
    avatar    : "https://reqres.in/img/faces/1-image.jpg"
  });
  
  public fullName = computed<string>(() => {
    return `${this.user().first_name} ${this.user().last_name}`
  });
  
  public counter = signal(10);
  
  public userChagedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });
  ngOnInit(): void {
    setInterval(() =>{
      this.counter.update(current => current + 1);
      if(this.counter() == 15){
        this.userChagedEffect.destroy();
      }
    },1000);
  } 
  ngOnDestroy(): void {
   // this.userChagedEffect.destroy();
  }
  increaseBy(value:number){
    this.counter.update(current => current + value);
  }
  onFieldUpdate(field:keyof User, value:string){
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    this.user.update(current =>{
        return {
          ...current,
          [field]:value
        }
    });

    // this.user.mutate(current => {
    //   switch( field){
    //     case'email':
    //       current.email = value;
    //     break;

    //     case'last_name':
    //       current.last_name = value;
    //     break;

    //     case'first_name':
    //       current.first_name = value;
    //     break;

    //     case'id':
    //       current.id = Number(value);
    //     break;
    //   }
    // });
  }
}
