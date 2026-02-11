import type { Language, Theme, TimeFormat } from "@/types";
import { createContext, use, useEffect, useReducer, type ReactNode } from "react";

interface Isystem {
  language: Language
  theme: Theme
  timeFormat: TimeFormat
}

interface Iaction {
  type: 'theme' | 'language' | 'timeFormat'
  value: Theme | Language | TimeFormat
}

interface IsystemContextProps {
  systemState: Isystem
  systemDispatch: React.ActionDispatch<[action: any]>
}

function findHourFormat(): TimeFormat {
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric'
  });

  const testDate = new Date(2023, 0, 1, 13, 0, 0);
  const formattedTime = formatter.format(testDate);

  // Check if the formatted time contains AM/PM indicators
  const is12Hour = /AM|PM|am|pm/.test(formattedTime);

  return is12Hour ? '12' : '24';
}

const localStorageData = localStorage.getItem('system-data');
const initialState: Isystem = localStorageData ? JSON.parse(localStorageData) : {
  language: null,
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  timeFormat: findHourFormat()
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
    case 'timeFormat': newState = {
      ...currentState,
      timeFormat: action.value as TimeFormat
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