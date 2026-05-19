import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../../components/Sidebar/Sidebar";

import "./SupportPage.css";

function SupportPage() {

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH MESSAGES
  const fetchMessages = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/getmessages`
      );

      console.log("Messages:", res.data);

      // IF DATA INSIDE data FIELD
      setMessages(res.data.data || []);

    } catch (error) {

      console.log("Fetch Error:", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchMessages();

  }, []);

  return (
    <>

      {/* SIDEBAR */}
      <Sidebar />

      <div className="supportContainer">

        {/* HEADER */}
        <div className="supportHeader">

          <div>

            <h2>
              Support Messages
            </h2>

            <p>
              Manage and view customer support requests
            </p>

          </div>

          <div className="supportCount">

            {messages.length} Messages

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="supportStatus">
            Loading...
          </div>

        ) : messages.length === 0 ? (

          <div className="supportStatus">
            No Messages Found
          </div>

        ) : (

          /* MESSAGE GRID */
          <div className="supportMessagesGrid">

            {messages.map((msg) => (

              <div
                key={msg._id}
                className="supportCard"
              >

                {/* TOP */}
                <div className="supportTop">

                  {/* AVATAR */}
                  <div className="supportAvatar">

                    {msg.name
                      ? msg.name.charAt(0).toUpperCase()
                      : "U"}

                  </div>

                  {/* USER INFO */}
                  <div className="supportUserInfo">

                    <h3>
                      {msg.name || "Unknown User"}
                    </h3>

                    <p className="supportEmail">
                      {msg.email || "No Email"}
                    </p>

                  </div>

                </div>

                {/* MESSAGE */}
                <div className="supportMessageBox">

                  <p className="supportLabel">
                    Message
                  </p>

                  <p className="supportMessageText">

                    {msg.message ||
                      "No message available"}

                  </p>

                </div>

                {/* FOOTER */}
                <div className="supportFooter">

                  <small>

                    {msg.createdAt
                      ? new Date(
                          msg.createdAt
                        ).toLocaleString()
                      : "No Date"}

                  </small>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
}

export default SupportPage;