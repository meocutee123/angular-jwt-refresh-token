export class Landlord {
  id!: number;
  street: string | undefined;
  unit: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zipCode: string | undefined;
  emailAddress: string | undefined;
  phoneNumber: string | undefined;
  preferredContactMethod: PreferredContactMethod | undefined;
  otherDetail: LandlordOtherDetail[] = [];
}

enum PreferredContactMethod {
  EmailAddress,
  PhoneNumbers
}

class LandlordOtherDetail {
  id!: number;
  label: string | undefined;
  fieldAlias: string | undefined;
  value: string | undefined;
}