import { useSystem } from "@/contexts/SystemContext"
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import vector1 from '../assets/custom-vectors/startup-vector-1.svg'
import vector2 from '../assets/custom-vectors/startup-vector-2.svg'
import type { Days, IdailyWork } from "@/types";
import { formatTimeAndDisplay } from "@/lib/utils";

const SetupPage = () => {
  const { systemState } = useSystem();
  const { userState } = useUser();
  const [pageId, setPageId] = useState(userState.fName !== '' ? 3 : (systemState.language !== null ? 2 : 1));
  const [editDailyWorkOverlay, setEditDailyWorkOverlay] = useState(false);

  return (
    <div className="min-h-dvh w-full flex items-center justify-center p-4 sm:p-8">
      {editDailyWorkOverlay &&
        <section className="flex items-center justify-center absolute z-3 inset-0 bg-brand-backdrop backdrop-blur-xs transition-opacity duration-350 overlay-js">
          <EditDailyWorkOverlay setEditDailyWorkOverlay={setEditDailyWorkOverlay} />
        </section>
      }
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
        <img src={vector1} className="absolute blur-2xl brightness-110 opacity-100 select-none transition-all duration-500 -top-32 -left-15 w-160 h-auto" alt="Background Vector 1" />
        <img src={vector2} className="absolute blur-2xl brightness-110 opacity-100 select-none transition-all duration-500 -bottom-8 -right-20 w-160 h-auto" alt="Background Vector 2" />
      </div>
      <main className="relative z-2 bg-brand-main-white max-w-[38em] w-[90vw] rounded-[2.5em] shadow-2xl shadow-brand-shadow-2/60 p-[4em_3em_3em] flex flex-col items-start min-h-[30em] overflow-clip h-auto transition-[height] duration-350 max-[700px]:max-w-[95vw] max-[700px]:p-[1.5em] max-[700px]:rounded-[1.5em]">
        {
          pageId === 1 ?
            (
              <SetupLanguage setPageId={setPageId} />
            )
            : pageId === 2 ?
              (
                <SetupUserData setPageId={setPageId} />
              )
              : pageId === 3 ?
                (
                  <AppDescription setPageId={setPageId} />
                )
                :
                (
                  <SetupDailyWork setPageId={setPageId} setEditDailyWorkOverlay={setEditDailyWorkOverlay} />
                )
        }
      </main>
    </div>
  )
}

//1
function SetupLanguage({ setPageId }: { setPageId: React.Dispatch<React.SetStateAction<number>> }) {
  const { systemState, systemDispatch } = useSystem();

  const handleContinue = () => {
    if (!systemState.language) systemDispatch({ type: 'language', value: 'en' })
    setPageId(id => id + 1)
  }

  return (
    <>
      <section className="sm:mb-4 ">
        <h1 className="text-[2rem] font-bold mb-[0.75em] m-0">Welcome, to PaceMaster</h1>
        <p className="my-1">Please select a language to continue</p>
        <div className="w-full">
          <select className="w-full text-[1.1em] input-field startup-select-js" onChange={(e) => systemDispatch({ type: 'language', value: e.target.value })} value={systemState.language ? systemState.language : 'en'}>
            <option value="en" >English</option>
            <option value="ar" >Arabic</option>
          </select>
        </div>
      </section>
      <div className="absolute bottom-[1.75em] self-end flex justify-end gap-[1em] max-[480px]:w-[calc(100%-(1.5em*2))] max-[480px]:flex-col">
        <button type="submit" className="font-semibold w-full rounded-[0.75em] px-[1.75em] py-[0.5em] cursor-pointer transition-colors duration-150 bg-brand-blue-primary text-brand-main-white border-none hover:bg-brand-blue-primary-hover focus:bg-brand-blue-primary-hover startup-continue-js" onClick={handleContinue}>Continue</button>
      </div>
    </>
  )
}

