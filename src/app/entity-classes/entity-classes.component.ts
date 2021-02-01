export class Collection {
  collectionID: number;
  name: string;
  description: string;
  theme: string;
  colImg: string;
  dateOfCreation: string;
  customItemFields: CustomItemFields;
  usingCustomFields: boolean[][] = [[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]];

  setNulls(): void {
    this.collectionID = 0;
    this.name = null;
    this.description = null;
    this.theme = null;
    this.colImg = null;
    this.dateOfCreation = null;
    this.customItemFields = null;
  }
}

export class User {
  userID: number;
  username: string;
  password: string;
  email: string;
  LastOnlineDate: string;
  accountActive: boolean;
  role = 'ADMIN';
  avatarLink: string;
  userData: UserData;
  constructor(userID: number, username: string, password: string, email: string, LastOnlineDate: string, accountActive: boolean, avatarLink: string) {
    this.userID = userID;
    this.username = username;
    this.password = password;
    this.email = email;
    this.LastOnlineDate = LastOnlineDate;
    this.accountActive = accountActive;
    this.avatarLink = avatarLink;
  }
}

export class UserData {
  userDataID: number;
  fullname: string;
  dob: string;
  sex: boolean;
  countryOfResidence: string;
  constructor(userDataID: number, fullname: string, dob: string, sex: boolean, countryOfResidence: string) {
    this.userDataID = userDataID;
    this.fullname = fullname;
    this.dob = dob;
    this.sex = sex;
    this.countryOfResidence = countryOfResidence;
  }
}

export class CustomItemFields {
  itemFieldsID: number;
  firstNumField: string;
  secondNumField: string;
  thirdNumField: string;

  firstStrField: string;
  secondStrField: string;
  thirdStrField: string;

  firstDateField: string;
  secondDateField: string;
  thirdDateField: string;

  firstBoolField: string;
  secondBoolField: string;
  thirdBoolField: string;

  firstTextField: string;
  secondTextField: string;
  thirdTextField: string;
  collection: Collection;
  setNulls(): void {
    this.itemFieldsID = null;
    this.firstNumField = null;
    this.secondNumField = null;
    this.thirdNumField = null;
    this.firstStrField = null;
    this.secondStrField = null;
    this.thirdStrField = null;
    this.firstDateField = null;
    this.secondDateField = null;
    this.thirdDateField = null;
    this.firstBoolField = null;
    this.secondBoolField = null;
    this.thirdBoolField = null;
    this.firstTextField = null;
    this.secondTextField = null;
    this.thirdTextField = null;
  }
}

export class Item {
  itemID: number;
  itemName: string;
  itemImg: string;
  firstNumField: number;
  secondNumField: number;
  thirdNumField: number;

  firstStrField: string;
  secondStrField: string;
  thirdStrField: string;

  firstDateField: string;
  secondDateField: string;
  thirdDateField: string;

  firstBoolField: boolean;
  secondBoolField: boolean;
  thirdBoolField: boolean;

  firstTextField: string;
  secondTextField: string;
  thirdTextField: string;
  collection: Collection;

  setNulls(): void {
    this.itemName = null;
    this.itemImg = null;
    this.firstNumField = null;
    this.secondNumField = null;
    this.thirdNumField = null;
    this.firstStrField = null;
    this.secondStrField = null;
    this.thirdStrField = null;
    this.firstDateField = null;
    this.secondDateField = null;
    this.thirdDateField = null;
    this.firstBoolField = null;
    this.secondBoolField = null;
    this.thirdBoolField = null;
    this.firstTextField = null;
    this.secondTextField = null;
    this.thirdTextField = null;
    this.itemID = null;
  }
}
