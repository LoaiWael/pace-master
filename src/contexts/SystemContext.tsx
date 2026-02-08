import type { Language, Theme } from "@/types";
import { createContext, use, useEffect, useReducer, type ReactNode } from "react";


interface Isystem {
  language: Language
  theme: Theme
}

interface Iaction {
  type: 'theme' | 'language'
  value: Theme | Language
}

interface IsystemContextProps {
  systemState: Isystem
  systemDispatch: React.ActionDispatch<[action: any]>
}

const localStorageData = localStorage.getItem('system-data');
const initialState: Isystem = localStorageData ? JSON.parse(localStorageData) : {
  language: null,
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const systemContext = createContext<IsystemContextProps>({
  systemState: initialState,
  systemDispatch: () => { }
})

const reducer = (currentState: Isystem, action: Iaction): Isystem => {
  let newState;
  switch (action.type) {
    case 'language': newState = {
      ...currentState,
      language: action.value as Language
    }
      break;
    case "theme": newState = {
      ...currentState,
      theme: action.value as Theme
    }
      break;
    default:
      return currentState;
  }
  return newState
}

const SystemProvider = ({ children }: { children: ReactNode }) => {
  const [systemState, systemDispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    localStorage.setItem('system-data', JSON.stringify(systemState));
  }, [systemState]);

  return (

    <systemContext.Provider value={{ systemState, systemDispatch }}>
      {children}
    </systemContext.Provider>
  )
}

export const useSystem = () => {
  const context = use(systemContext);
  return context;
}

export default SystemProvider