export type Gender = 'male' | 'female' | 'unknown';

export interface Iuser {
  isAuth: boolean
  fName: string
  lName: string
  age: number
  email: string
  gender: Gender
  mainTable: IdailyWork,
  tempTable: IdailyWork | null
}

export type Theme = 'light' | 'dark';

export type Language = 'en' | 'ar';

export interface Itask {
  id: string
  name: string
  completed: boolean
  completedDate: Date | null
}

export interface IdailyTask extends Itask {
  time: string;
}

export type Days = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface IdailyWork {
  saturday: IdailyTask[]
  sunday: IdailyTask[]
  monday: IdailyTask[]
  tuesday: IdailyTask[]
  wednesday: IdailyTask[]
  thursday: IdailyTask[]
  friday: IdailyTask[]
  weekend: Days[]
}