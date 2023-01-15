import { MediaItemService } from './../media-item.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { lookupListToken } from '../providers';

@Component({
  selector: 'mw-media-item-form',
  templateUrl: './media-item-form.component.html',
  styleUrls: ['./media-item-form.component.css']
})
export class MediaItemFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private mediaItemService: MediaItemService,
              @Inject(lookupListToken) public lookupLists: any) {
    
    this.form = new FormGroup({});
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      medium: this.formBuilder.control('Movie'),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator),
    });
  }

  yearValidator(control: AbstractControl) {
    if(control.value.trim().length === 0) {
      return null;
    }
    const year = parseInt(control.value, 10);
    const minYear = 1900;
    const maxYear = 2100;
    if(year >= minYear && year <= maxYear) {
      return null;
    } else {
      return {
        year: {
        min: minYear,
        max: maxYear
        }
      };
    }
  }

  onSubmit(mediaItem : any) {
    console.log(mediaItem);
    this.mediaItemService.add(mediaItem);
  }


}
