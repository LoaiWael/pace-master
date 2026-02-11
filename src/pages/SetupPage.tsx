import { useSystem } from "@/contexts/SystemContext"
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import vector1 from '../assets/custom-vectors/startup-vector-1.svg'
import vector2 from '../assets/custom-vectors/startup-vector-2.svg'
import type { Days, IdailyWork } from "@/types";
import { formatTimeAndDisplay } from "@/utils/System";

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
  const { userState, userDispatch } = useUser()
  const [validation, setValidation] = useState({ message: 'You must create your main table', isValid: false })
  const [editDailyWorkOverlay, setEditDailyWorkOverlay] = useState(false);

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
      {editDailyWorkOverlay &&
        <section className="overlay-backdrop overlay overlay-js">
          <EditDailyWorkOverlay setEditDailyWorkOverlay={setEditDailyWorkOverlay} />
        </section>
      }
      <section className="fade-${animationType}-animation" id="startup-${id}">
        <h1 className="startup-title">Getting started</h1>
        <div className="startup-subtitles">
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
        <button className="startup-create-table-button startup-create-table-button-js" onClick={() => setEditDailyWorkOverlay(true)}>Create my table</button>
      </section>
      <div className="control-buttons">
        <button type="button" className="startup-form-prev startup-form-prev-js" onClick={() => setPageId(id => id - 1)}>Previous</button>
        <button type="submit" className="startup-continue startup-continue-js" disabled={!validation.isValid} onClick={() => userDispatch({ type: 'setIsAuth', value: true })}>Complete</button>
      </div>
    </>
  )
}

function EditDailyWorkOverlay({ setEditDailyWorkOverlay }: { setEditDailyWorkOverlay: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { userState, userDispatch } = useUser();

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
      <div className="overlay-backdrop-js" onClick={() => setEditDailyWorkOverlay(false)}></div>
      <div className="overlay-content overlay-content-js">
        {/* Header Section */}
        <div className="daily-work-header">
          <h1 className="daily-work-title">Daily work</h1>
          <div className="day-selector">
            <span className="day-selector-label">Weekend :</span>
            <div className="day-buttons">
              <button className="day-button day-button-js" onClick={() => handleWeekendToggle('saturday')}>Saturday</button>
              <button className="day-button day-button-js" onClick={() => handleWeekendToggle('sunday')}>Sunday</button>
              <button className="day-button day-button-js" onClick={() => handleWeekendToggle('monday')}>Monday</button>
              <button className="day-button day-button-js" onClick={() => handleWeekendToggle('tuesday')}>Tuesday</button>
              <button className="day-button day-button-js" onClick={() => handleWeekendToggle('wednesday')}>Wednesday</button>
              <button className="day-button day-button-js" onClick={() => handleWeekendToggle('thursday')}>Thursday</button>
              <button className="day-button day-button-js" onClick={() => handleWeekendToggle('friday')}>Friday</button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="daily-work-content">
          {/* Saturday Card */}
          <div className="day-card day-card-saturday-js">
            <h2 className="day-card-title">Saturday</h2>
            <div className="task-list task-list-saturday-js fade-in-animation">
              {mainTable.saturday.map(task => (
                <div key={task.id} className="task-item" id={task.id}>
                  <span className="task-title">{task.name}</span>
                  <div className="task-actions">
                    <span className="task-time">{formatTimeAndDisplay(task)}</span>
                    <button className="task-delete task-delete-js" title="Delete task" data-task-id="${task.id}" data-day="${targetDay}">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                          fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="add-task-button add-task-button-js" data-day="saturday">Add Task</button>
          </div>

          {/* Sunday Card */}
          <div className="day-card day-card-sunday-js">
            <h2 className="day-card-title">Sunday</h2>
            <div className="task-list task-list-sunday-js">
              {/* ${renderDayTasks('sunday')} */}
            </div>
            <button className="add-task-button add-task-button-js" data-day="sunday">Add Task</button>
          </div>

          {/* Monday Card */}
          <div className="day-card day-card-monday-js">
            <h2 className="day-card-title">Monday</h2>
            <div className="task-list task-list-monday-js">
              {/* ${renderDayTasks('monday')} */}
            </div>
            <button className="add-task-button add-task-button-js" data-day="monday">Add Task</button>
          </div>

          {/* Tuesday Card */}
          <div className="day-card day-card-tuesday-js">
            <h2 className="day-card-title">Tuesday</h2>
            <div className="task-list task-list-tuesday-js">
              {/* ${renderDayTasks('tuesday')} */}
            </div>
            <button className="add-task-button add-task-button-js" data-day="tuesday">Add Task</button>
          </div>

          {/* Wednesday Card */}
          <div className="day-card day-card-wednesday-js">
            <h2 className="day-card-title">Wednesday</h2>
            <div className="task-list task-list-wednesday-js">
              {/* ${renderDayTasks('wednesday')} */}
            </div>
            <button className="add-task-button add-task-button-js" data-day="wednesday">Add Task</button>
          </div>

          {/* Thursday Card */}
          <div className="day-card day-card-thursday-js">
            <h2 className="day-card-title">Thursday</h2>
            <div className="task-list task-list-thursday-js">
              {/* ${renderDayTasks('thursday')} */}
            </div>
            <button className="add-task-button add-task-button-js" data-day="thursday">Add Task</button>
          </div>

          {/* Friday Card */}
          <div className="day-card day-card-friday-js">
            <h2 className="day-card-title">Friday</h2>
            <div className="task-list task-list-friday-js">
              {/* ${renderDayTasks('friday')} */}
            </div>
            <button className="add-task-button add-task-button-js" data-day="friday">Add Task</button>
          </div>
        </div>

        {/* Close Button */}
        <button className="daily-work-close daily-work-close-js" onClick={() => setEditDailyWorkOverlay(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              fill="currentColor" />
          </svg>
        </button>
        <button className="daily-work-save" title="save">Save</button>
      </div>
    </>
  )
}

export default SetupPage