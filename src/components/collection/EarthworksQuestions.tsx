"use client";

import { useState } from "react";

const topics = ["All questions", "Getting started", "The details"] as const;
const questions = [
  {
    question: "Do I need a complete plan before getting in touch?",
    topic: "Getting started",
    answer:
      "A starting point is enough: what the space looks like now, what you would like to change and what matters most. A few photographs and an idea of how you want to use the space can make the first conversation much more useful.",
  },
  {
    question: "What information helps with an estimate?",
    topic: "Getting started",
    answer:
      "The location, approximate size, access to the work area and a description of the work are a good beginning. Share any drawings or known site constraints. An accurate scope may need a site visit and further information before a price can be agreed.",
  },
  {
    question: "Can the work be planned in stages?",
    topic: "Getting started",
    answer:
      "Phasing is worth discussing early. The order of excavation, drainage, hardscaping and planting matters, so the overall plan should make sense even if the work happens in separate stages.",
  },
  {
    question: "How do we choose the right materials?",
    topic: "The details",
    answer:
      "Start with how the space needs to work, then consider appearance, budget and maintenance. Samples can help with colour and texture. Material suitability, surface finish and care requirements should be confirmed for the actual site before ordering.",
  },
  {
    question: "What about drainage, utilities and permits?",
    topic: "The details",
    answer:
      "Raise any known concerns at the beginning. The project plan should identify drainage requirements, required utility locates and any permits or specialist input. The applicable checks and who is responsible for them should be clear before work begins.",
  },
  {
    question: "Can existing features be kept?",
    topic: "The details",
    answer:
      "Point out the trees, planting, structures and finishes you hope to keep. Their condition, the required work and access to the site will help determine what can be retained and how it can be protected.",
  },
  {
    question: "What happens after the work is finished?",
    topic: "The details",
    answer:
      "A handover is the time to review the agreed scope, ask questions and discuss care for the installed materials and planting. Any maintenance arrangements, follow-up work or product warranties should be set out for your project.",
  },
] as const;

export default function EarthworksQuestions() {
  const [topic, setTopic] = useState<(typeof topics)[number]>("All questions");
  const visible = questions.filter((item) => topic === "All questions" || item.topic === topic);
  return (
    <div className="earth-questions">
      <div className="earth-question-topics" role="group" aria-label="Filter questions by topic">
        {topics.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={topic === item}
            onClick={() => setTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="earth-question-count" role="status">
        {visible.length} questions · Open any question to read more
      </p>
      <div className="earth-question-list">
        {visible.map((item) => (
          <details key={item.question}>
            <summary>
              <span>{item.question}</span>
              <span className="earth-question-sign" aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
