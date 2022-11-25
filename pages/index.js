import Head from "next/head";
import { useState, useRef } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [input, setinput] = useState("");
  const [result, setResult] = useState();
  const [conversation, setConversation] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);

  const ref = useRef(null);

  async function onSubmit(event) {
    console.log(conversation);

    let conversationString = conversation
      .map((message) => {
        let string = "";

        if (message.ia) {
          string += "IA: " + message.content + " ";
        } else {
          string += "Humain: " + message.content + " ";
        }

        return string;
      })
      .join("");

    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: conversationString + "Humain: " + input }),
    });
    const data = await response.json();
    setResult(data.result);
    const tmp_conversation = [...conversation];
    tmp_conversation.push(
      { ia: false, content: input },
      { ia: true, content: data.result }
    );

    setConversation(tmp_conversation);
    setinput("");

    // scrool to bottom
    ref.current.scrollTop = ref.current.scrollHeight;
  }

  return (
    <div>
      <Head>
        <title>OpenAI Chatbot</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.main_container}>
            <img src="/robot.png" className={styles.icon} />
            <div className={styles.message_container}>
              <div
                ref={ref}
                className={`${styles.result} ${
                  conversation.length > 0 && styles.open
                }`}
              >
                {conversation.length > 0 &&
                  conversation.map((message, index) => (
                    <div key={index} className={message.ia ? styles.ia : ""}>
                      <p>{message.content}</p>
                    </div>
                  ))}
              </div>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  name="animal"
                  placeholder="Posez votre question"
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                />
                <button type="submit">
                  <img src="/send.png" className={styles.iconSend} />
                </button>
              </form>
            </div>
          </div>
        </div>
        {conversation.length > 0 && (
          <div className={styles.containerInfo}>
            <img
              src="/info.png"
              className={styles.iconInfo}
              onClick={() => setOpenInfo(!openInfo)}
            />
            {openInfo && (
              <div className={styles.info}>
                <p>
                  "datas" : <br></br>
                  <span>
                    "voitures" : <br></br>
                    <span>
                      "S60" : <br></br>
                      "marque" : "Volvo",<br></br>
                      "couleur" : "noir",<br></br>
                      "prix" : 30000,<br></br>
                      "etat" : "neuf",<br></br>
                      "options" : <br></br>
                      <span>
                        "climatisation" : true,<br></br>
                        "siegeChauffant" : true,<br></br>
                        "siegeElectrique" : true,<br></br>
                        "toitOuvrant" : false<br></br>, "moteur" : <br></br>
                      </span>
                      "type" : "essence",<br></br>
                      "puissance" : 200,<br></br>
                      "consommation" : 8.5<br></br>,<br></br>
                      "V60" : <br></br>
                      <span>
                        "marque" : "Volvo",<br></br>
                        "couleur" : "blanc",<br></br>
                        "prix" : 35000,<br></br>
                        "etat" : "neuf",<br></br>
                        "options" : <br></br>
                        <span>
                          "climatisation" : true,<br></br>
                          "siegeChauffant" : true,<br></br>
                          "siegeElectrique" : true,<br></br>
                          "toitOuvrant" : false<br></br>,<br></br>
                        </span>
                        "moteur" : <br></br>
                        "type" : "essence",<br></br>
                        "puissance" : 250,<br></br>
                        "consommation" : 8.5<br></br>,<br></br>
                      </span>
                      "XC90" : <br></br>
                      <span>
                        "marque" : "Volvo",<br></br>
                        "couleur" : "noir",<br></br>
                        "prix" : 50000,<br></br>
                        "etat" : "occasion",<br></br>
                        "options" : <br></br>
                        <span>
                          "climatisation" : true,<br></br>
                          "siegeChauffant" : true,<br></br>
                          "siegeElectrique" : true,<br></br>
                          "toitOuvrant" : true<br></br>, "moteur" : <br></br>
                        </span>
                        "type" : "diesel",<br></br>
                        "puissance" : 300,<br></br>
                        "consommation" : 6.5<br></br>,<br></br>
                      </span>
                    </span>
                    "planning" : <br></br>
                    <span>
                      "lundi" : <br></br>
                      <span>
                        "9h" : "dispobible",<br></br>
                        "10h" : "dispobible",<br></br>
                        "11h" : "dispobible",<br></br>
                        "16h" : "dispobible"<br></br>,<br></br>
                      </span>
                      "mardi" : <br></br>
                      <span>
                        "9h" : "dispobible",<br></br>
                        "14h" : "dispobible",<br></br>
                        "17h" : "dispobible",<br></br>
                        "18h" : "dispobible"<br></br>,<br></br>
                      </span>
                      "vendredi" : <br></br>
                      <span>
                        "13h" : "dispobible",<br></br>
                        "14h" : "dispobible",<br></br>
                        "15h" : "dispobible",<br></br>
                        "16h" : "dispobible"<br></br>
                      </span>
                    </span>
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
