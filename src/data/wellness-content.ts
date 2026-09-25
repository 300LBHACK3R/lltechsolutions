export const wellnessBrand = "EVERGREEN WELLNESS";

export const wellnessTreatments = [
  {
    id: "relaxation",
    title: "Relaxation massage",
    kicker: "A slower kind of moment",
    description:
      "Make room for a pause with an easy, unhurried massage and pressure guided by your preferences.",
    detail:
      "A whole-body session with time to settle in. Talk through your preferences at the start, then choose quiet or conversation as you go.",
    durations: [60, 90],
  },
  {
    id: "focused",
    title: "Focused massage",
    kicker: "Attention where you want it",
    description:
      "A session centred on the areas you would like to spend more time on, with room to adjust along the way.",
    detail:
      "Shape the session around your priorities, whether that is more time for your shoulders, back or legs. Your comfort sets the pace.",
    durations: [45, 60],
  },
  {
    id: "unhurried",
    title: "Unhurried massage",
    kicker: "A little more time for you",
    description:
      "A longer appointment for those who prefer more breathing room and a slower transition back into the day.",
    detail:
      "Bring together a whole-body session and extra time for the areas you choose, without rushing through the experience.",
    durations: [90],
  },
] as const;

export const wellnessRates = [
  { duration: 45, price: 80, description: "Time for a focused session." },
  { duration: 60, price: 105, description: "A considered pause in your day." },
  { duration: 90, price: 145, description: "Space for an unhurried experience." },
] as const;

export const wellnessQuestions = [
  {
    group: "Before your visit",
    question: "What happens at a first appointment?",
    answer:
      "A first visit would begin with a conversation about your preferences, the appointment and any questions you have. The practitioner would explain the session before you decide how to proceed. This sample website does not provide treatment or collect health information.",
  },
  {
    group: "Before your visit",
    question: "How do I choose a treatment or session length?",
    answer:
      "The Treatments page introduces three sample massage options, and Pricing shows example appointment lengths. A real practice would help you choose an appropriate service before confirming an appointment.",
  },
  {
    group: "Your comfort",
    question: "Can I ask for a different pressure or a pause?",
    answer:
      "Yes. The sample practice philosophy puts your preferences first. You can ask questions, change your mind, request a change in pressure or stop a session at any point.",
  },
  {
    group: "Your comfort",
    question: "Do I need to talk during my appointment?",
    answer:
      "Quiet is welcome. You can let the practitioner know whether you prefer conversation or a quieter appointment, and speak up whenever you need something adjusted.",
  },
  {
    group: "Booking & practical details",
    question: "Can I make a booking on this website?",
    answer:
      "This is a demonstration website for a fictional practice. The booking preview lets you explore sample service and duration choices; it shows no live availability and cannot reserve an appointment. A finished website can connect to the practice’s chosen booking provider within the agreed scope.",
  },
  {
    group: "Booking & practical details",
    question: "Are receipts, insurance billing or practitioner credentials shown?",
    answer:
      "No practitioner credentials, insurance eligibility or direct billing arrangements are claimed in this sample. A real practice would supply its verified qualifications, receipt details and billing policies before launch.",
  },
  {
    group: "Booking & practical details",
    question: "What if I need to change an appointment?",
    answer:
      "A live practice would share its cancellation, rescheduling and late-arrival policies before you book. There is no cancellation fee or appointment to change in this demonstration.",
  },
  {
    group: "Booking & practical details",
    question: "Where can I find accessibility and arrival information?",
    answer:
      "The Contact page shows where the practice’s real address, opening hours and arrival details would go. Specific access needs, parking and building accessibility would be confirmed with the practice before a visit.",
  },
] as const;
