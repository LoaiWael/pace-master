import { createContext, use, useEffect, useReducer, type ActionDispatch, type ReactNode } from "react"
import type { Gender, IdailyWork, Iuser } from "@/types";

const localStorageData = localStorage.getItem('user-data');

const initialState = localStorageData ? JSON.parse(localStorageData) : {
  isAuth: false,
  fName: '',
  lName: '',
  age: 0,
  email: '',
  gender: "unknown" as Gender,
  mainTable: {
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    weekend: []
  } as IdailyWork,
  tempTable: null
}

interface IuserContextProps {
  userState: Iuser,
  userDispatch: ActionDispatch<[action: Iaction]>
}

interface Iaction {
  type: 'setIsAuth' | 'setFName' | 'setLName' | 'setAge' | 'setEmail' | 'setGender' | 'setMainTable' | 'setTempTable',
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
    case 'setMainTable': return { ...currentState, mainTable: action.value }
    case 'setTempTable': return { ...currentState, tempTable: action.value }
  }
}

const userContext = createContext<IuserContextProps>({
  userState: initialState,
  userDispatch: () => { }
})

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userState, userDispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    localStorage.setItem('user-data', JSON.stringify(userState));
  }, [userState])

  return (
    <userContext.Provider value={{ userState, userDispatch }}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = () => {
  const context = use(userContext);
  return context;
}

export default UserProvider