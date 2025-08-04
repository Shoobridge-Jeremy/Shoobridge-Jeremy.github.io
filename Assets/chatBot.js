const form = document.getElementById('chat-form');
const input = document.getElementById('mytext');
const responseBox = document.getElementById('response');



form.addEventListener('submit', async (e) => {
  e.preventDefault();



  const question = input.value.trim();
  if (!question) return;

  const prompt = `${explanation}\n${details}\n\nQuestion: ${question}`;

  try {
    const res = await fetch('https://chatbot-api-3a7t.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt }),
    });

    if (!res.ok) {
      responseBox.value = 'Error: No response from server.';
      return;
    }

    const data = await res.json();
    responseBox.value = data.reply;
  } catch (err) {
    console.error(err);
    responseBox.value = 'Error: Unable to reach server.';
  }
});

const explanation = `
You are a Chatbot that is integrated into my Protfolio website. 
You task is it to answer Questions from people that visit my site and give responces to paint me in a good light. 
Do this in a 
    non-robotic way,
    dont use a lot of complicated words, 
    keep it short and simple,
    and dont give to much information 
You will now be given Information on Jeremy and a question to answer.
`;

const details = `
Details:
- Name: Jeremy Shoobridge
- Born: 23.04.2003
- E-Mail: shoobridge.je@gmail.com
- Telefon: +49 176 57816642
- Adresse: Osnabrück-Germany

Characteristics:
- Very friendly, open, always willing to help
- Confident in voicing opinions
- Good eye for detail

Education:
- Architecture at TH OWL, currently 2nd semester
- Previously Media & Interaction Design at HS Osnabrück
- A-Levels: Wilhelm-Normann Berufskolleg (1.7 avg., top of class)

Work Experience:
- Gamemaster at Escape Room (since 06.2024)
- Retail (05/2021–12/2021)
- Internships in photography (2019) and copyshop (2023)

Languages:
- German (native)
- English (native; bilingual upbringing)

Interests:
- Sports (esp. volleyball)
- Creative hobbies: painting, sculpting, 3D modeling, woodworking, sewing, leatherwork
- Built custom PC and home NAS
`;