import { FormGroup } from "@angular/forms";

export function GetFormFields<T>(fg : FormGroup, c : any) : T {
  const r = c;
  for(let i of Object.keys(fg.value)) {
    r[i] = (fg as any).value[i]
  }
  return {...r};
}
