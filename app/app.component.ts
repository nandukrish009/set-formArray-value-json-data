import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data = {
    companies: [
      {
        company: 'example comany',
        projects: [
          {
            projectName: 'example project',
            rec: 'one',
            op: [
              {
                a: 'aOne',
                b: 'bOne',
                c: [
                  {
                    d: 'dOne',
                    e: 'eOne',
                  },
                  {
                    d: 'dOne 12',
                    e: 'eOne 12',
                  },
                  {
                    d: 'dOne 13',
                    e: 'eOne 13',
                  },
                ],
              },
              {
                a: 'cOne',
                b: 'dOne',
                c: [
                  {
                    d: 'dOne 1',
                    e: 'eOne 1',
                  },
                  {
                    d: 'dOne 14',
                    e: 'eOne 14',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      companies: this.fb.array([]),
    });

    this.setCompanies();
  }

  addNewCompany() {
    let control = <FormArray>this.myForm.controls.companies;
    control.push(
      this.fb.group({
        company: [''],
        projects: this.fb.array([this.op()]),
      })
    );
  }
  op() {
    return this.fb.group({
      a: [''],
      b: [''],
      c: this.fb.array([this.c()]),
    });
  }
  c() {
    return this.fb.group({
      d: [''],
      e: [''],
    });
  }

  deleteCompany(index) {
    let control = <FormArray>this.myForm.controls.companies;
    control.removeAt(index);
  }

  addNewProject(control) {
    control.push(
      this.fb.group({
        projectName: [''],
        rec: [''],
        op: this.fb.group({
          a: [''],
          b: [''],
        }),
      })
    );
  }

  deleteProject(control, index) {
    control.removeAt(index);
  }

  setCompanies() {
    let control = <FormArray>this.myForm.controls.companies;
    this.data.companies.forEach((x) => {
      control.push(
        this.fb.group({
          company: x.company,
          projects: this.setProjects(x),
        })
      );
    });
  }

  setProjects(x) {
    let arr = new FormArray([]);
    x.projects.forEach((y) => {
      arr.push(
        this.fb.group({
          projectName: y.projectName,
          rec: y.rec,
          op: this.setReco(y),
        })
      );
    });
    return arr;
  }
  setReco(y) {
    console.log('y', y.op);
    let arrOne = new FormArray([]);
    y.op.forEach((z) => {
      arrOne.push(
        this.fb.group({
          a: z.a,
          b: z.b,
          c: this.setRecoo(z),
        })
      );
    });
    return arrOne;
  }
  setRecoo(z) {
    console.log(z.c);
    let arrTwo = new FormArray([]);
    z.c.forEach((o) => {
      arrTwo.push(
        this.fb.group({
          d: o.d,
          e: o.e,
        })
      );
    });
    return arrTwo;
  }
  onSubmit() {
    console.log(this.myForm.value);
  }
}
