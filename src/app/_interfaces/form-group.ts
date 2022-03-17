import { FormGroup } from "@angular/forms";

export interface F {
  sections: T[];
  name?: string;
}

interface T {
  groupName?: string;
  formGroup: FormGroup;
  extendable?: boolean;
}