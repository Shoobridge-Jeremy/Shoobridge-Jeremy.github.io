const form = document.getElementById('chat-form');
const input = document.getElementById('mytext');
const responseBox = document.getElementById('response');



let isSubmitting = false; // debounce flag

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (isSubmitting) return; // prevent re-submission within 5 seconds
  isSubmitting = true;

  const question = input.value.trim();
  if (!question) {
    isSubmitting = false;
    return;
  }

  const prompt = `${explanation}\n${details}\n\nQuestion: ${question}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch('https://chatbot-api-3a7t.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      responseBox.value = 'Error: No response from server. Please try again!';
    } else {
      const data = await res.json();
      typeWriterEffect(responseBox, data.reply);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      responseBox.value = 'Error: Request timed out after 5 seconds. Please try again!';
    } else {
      console.error(err);
      responseBox.value = 'Error: Unable to reach server. Please try again!' ;
    }
  } finally {
    // Allow submission again after 5 seconds
    setTimeout(() => {
      isSubmitting = false;
    }, 5000);
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
    Keep it under 60 words
You will now be given Information on Jeremy and a question to answer.
`;

const details = `
Details:
- Name: Jeremy Shoobridge
- Born: 23.04.2003 makes him 22 years old currently
- E-Mail: shoobridge.je@gmail.com
- Adresse: Osnabrück-Germany

Characteristics:
- Very friendly, open, 
- Confident in voicing opinions
- Good eye for detail
- Helpful
- 

Education:
- currently Media & Interaction Design at HS Osnabrück, 4th semester
- Previously Architecture at the TH OWL in Detmold for 2 semesters after which he stopped
- A-Levels: Wilhelm-Normann Berufskolleg (1.8 avg., top of class)

Countless moduels in UNI that discuss the topic of design:
- Photography (Portrait, Productphotography, Lighting, Photoshop)
- Poster Design (Layouting, Print Design, etc.)
- Design History (History of design, modern furniture, Architecture etc.)
- Programming (Multiple modules over the course of the past 4 Semesters, Programmed a game using simple Java, Then on to websites HTML, CSS, Javascript, Typescript. Worked with frameworks like Bootstrap, Tailwind, Jquery etc. Also, played around with some Arduino stuff and made a Phone Application using angular)
- Usability & Psychologie (Basics of UX and user centered Design theory)
- Application Design (Using Figma, first Protoypes for some Applications where made.)
- Interaction Motion Media (Shot a horror movie in a team of 4)
- Kommunikationswissenschaft ()
- Interaction Design - Object (Programmed the AskABall from the Prjects list. Using Ardunios, small sensors and connecting them to a Angular phone application. The idea behind this as for people to use this to get to know one another. The ball was passed/thrown from person to person and qould ask a AI Generated Question based on Categorys you could chonce/make at the start)
- Interactive Motion Media 2 (Animation of a short Film, the module focused on the laws of animation and on how to make them look smooth)
- Designkonzept (In this module we were given the tas of visiting different jobs and having a look if the workers there could have the need for new gadegts that we designend. Jeremys Design went so far and worked so well that the UNI desided to patent the idea. That's why i cant give out to much detail...)
- Interaktionstechnologie (3D Modeling. Blender, Cinema 4d, Fusion 360, onshape)
- Interaction Design Raum (This module is where the GarnGogh from the Project list came from. The project was a huge easel (staffelei) with a big screen and lots of different coloured yarn hanging from it. People could pull at the strings and by that would colour in an abstract paining of the famous Van Gogh sunflowers. This was all designend and built for the Visiodrom in Wuppertal and it was so popular that the visodrom actually included it as an official instillation and will stand there for the next year)
- Anwendungen Usability & Psychologie (here we did some User testing for a Website. We focused on the UX not the design. In total we had 16 people go through a pair of tasks using the website (Usability testing) and analysed the findings.)

Work Experience:
- Gamemaster at Escape Room (since 05.2024)
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