//2
function SetupUserData({ setPageId }: { setPageId: React.Dispatch<React.SetStateAction<number>> }) {
  const { userState, userDispatch } = useUser();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fName: userState.fName,
      lName: userState.lName,
      age: userState.age || '',
      email: userState.email,
      gender: userState.gender
    }
  })

  const onSubmit: SubmitHandler<any> = (data) => {
    userDispatch({ type: 'setFName', value: data.fName })
    userDispatch({ type: 'setLName', value: data.lName })
    userDispatch({ type: 'setAge', value: Number(data.age) })
    userDispatch({ type: 'setEmail', value: data.email })
    userDispatch({ type: 'setGender', value: data.gender })
    setPageId((prev) => prev + 1)
  }

  const onPrevious = () => {
    setPageId((prev) => prev - 1)
  }

  return (
    <>
      <section className="mb-22 sm:mb-4">
        <h1 className="text-[2rem] font-bold mb-[0.75em] m-0">Please fill up the form<br /> bellow</h1>
        <form id="userdata-form" className="w-full" autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-8 items-end mb-7 max-[700px]:flex-col max-[700px]:items-stretch max-[700px]:gap-7">
            <div className="flex-2 flex flex-col  ">
              <label htmlFor="first-name" className="font-medium text-[1em] mb-[0.3em] inline-block">Name</label>
              <div className="mb-2">
                <input id="first-name" className={`input-field input-field-js w-full last:mb-0 input-field-first-name-js ${errors.fName ? 'border-brand-warning' : ''}`} type="text" placeholder="First name"
                  autoComplete="off" {...register("fName", { required: "First name is required" })} />
                {errors.fName && <p className="text-brand-warning text-[0.825rem] pl-1.5">{String(errors.fName.message)}</p>}
              </div>

              <div className="relative">
                <input id="last-name" className={`input-field input-field-js w-full last:mb-0 input-field-last-name-js ${errors.lName ? 'border-brand-warning' : ''}`} type="text" placeholder="Last name"
                  autoComplete="off" {...register("lName", { required: "Last name is required" })} />
                {errors.lName && <p className="absolute top-full text-brand-warning text-[0.825rem] mb-2 pl-1.5">{String(errors.lName.message)}</p>}
              </div>
            </div>
            <div className="relative flex-1 flex flex-col max-w-[20ch]">
              <label htmlFor="age" className="font-medium text-[1em] mb-[0.3em] inline-block">Age</label>
              <input id="age" className={`input-field input-field-js last:mb-0 ${errors.age ? 'border-brand-warning' : ''}`} type="number" placeholder="18"
                {...register("age", { required: "Age is required", min: { value: 10, message: "Min age 10" }, max: { value: 99, message: "Max age 99" } })} />
              {errors.age && <p className="absolute top-full text-brand-warning text-[0.825rem] mb-2 pl-1.5">{String(errors.age.message)}</p>}
            </div>
          </div>
          <div className="mb-[1.2em] flex flex-col">
            <label htmlFor="email" className="font-medium text-[1em] mb-[0.3em] inline-block">Email address</label>
            <div>
              <input id="email" className={`input-field input-field-js w-full last:mb-0 input-field-email-js ${errors.email ? 'border-brand-warning' : ''}`} type="email" placeholder="username@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                })} />
              {errors.email && <p className="text-brand-warning text-[0.825rem] mb-2 pl-1.5">{String(errors.email.message)}</p>}
            </div>
          </div>
          <div className="mb-[1.5em] flex flex-col md:flex-row md:items-center gap-[0.5em] flex-wrap">
            <span className="font-medium text-[1em] mb-[0.3em] inline-block">Gender :</span>
            <div className="flex flex-wrap gap-[0.5em] items-start justify-start ml-[0.7em]">
              <label className="font-normal inline-flex items-center gap-[0.3em]">
                <input type="radio" value="male" className="appearance-none 
                  w-3.5 h-3.5 
                  rounded-full 
                  border-2 border-brand-black-80/20 
                  checked:bg-brand-blue-primary-3 
                  focus:outline-none focus:ring focus:ring-brand-blue-primary-2 focus:ring-offset-1
                  transition-all duration-200 cursor-pointer" {...register("gender", { required: "Gender is required" })} />Male
              </label>
              <label className="font-normal inline-flex items-center gap-[0.3em]">
                <input type="radio" value="female" className="appearance-none 
                  w-3.5 h-3.5 
                  rounded-full 
                  border-2 border-brand-black-80/20 
                  checked:bg-brand-blue-primary-3 
                  focus:outline-none focus:ring focus:ring-brand-blue-primary-2 focus:ring-offset-1
                  transition-all duration-200 cursor-pointer" {...register("gender", { required: "Gender is required" })} />Female
              </label>
              <label className="font-normal inline-flex items-center gap-[0.3em]">
                <input type="radio" value="unknown" className="appearance-none 
                  w-3.5 h-3.5 
                  rounded-full 
                  border-2 border-brand-black-80/20 
                  checked:bg-brand-blue-primary-3 
                  focus:outline-none focus:ring focus:ring-brand-blue-primary-2 focus:ring-offset-1
                  transition-all duration-200 cursor-pointer" {...register("gender", { required: "Gender is required" })} />Prefer not to say
              </label>
            </div>
            {errors.gender && <p className="text-brand-warning text-[0.825rem] mb-2 pl-1.5">{String(errors.gender.message)}</p>}
          </div>
          <div className="text-brand-white-secondary-5 text-[0.85rem] my-[2.5em] transition-colors duration-200 startup-form-note-js">
            Please note that this information is saved in your local storage<br />
            You are the only person who can see it
          </div>
        </form>
      </section>
      <div className="absolute bottom-[1.75em] self-end flex justify-end gap-[1em] max-[480px]:w-[calc(100%-(1.5em*2))] max-[480px]:flex-col">
        <button type="button" className="font-semibold w-full rounded-[0.75em] px-[1.75em] py-[0.5em] cursor-pointer transition-colors duration-150 bg-brand-white-secondary-2 text-brand-black-text border border-brand-stroke shadow-[0_2px_8px_0_var(--shadow-1)_inset] hover:bg-brand-white-secondary-3 focus:bg-brand-white-secondary-3 startup-form-prev-js" onClick={onPrevious}>Previous</button>
        <button type="submit" form="userdata-form" className="font-semibold w-full rounded-[0.75em] px-[1.75em] py-[0.5em] cursor-pointer transition-colors duration-150 bg-brand-blue-primary text-brand-main-white border-none hover:bg-brand-blue-primary-hover focus:bg-brand-blue-primary-hover startup-continue-js">Continue</button>
      </div>
    </>
  )
}

