export type gender = 'male' | 'female' | 'notsay';

interface IProfile {
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  email: string | null;
  gender: gender | null;
}

class Profile {
  private _firstName
  private _lastName
  //mentain age to birthdate later
  private _age
  private _email
  private _gender

  constructor(info: IProfile) {
    this._firstName = info.firstName;
    this._lastName = info.lastName;
    this._age = info.age;
    this._email = info.email;
    this._gender = info.gender;

    this.#updateLocalStorage();
  }

  //read properties
  get firstName() {
    return this._firstName as string;
  }
  get lastName() {
    return this._lastName as string;
  }
  get fullName() {
    return this._firstName + ' ' + this._lastName as string;
  }
  get age() {
    return this._age as number;
  }
  get email() {
    return this._email as string;
  }
  get gender() {
    return this._gender as gender;
  }

  //set properties
  set firstName(newName: string) {
    this._firstName = newName;
    this.#updateLocalStorage();
  }
  set lastName(newName: string) {
    this._lastName = newName;
    this.#updateLocalStorage();
  }
  updateBirthDate() {
    //mentain later
  }
  set email(newEmail: string) {
    this._email = newEmail;
    this.#updateLocalStorage();
  }

  #updateLocalStorage() {
    localStorage.setItem('personal-data', JSON.stringify({
      firstName: this._firstName,
      lastName: this._lastName,
      age: this._age,
      email: this._email,
      gender: this._gender
    }));
  }

  deleteAcc() {
    localStorage.removeItem('personal-data');
  }
}

let profileObj = new Profile(localStorage.getItem('personal-data') ? JSON.parse(localStorage.getItem('personal-data') as string) : {
  firstName: null,
  lastName: null,
  age: null,
  email: null,
  gender: null
});

export function setNewProfile(newProfile: IProfile) {
  profileObj = new Profile(newProfile);
}