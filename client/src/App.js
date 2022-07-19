import axios from "axios";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "./App.css";
import { signInWithGoogle } from "./Firebase";
function App() {
  const [reminderMsg, setReminderMsg] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [remindAt, setRemindAt] = useState();
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/getAllReminder")
      .then((res) => setReminderList(res.data));
  }, []);

  const addReminder = () => {
    axios
      .post("http://localhost:9000/addReminder", { reminderMsg, remindAt })
      .then((res) => setReminderList(res.data));
    setReminderMsg("");
    setRemindAt();
  };

  const deleteReminder = (id) => {
    axios
      .post("http://localhost:9000/deleteReminder", { id })
      .then((res) => setReminderList(res.data));
  };
  console.log(localStorage.getItem("email"));
  const handleClick = async () => {
    const sign = await signInWithGoogle();
    setEmail(sign.email);
    setName(sign.displayName);
  };
  useEffect(() => {
    setEmail(localStorage.getItem("name", name));
    setName(localStorage.getItem("email", email));
  }, [
    localStorage.getItem("name", name),
    localStorage.getItem("email", email),
  ]);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setEmail("");
    setName("");
  };
  return (
    <div className="App">
      {!email && (
        <button class="login-with-google-btn" onClick={handleClick}>
          Sign in with Google
        </button>
      )}
      {email && (
        <div className="homepage">
          <div className="homepage_header">
            <h1>Remind Me 🙋‍♂️</h1>
            <h5>Email:{email}</h5>
            <h5>Name:{name}</h5>
            <button onClick={handleLogout}>logout</button>
            <input
              type="text"
              placeholder="Reminder notes here..."
              value={reminderMsg}
              onChange={(e) => setReminderMsg(e.target.value)}
            />
            <DateTimePicker
              value={remindAt}
              onChange={setRemindAt}
              minDate={new Date()}
              minutePlaceholder="mm"
              hourPlaceholder="hh"
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
            />
            <div className="button" onClick={addReminder}>
              Add Reminder
            </div>
          </div>

          <div className="homepage_body">
            {reminderList.map((reminder) => (
              <div className="reminder_card" key={reminder._id}>
                <h2>{reminder.reminderMsg}</h2>
                <h3>Remind Me at:</h3>

                <p>
                  {String(
                    new Date(
                      reminder.remindAt.toLocaleString(undefined, {
                        timezone: "Asia/Dhaka",
                      })
                    )
                  )}
                </p>
                <div
                  className="button"
                  onClick={() => deleteReminder(reminder._id)}
                >
                  Delete
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
