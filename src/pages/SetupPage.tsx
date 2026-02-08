import { useSystem } from "@/contexts/SystemContext"
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import vector1 from '../assets/custom-vectors/startup-vector-1.svg'
import vector2 from '../assets/custom-vectors/startup-vector-2.svg'

const SetupPage = () => {
  const { systemState } = useSystem();
  const { userState } = useUser();
  const [pageId, setPageId] = useState(userState.fName !== '' ? 3 : (systemState.language !== null ? 2 : 1));

  return (
    <div>
      <div className="startup-bg">
        <img src={vector1} className="startup-vector vector-1" alt="Background Vector 1" />
        <img src={vector2} className="startup-vector vector-2" alt="Background Vector 2" />
      </div>
      <main className="startup-container startup-container-js">
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
                  <SetupDailyWork setPageId={setPageId} />
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
      <section className="fade-${animationType}-animation" id="startup-${id}">
        <h1 className="startup-title">Welcome, to PaceMaster</h1>
        <p className="startup-subtitle">Please select a language to continue</p>
        <div className="startup-select-wrapper">
          <select className="startup-select startup-select-js input-field" onChange={(e) => systemDispatch({ type: 'language', value: e.target.value })} value={systemState.language ? systemState.language : 'en'}>
            <option value="en" >English</option>
            <option value="ar" >Arabic</option>
          </select>
        </div>
      </section>
      <div className="control-buttons">
        <button type="submit" className="startup-continue startup-continue-js" onClick={handleContinue}>Continue</button>
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
      age: userState.age,
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
    const data = getValues();
    userDispatch({ type: 'setFName', value: data.fName })
    userDispatch({ type: 'setLName', value: data.lName })
    userDispatch({ type: 'setAge', value: Number(data.age) })
    userDispatch({ type: 'setEmail', value: data.email })
    if (data.gender) userDispatch({ type: 'setGender', value: data.gender })
    setPageId((prev) => prev - 1)
  }

  return (
    <>
      <section className="fade-${animationType}-animation" id="startup-${id}">
        <h1 className="startup-title startup-form-title">Please fill up the form<br /> bellow</h1>
        <form id="userdata-form" className="startup-form startup-form-js" autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="startup-form-row">
            <div className="startup-form-names">
              <label htmlFor="first-name" className="startup-form-label">Name</label>
              <input id="first-name" className="input-field input-field-js startup-form-input input-field-first-name-js" type="text" placeholder="First name"
                autoComplete="off" {...register("fName", { required: "First name is required" })} />
              {errors.fName && <p style={{ color: "red", fontSize: "0.8rem", margin: "5px 0 0 0" }}>{String(errors.fName.message)}</p>}

              <input id="last-name" className="input-field input-field-js startup-form-input input-field-last-name-js" type="text" placeholder="Last name"
                autoComplete="off" {...register("lName", { required: "Last name is required" })} />
              {errors.lName && <p style={{ color: "red", fontSize: "0.8rem", margin: "5px 0 0 0" }}>{String(errors.lName.message)}</p>}
            </div>
            <div className="startup-form-age">
              <label htmlFor="age" className="startup-form-label">Age</label>
              <input id="age" className="input-field input-field-js startup-form-input input-field-age-js" type="number" placeholder="18"
                {...register("age", { required: "Age is required", min: { value: 10, message: "Min age 10" }, max: { value: 99, message: "Max age 99" } })} />
              {errors.age && <p style={{ color: "red", fontSize: "0.8rem", margin: "5px 0 0 0" }}>{String(errors.age.message)}</p>}
            </div>
          </div>
          <div className="startup-form-group">
            <label htmlFor="email" className="startup-form-label">Email address</label>
            <input id="email" className="input-field input-field-js startup-form-input input-field-email-js" type="email" placeholder="username@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
              })} />
            {errors.email && <p style={{ color: "red", fontSize: "0.8rem", margin: "5px 0 0 0" }}>{String(errors.email.message)}</p>}
          </div>
          <div className="startup-form-group startup-form-gender-group">
            <span className="startup-form-label">Gender :</span>
            <div>
              <label className="startup-form-radio-label">
                <input type="radio" value="male" className="gender-js" {...register("gender", { required: "Gender is required" })} />Male
              </label>
              <label className="startup-form-radio-label">
                <input type="radio" value="female" className="gender-js" {...register("gender", { required: "Gender is required" })} />Female
              </label>
              <label className="startup-form-radio-label">
                <input type="radio" value="unknown" className="gender-js" {...register("gender", { required: "Gender is required" })} />Prefer not to say
              </label>
            </div>
            {errors.gender && <p style={{ color: "red", fontSize: "0.8rem", margin: "5px 0 0 0" }}>{String(errors.gender.message)}</p>}
          </div>
          <div className="startup-form-note startup-form-note-js">
            Please note that this information is saved in your local storage<br />
            You are the only person who can see it
          </div>
        </form>
      </section>
      <div className="control-buttons">
        <button type="button" className="startup-form-prev startup-form-prev-js" onClick={onPrevious}>Previous</button>
        <button type="submit" form="userdata-form" className="startup-continue startup-continue-js">Continue</button>
      </div>
    </>
  )
}

