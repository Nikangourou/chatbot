import { Configuration, OpenAIApi } from "openai";

const datas = `{
  "datas" : {
      "voitures" : {
          "S60" : {
              "marque" : "Volvo",
              "couleur" : "noir",
              "prix" : 30000,
              "etat" : "neuf",
              "options" : {
                  "climatisation" : true,
                  "siegeChauffant" : true,
                  "siegeElectrique" : true,
                  "toitOuvrant" : false
              },
              "moteur" : {
                  "type" : "essence",
                  "puissance" : 200,
                  "consommation" : 8.5
              }
          },
          "V60" : {
              "marque" : "Volvo",
              "couleur" : "blanc",
              "prix" : 35000,
              "etat" : "neuf",
              "options" : {
                  "climatisation" : true,
                  "siegeChauffant" : true,
                  "siegeElectrique" : true,
                  "toitOuvrant" : false
              },
              "moteur" : {
                  "type" : "essence",
                  "puissance" : 250,
                  "consommation" : 8.5
              }
          },
          "XC90" : {
              "marque" : "Volvo",
              "couleur" : "noir",
              "prix" : 50000,
              "etat" : "occasion",
              "options" : {
                  "climatisation" : true,
                  "siegeChauffant" : true,
                  "siegeElectrique" : true,
                  "toitOuvrant" : true
              },
              "moteur" : {
                  "type" : "diesel",
                  "puissance" : 300,
                  "consommation" : 6.5
              }
          }
      },
      "planning" : {
          "lundi" : {
              "9h" : "dispobible",
              "10h" : "dispobible",
              "11h" : "dispobible",
              "16h" : "dispobible"
          },
          "mardi" : {
              "9h" : "dispobible",
              "14h" : "dispobible",
              "17h" : "dispobible",
              "18h" : "dispobible"
          },
          "vendredi" : {
              "13h" : "dispobible",
              "14h" : "dispobible",
              "15h" : "dispobible",
              "16h" : "dispobible"
          }
      }
  }
}`;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.input),
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", "IA"],
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(input) {
  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  return `
  ${datas}
  Je suis l'assistant Volvo, je réponds aux questions de manière très intelligente. Je suis serviable et très sympathique. Si vous me posez une question absurde, trompeuse ou sans réponse claire, je répondrai par "Pouvez-vous reformuler ?".

Humain: Quelle est ta marque de Voiture préférée ?
IA: C'est Volvo bien sûr !
Humain: Quelles sont les disponibilités le mercredi ?
IA: Le mercredi, il n'y a aucun créneau disponible.
Humain: Quelles sont les disponibilités de lundi ?
IA: Le lundi, il y a des créneaux de 9h à 11h et un créneaux à 16h.
Humain: Quelles sont les options de la V60 ?
IA: Les options de la v60 sont la climatisation, le siège chauffant et le siège électrique.
Humain: Quelles est la voiture la plus puissante ?
IA: La voiture la plus puissante est la XC90 avec un moteur essence de 300 chevaux.
${capitalizedInput}
IA:`;
}