//3
function AppDescription({ setPageId }: { setPageId: React.Dispatch<React.SetStateAction<number>> }) {
  const { userState } = useUser();

  return (
    <>
      <section className="mb-22 sm:mb-4">
        <h1 className="text-[2rem] font-bold mb-[0.75em] m-0">Hi, {userState.fName}</h1>
        <div className="mb-[2.2em]">
          <p>PaceMaster here helping you to organize your time by separating temporary tasks from your daily routine work</p>
          <p>We are also monitoring your daily work, pushing you to be better.</p>
        </div>
        <div className="flex justify-center items-start gap-[3em] my-[2.5em] w-full max-[700px]:flex-col max-[700px]:gap-[2em] max-[700px]:items-stretch">
          <div className="flex flex-col items-center flex-[1_1_0]">
            <h2 className="text-[1.4rem] font-bold mb-[1em] text-center">Temporary tasks</h2>
            <div className="bg-brand-white-secondary-3 rounded-[1em] p-[0.5em] min-w-[15em] min-h-[7em] flex flex-col gap-[0.5em] overflow-clip max-h-39.5 text-brand-white-secondary-3 max-[700px]:min-w-0 max-[700px]:w-full max-[700px]:min-h-[9em] startup-wireframe-temp">
              <div className="flex items-center gap-[1em] bg-brand-main-white rounded-[0.5em] p-[0.75em] w-full">
                <span className="bg-brand-white-secondary-3 aspect-[1] w-[1em] rounded-full">
                </span>
                <div className="flex flex-col gap-[0.125em] w-full h-full rounded-[2px]">
                  <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                  <span className="flex w-[30%] h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                </div>
              </div>
              <div className="flex items-center gap-[1em] bg-brand-main-white rounded-[0.5em] p-[0.75em] w-full">
                <span className="bg-brand-white-secondary-3 aspect-[1] w-[1em] rounded-full">
                </span>
                <div className="flex flex-col gap-[0.125em] w-full h-full rounded-[2px]">
                  <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                  <span className="flex w-[30%] h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                </div>
              </div>
              <div className="flex items-center gap-[1em] bg-brand-main-white rounded-[0.5em] p-[0.75em] w-full">
                <span className="flex items-center text-brand-white-secondary-3 text-[1.1em]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </span>
                <div className="flex flex-col gap-[0.125em] w-full h-full rounded-[2px]">
                  <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                  <span className="flex w-[30%] h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center flex-[1_1_0]">
            <h2 className="text-[1.4rem] font-bold mb-[1em] text-center">Daily work</h2>
            <div className="bg-brand-white-secondary-3 rounded-[1em] p-[0.5em] min-w-[15em] min-h-[7em] flex flex-col gap-[0.5em] overflow-clip max-h-39.5 text-brand-white-secondary-3 max-[700px]:min-w-0 max-[700px]:w-full max-[700px]:min-h-[9em] startup-wireframe-daily">
              <div className="bg-brand-main-white rounded-[0.5em] p-[0.75em]">
                <div className="h-auto w-full bg-none text-[1.1em] font-semibold mb-[0.5em] self-start tracking-[0.02em]">Saturday</div>
                <div className="flex flex-col gap-y-[0.5em] p-0 text-center">
                  <div className="flex items-center gap-[0.7em]">
                    <span className="flex items-center text-brand-white-secondary-3 text-[1.1em]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                    <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                    <time className="flex-1 h-[1em] font-semibold rounded-[0.4em] inline-block">2 PM</time>
                  </div>
                  <div className="flex items-center gap-[0.7em]">
                    <span className="flex items-center text-brand-white-secondary-3 text-[1.1em]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                    <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                    <time className="flex-1 h-[1em] font-semibold rounded-[0.4em] inline-block">4 PM</time>
                  </div>
                  <div className="flex items-center gap-[0.7em]">
                    <span className="bg-brand-white-secondary-3 aspect-[1] w-[1em] rounded-full">
                    </span>
                    <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                    <time className="flex-1 h-[1em] font-semibold rounded-[0.4em] inline-block">9 PM</time>
                  </div>
                </div>
              </div>
              <div className="bg-brand-main-white rounded-[0.5em] p-[0.75em]">
                <div className="h-auto w-full bg-none text-[1.1em] font-semibold mb-[0.5em] self-start tracking-[0.02em]">Sunday</div>
                <div className="flex flex-col gap-y-[0.5em] p-0 text-center">
                  <div className="flex items-center gap-[0.7em]">
                    <span className="flex items-center text-brand-white-secondary-3 text-[1.1em]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                    <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                    <time className="flex-1 h-[1em] font-semibold rounded-[0.4em] inline-block">2 PM</time>
                  </div>
                  <div className="flex items-center gap-[0.7em]">
                    <span className="flex items-center text-brand-white-secondary-3 text-[1.1em]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                    <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                    <time className="flex-1 h-[1em] font-semibold rounded-[0.4em] inline-block">4 PM</time>
                  </div>
                  <div className="flex items-center gap-[0.7em]">
                    <span className="bg-brand-white-secondary-3 aspect-[1] w-[1em] rounded-full">
                    </span>
                    <span className="flex w-1/2 h-[0.5em] bg-brand-white-secondary-3 rounded-[2px]"></span>
                    <time className="flex-1 h-[1em] font-semibold rounded-[0.4em] inline-block">9 PM</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="absolute bottom-[1.75em] self-end flex justify-end gap-[1em] max-[480px]:w-[calc(100%-(1.5em*2))] max-[480px]:flex-col">
        <button type="button" className="font-semibold w-full rounded-[0.75em] px-[1.75em] py-[0.5em] cursor-pointer transition-colors duration-150 bg-brand-white-secondary-2 text-brand-black-text border border-brand-stroke shadow-[0_2px_8px_0_var(--shadow-1)_inset] hover:bg-brand-white-secondary-3 focus:bg-brand-white-secondary-3 startup-form-prev-js" onClick={() => setPageId(id => id - 1)}>Previous</button>
        <button type="submit" className="font-semibold w-full rounded-[0.75em] px-[1.75em] py-[0.5em] cursor-pointer transition-colors duration-150 bg-brand-blue-primary text-brand-main-white border-none hover:bg-brand-blue-primary-hover focus:bg-brand-blue-primary-hover startup-continue-js" onClick={() => setPageId(id => id + 1)}>Continue</button>
      </div>
    </>
  )
}