//3
function AppDescription({ setPageId }: { setPageId: React.Dispatch<React.SetStateAction<number>> }) {
  const { userState } = useUser();

  return (
    <>
      <section className="fade-${animationType}-animation" id="startup-${id}">
        <h1 className="startup-title">Hi, {userState.fName}</h1>
        <div className="startup-description">
          <p>PaceMaster here helping you to organize your time by separating temporary tasks from your daily routine work</p>
          <p>We are also monitoring your daily work, pushing you to be better.</p>
        </div>
        <div className="startup-wireframes-row">
          <div className="startup-wireframe-col">
            <h2 className="startup-wireframe-title">Temporary tasks</h2>
            <div className="startup-wireframe startup-wireframe-temp">
              <div className="startup-wireframe-task">
                <span className="startup-noncheck-icon">
                </span>
                <div className="startup-wireframe-task-content">
                  <span className="startup-wireframe-task-headline"></span>
                  <span className="startup-wireframe-task-p"></span>
                </div>
              </div>
              <div className="startup-wireframe-task">
                <span className="startup-noncheck-icon">
                </span>
                <div className="startup-wireframe-task-content">
                  <span className="startup-wireframe-task-headline"></span>
                  <span className="startup-wireframe-task-p"></span>
                </div>
              </div>
              <div className="startup-wireframe-task">
                <span className="startup-check-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </span>
                <div className="startup-wireframe-task-content">
                  <span className="startup-wireframe-task-headline"></span>
                  <span className="startup-wireframe-task-p"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="startup-wireframe-col">
            <h2 className="startup-wireframe-title">Daily work</h2>
            <div className="startup-wireframe startup-wireframe-daily">
              <div className="startup-wireframe-day">
                <div className="startup-wireframe-day-label">Saturday</div>
                <div className="startup-wireframe-daily-task">
                  <div className="startup-wireframe-task-check">
                    <span className="startup-check-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                    <span className="startup-wireframe-task-headline"></span>
                    <time className="startup-task-time">2 PM</time>
                  </div>
                  <div className="startup-wireframe-task-check">
                    <span className="startup-check-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                    <span className="startup-wireframe-task-headline"></span>
                    <time className="startup-task-time">4 PM</time>
                  </div>
                  <div className="startup-wireframe-task-check">
                    <span className="startup-noncheck-icon">
                    </span>
                    <span className="startup-wireframe-task-headline"></span>
                    <time className="startup-task-time">9 PM</time>
                  </div>
                </div>
              </div>
              <div className="startup-wireframe-day">
                <div className="startup-wireframe-day-label">Sunday</div>
                <div className="startup-wireframe-daily-task">
                  <div className="startup-wireframe-task-check">
                    <span className="startup-check-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                    <span className="startup-wireframe-task-headline"></span>
                    <time className="startup-task-time">2 PM</time>
                  </div>
                  <div className="startup-wireframe-task-check">
                    <span className="startup-check-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                    <span className="startup-wireframe-task-headline"></span>
                    <time className="startup-task-time">4 PM</time>
                  </div>
                  <div className="startup-wireframe-task-check">
                    <span className="startup-noncheck-icon">
                    </span>
                    <span className="startup-wireframe-task-headline"></span>
                    <time className="startup-task-time">9 PM</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="control-buttons">
        <button type="button" className="startup-form-prev startup-form-prev-js" onClick={() => setPageId(id => id - 1)}>Previous</button>
        <button type="submit" className="startup-continue startup-continue-js" onClick={() => setPageId(id => id + 1)}>Continue</button>
      </div>
    </>
  )
}

//4
function SetupDailyWork({ setPageId }: { setPageId: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <>

    </>
  )
}

export default SetupPage