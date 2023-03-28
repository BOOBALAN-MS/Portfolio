import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EducationComponent } from './components/education/education.component';
import { FirstpageComponent } from './components/firstpage/firstpage.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {
    path:'',
    component: FirstpageComponent
  },
  {
    path:'homepage',
    component: HomepageComponent
  },
  {
    path:'education',
    component: EducationComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
