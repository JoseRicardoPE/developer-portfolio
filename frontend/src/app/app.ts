import { Component, signal } from '@angular/core';
import { Profile } from './features/profile/profile';
import { ProfessionalProfile } from './features/professional-profile/professional-profile';
import { Technologies } from './features/technologies/technologies';
import { Experience } from './features/experience/experience';
import { Projects } from './features/projects/projects';
import { Education } from './features/education/education';
import { Languages } from './features/languages/languages';
import { Navigation } from "./features/navigation/navigation";
import { ThemeToggle } from "./features/theme-toggle/theme-toggle";
import { LanguageSelector } from "./features/language-selector/language-selector";

@Component({
  selector: 'app-root',
  imports: [
    Profile,
    ProfessionalProfile,
    Technologies,
    Experience,
    Projects,
    Education,
    Languages,
    Navigation,
    ThemeToggle,
    LanguageSelector
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
