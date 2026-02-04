import { createContext, useContext, useReducer, useState, type ActionDispatch, type ReactNode } from "react"

type Gender = 'male' | 'female' | 'unknown';

interface Iuser {
  isAuth: boolean
  fName: string
  lName: string
  age: number
  email: string
  gender: Gender
}

const localStorageData = localStorage.getItem('user-data');

const initialState = localStorageData ? JSON.parse(localStorageData) : {
  isAuth: false,
  fName: '',
  lName: '',
  age: 0,
  email: '',
  gender: "unknown" as Gender
}

interface IuserContextProps {
  user: Iuser,
  dispatch: ActionDispatch<[action: Iaction]>
}


interface Iaction {
  type: 'setIsAuth' | 'setFName' | 'setLName' | 'setAge' | 'setEmail' | 'setGender',
  value: any
}

const reducer = (currentState: Iuser, action: Iaction): Iuser => {
  switch (action.type) {
    case 'setIsAuth': return { ...currentState, isAuth: action.value }
    case 'setFName': return { ...currentState, fName: action.value }
    case 'setLName': return { ...currentState, lName: action.value }
    case 'setAge': return { ...currentState, age: action.value }
    case 'setEmail': return { ...currentState, email: action.value }
    case 'setGender': return { ...currentState, gender: action.value }
  }
}

const userContext = createContext<IuserContextProps>(initialState)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(reducer, initialState)

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(userContext);
  return context;
}

export default UserProvider