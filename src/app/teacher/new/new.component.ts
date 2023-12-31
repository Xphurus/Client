import { Component, OnInit, assertPlatform } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Assignment, IAssignment } from 'src/app/shared/models/IAssesmentCreate';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(private fb:FormBuilder, private teacherService: TeacherService, private router: Router) {}

  ngOnInit(): void {
    this.addLesson();
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  description = "";
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
   
  };


  above = this. fb.group({
    title: ['']
  })
  form = this.fb.group({

    cases: this.fb.array([])
  });


  get cases() {
    return this.form.controls["cases"] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      input: ['', Validators.required],
      output: ['', Validators.required]
    });
    this.cases.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.cases.removeAt(lessonIndex);
  }

  onSubmit()
  { 
    const coding: IAssignment = new Assignment();
    coding.title = this.above.value.title
    coding.description = this.description
    coding.startDate = this.range.value.start
    coding.endDate = this.range.value.end
    coding.evaluationCases = this.cases.value
 
    console.log(JSON.stringify(coding));
    
      this.teacherService.postAssignment(coding).subscribe({
        next: () => this.router.navigateByUrl('/teacher')
      })
  }
  
}
