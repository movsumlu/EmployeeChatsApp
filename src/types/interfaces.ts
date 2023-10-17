export interface IEmployee {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  login: string;
  city: string;
  ticket: string;
  citizenship: string;
  age: Date;
  gender: string;
  registeredDate: Date;
  employmentDate: Date;
  FPStatus: string;
  accountStatus: string;
  applicationStatus: string;
}

export interface INavidationItem {
  name: string;
  value: string;
}
