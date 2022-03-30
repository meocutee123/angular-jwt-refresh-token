import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ControlBase } from "@app/_models";

export function GetFormFields<T>(fg : FormGroup, c : any) : T {
  const r = c;
  for(let i of Object.keys(fg.value)) {
    r[i] = (fg as any).value[i]
  }
  return {...r};
}

export function ToFormGroup (cs: ControlBase<string>[]){
  const g: any = {};

  cs.forEach(c => {
      g[c.key] = c.required ? new FormControl(c.value || '', Validators.required)
                                              : new FormControl(c.value || '');
    });
    return new FormGroup(g);
}
export function isEmptyOrSpaces(s : string){
  return s === null || s.match(/^ *$/) !== null;
}