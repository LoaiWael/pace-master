export class Profile {
  #firstName
  #lastName
  //mentain age to birthdate later
  #age
  #email
  #gender
  constructor(info) {
    this.#firstName = info.firstName;
    this.#lastName = info.lastName;
    this.#age = info.age;
    this.#email = info.email;
    this.#gender = info.gender;

    this.#updateLocalStorage();
  }

  //read properties
  getFname() {
    return this.#firstName;
  }
  getLname() {
    return this.#lastName;
  }
  getFullName() {
    return this.#firstName + ' ' + this.#lastName;
  }
  getAge() {
    return this.#age;
  }
  getEmail() {
    return this.#email;
  }
  getGender() {
    return this.#gender;
  }

  //set properties
  updateFname(newName) {
    this.#firstName = newName;
    this.#updateLocalStorage();
  }
  updateLname(newName) {
    this.#lastName = newName;
    this.#updateLocalStorage();
  }
  updateBirthDate() {
    //mentain later
  }
  updateEmail(newEmail) {
    this.#email = newEmail;
    this.#updateLocalStorage();
  }

  #updateLocalStorage() {
    localStorage.setItem('personal-data', JSON.stringify({
      firstName: this.#firstName,
      lastName: this.#lastName,
      age: this.#age,
      email: this.#email,
      gender: this.#gender
    }));
  }

  deleteAcc() {
    localStorage.removeItem('personal-data');
  }
}

export let profileObj = new Profile(JSON.parse(localStorage.getItem('personal-data')) || {});

export function setNewProfile(newProfile) {
  profileObj = new Profile(newProfile);
}