import Image from "next/image";
import { RollingText } from "@/components/rolling-link";

const questions = [
  {
    question: "Who will actually be working on our project?",
    answer:
      "Cinemora leads strategy and creative direction directly, with selected specialists supporting production, design, and delivery when the project scope needs it.",
  },
  {
    question: "How do you communicate and manage work?",
    answer:
      "We use clear milestones, regular check-ins, and one shared communication channel so decisions, feedback, and progress stay visible.",
  },
  {
    question: "What do you need to start working together?",
    answer:
      "A clear goal, access to relevant brand materials, and an initial discovery conversation are enough to shape the first plan.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We can support refinement, optimization, and ongoing creative work after the first launch or campaign goes live.",
  },
  {
    question: "Can you handle branding, design and development?",
    answer:
      "Yes. Engagements can cover strategy, branding, design, content, and implementation as one connected process.",
  },
  {
    question: "What is the project investment?",
    answer:
      "Investment depends on scope, timeline, and support level. We provide a clear proposal before work begins.",
  },
];

export function FaqSection() {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="section-inner faq-inner">
        <div className="faq-media-column">
          <div className="faq-image-placeholder">
            <Image
              alt="Cinemora logo"
              className="faq-brand-mark"
              height={180}
              src="/apple-touch-icon.png"
              width={180}
            />
          </div>
          <a className="rolling-trigger" href="/booking" aria-label="Book a call with Cinemora">
            <RollingText label="Book a call with Cinemora" />
          </a>
        </div>

        <div className="faq-content">
          <p className="eyebrow">FAQs</p>
          <h2 id="faq-title">
            <span>What you need to know</span>
            <span>before working with us.</span>
          </h2>

          <div className="faq-list">
            {questions.map((item, index) => (
                <details open={index === 0} key={item.question} name="faq-item">
                  <summary>
                    <span>{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </summary>
                  <div className="faq-answer">
                    <div>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
