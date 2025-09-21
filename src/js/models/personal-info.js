class Profile {
    _firstName;
    _lastName;
    //mentain age to birthdate later
    _age;
    _email;
    _gender;
    constructor(info) {
        this._firstName = info.firstName;
        this._lastName = info.lastName;
        this._age = info.age;
        this._email = info.email;
        this._gender = info.gender;
        this.#updateLocalStorage();
    }
    //read properties
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get fullName() {
        return this._firstName + ' ' + this._lastName;
    }
    get age() {
        return this._age;
    }
    get email() {
        return this._email;
    }
    get gender() {
        return this._gender;
    }
    //set properties
    set firstName(newName) {
        this._firstName = newName;
        this.#updateLocalStorage();
    }
    set lastName(newName) {
        this._lastName = newName;
        this.#updateLocalStorage();
    }
    updateBirthDate() {
        //mentain later
    }
    set email(newEmail) {
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
let profileObj = new Profile(localStorage.getItem('personal-data') ? JSON.parse(localStorage.getItem('personal-data')) : {
    firstName: null,
    lastName: null,
    age: null,
    email: null,
    gender: null
});
export function setNewProfile(newProfile) {
    profileObj = new Profile(newProfile);
}