//4
function SetupDailyWork({ setPageId, setEditDailyWorkOverlay }: {
  setPageId: React.Dispatch<React.SetStateAction<number>>,
  setEditDailyWorkOverlay: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { userState, userDispatch } = useUser()
  const [validation, setValidation] = useState({ message: 'You must create your main table', isValid: false })

  const checkValidation = () => {
    let recordedDays = [];
    for (let i in userState.mainTable) {
      const currentDay = userState.mainTable[i as keyof IdailyWork]
      if (currentDay.length !== 0) recordedDays.push(1);
      else recordedDays.push(0);

    }
    const checkNum = recordedDays.reduce((a, b) => a + b);
    if (!checkNum) return setValidation({ message: 'You must create your main table', isValid: false });
    else if (checkNum == 7 && userState.mainTable.weekend.length == 0) return setValidation({ message: 'Please specify your weekend days', isValid: false });
    else if (checkNum <= 7) return setValidation({ message: 'Please complete the missing days', isValid: false });
    else return setValidation({ message: '', isValid: true })
  }

  useEffect(() => {
    checkValidation();
  }, [userState.mainTable])

  return (
    <>
      <section className="mb-22 sm:mb-4">
        <h1 className="text-[2rem] font-bold mb-[0.75em] m-0">Getting started</h1>
        <div>
          <p className="startup-subtitle">Before joining our experience, please start collecting your day to day work like
            going
            to work or school, studying, going to gymp and so on.</p>
          <p className="startup-subtitle">You can only create two tables <br />first one is permanent and can be edited later
            <br />second one is temporary like going on a summer vacation and need to record your days
          </p>
          <p className="startup-subtitle">But for now you need to initialize your main permanent table</p>
          <p className="startup-subtitle">Once your daily data are collected, start recording it now !
          </p>
        </div>
        <button className="mb-[4em] mt-3 px-[1em] py-[0.5em] rounded-[0.75em] bg-brand-blue-primary-3 border border-brand-blue-secondary-4 hover:bg-brand-blue-secondary-4 hover:text-brand-blue-primary-3 active:border-brand-blue-primary-3 text-white" onClick={() => setEditDailyWorkOverlay(true)}>Create my table</button>
      </section>
      <div className="absolute bottom-[1.75em] self-end flex justify-end gap-[1em] max-[480px]:w-[calc(100%-(1.5em*2))] max-[480px]:flex-col">
        <button type="button" className="font-semibold w-full rounded-[0.75em] px-[1.75em] py-[0.5em] cursor-pointer transition-colors duration-150 bg-brand-white-secondary-2 text-brand-black-text border border-brand-stroke shadow-[0_2px_8px_0_var(--shadow-1)_inset] hover:bg-brand-white-secondary-3 focus:bg-brand-white-secondary-3 startup-form-prev-js" onClick={() => setPageId(id => id - 1)}>Previous</button>
        <button type="submit" className="font-semibold w-full rounded-[0.75em] px-[1.75em] py-[0.5em] cursor-pointer transition-colors duration-150 bg-brand-blue-primary text-brand-main-white border-none hover:bg-brand-blue-primary-hover focus:bg-brand-blue-primary-hover startup-continue-js" disabled={!validation.isValid} onClick={() => userDispatch({ type: 'setIsAuth', value: true })}>Complete</button>
      </div>
    </>
  )
}

function EditDailyWorkOverlay({ setEditDailyWorkOverlay }: { setEditDailyWorkOverlay: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { userState, userDispatch } = useUser();
  const { systemState } = useSystem();

  const mainTable = userState.mainTable;
  const weekend = userState.mainTable.weekend;

  const handleWeekendToggle = (day: Days) => {
    if (weekend.includes(day)) {
      userDispatch({ type: 'setMainTable', value: { ...mainTable, weekend: weekend.filter(item => item !== day) } });
    }
    else {
      if (weekend.length === 3) {
        //toast error
      }
      else {
        const newWeekend = [...weekend, day];
        userDispatch({ type: 'setMainTable', value: { ...mainTable, weekend: newWeekend } });
      }
    }
  }

  return (
    <>
      <div className="fixed w-screen h-screen" onClick={() => setEditDailyWorkOverlay(false)}></div>
      <div className="relative z-5 m-2 w-full max-w-[70em] max-h-[95vh] bg-brand-main-white rounded-4xl max-[480px]:rounded-3xl shadow-lg shadow-brand-shadow-2/50 p-[3em] overflow-auto scrollbar-hide flex flex-col scrollbar-none scale-100 transition-all duration-500 max-[480px]:p-[1.25em]">
        {/* Header Section */}
        <div className="mb-[2em] pb-[1em] bg-brand-main-white flex flex-col">
          <h1 className="text-[2.5rem] h-fit font-bold text-brand-black-text mb-[1em] max-[768px]:text-[2rem] max-[480px]:text-[1.75rem]">Daily work</h1>
          <div className="flex items-center gap-[1em] flex-wrap max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[0.75em]">
            <span className="font-medium text-brand-black-text text-[1.1em]">Weekend :</span>
            <div className="flex gap-[0.5em] flex-wrap">
              {(['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as Days[]).map(day => (
                <button
                  key={day}
                  className={`px-[1em] py-[0.5em] rounded-[0.75em] border font-medium cursor-pointer transition-all duration-150 text-[0.9em] max-[768px]:flex-1 max-[768px]:text-center day-button-js ${weekend.includes(day)
                    ? 'bg-brand-black-text text-brand-main-white border-brand-black-text'
                    : 'border-brand-stroke bg-brand-main-white text-brand-white-secondary-5 hover:bg-brand-white-secondary-2 hover:text-brand-black-text'
                    }`}
                  onClick={() => handleWeekendToggle(day)}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[1.5em] h-auto max-[768px]:grid-cols-1 max-[768px]:gap-[1em]">
          {(['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as Days[]).map(day => (
            <div className="bg-brand-blue-secondary-2 rounded-[1.5em] flex flex-col gap-[1em] h-auto transition-all duration-150 p-4 max-[480px]:p-[0.5em]" key={day}>
              <h2 className="sticky z-4 top-[calc(-1*2em+0.6125em)] text-[1.3rem] font-bold rounded-b-[inherit] mt-[1.125em] mb-0 pt-[1em] px-[1.25em] pb-[0.75em] bg-linear-to-b from-brand-blue-secondary-2 via-brand-blue-secondary-2 to-transparent text-inherit">{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
              <div className={`flex flex-col gap-[0.75em] px-[1em] flex-1 ${/* fade-in-animation */ ''}`}>
                {mainTable[day].map(task => (
                  <div key={task.id} className="flex items-center justify-between bg-brand-main-white shadow-[0_2px_10px_var(--shadow-1)] rounded-[0.75em] p-[0.75em_1em] gap-[0.75em] h-fit overflow-clip transition-all duration-350" id={task.id}>
                    <span className="text-brand-black-text flex-1 text-[0.95rem]">{task.name}</span>
                    <div className="flex items-center gap-[0.75em]">
                      <span className="bg-brand-blue-secondary-4 text-brand-blue-primary px-[0.75em] py-[0.25em] border border-brand-blue-primary rounded-[1em] text-[0.8em] font-semibold whitespace-nowrap">{formatTimeAndDisplay(task, systemState.timeFormat)}</span>
                      <button className="bg-none border-none text-brand-warning cursor-pointer p-[0.25em] rounded-[0.5em] flex items-center justify-center transition-all duration-100 hover:bg-brand-warning-2 hover:scale-110 task-delete-js" title="Delete task" data-task-id="${task.id}" data-day="${targetDay}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                            fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-brand-blue-primary-2 text-brand-main-white border border-brand-blue-primary-3 rounded-[0.75em] m-[1em] mt-auto p-[0.75em_1em] font-semibold cursor-pointer transition-all duration-150 text-[0.9em] hover:bg-brand-blue-secondary-4 hover:text-brand-blue-primary add-task-button-js" data-day={day}>Add Task</button>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button className="fixed z-6 -mt-7 -mr-6 self-end bg-brand-main-white border border-brand-stroke rounded-[30%] w-[2.5em] h-[2.5em] flex items-center justify-center cursor-pointer shadow-[0_0.125em_0.75em_0_var(--shadow-1)] transition-all duration-150 text-brand-black-text hover:bg-brand-white-secondary-2 hover:scale-110 max-[480px]:mt-0 max-[480px]:-mr-1" onClick={() => setEditDailyWorkOverlay(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              fill="currentColor" />
          </svg>
        </button>
        <button className="bg-brand-green border-none w-fit py-[0.5em] px-[2em] rounded-[0.75em] self-end mt-[2em] hover:bg-brand-green-darker" title="save">Save</button>
      </div>
    </>
  )
}

export default SetupPage