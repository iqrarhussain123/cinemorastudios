const testimonials = [
  {
    quote:
      "Cinemora completely transformed how I show up online. The brand positioning work was surgical - they understood exactly what elite coaches need to communicate and built a content system around it. My inbound went up within weeks of launching.",
    name: "Tim Frey",
    role: "Founder, CloserSchool",
  },
  {
    quote:
      "I've worked with three agencies before Cinemora. None of them understood the difference between content and positioning. These guys do. The video production quality alone puts you in a different league - but it's the strategy behind it that actually moves the needle.",
    name: "Marcus Webb",
    role: "CEO, Scalepath Advisory",
  },
  {
    quote:
      "As a female founder in a crowded consulting space, standing out felt impossible. Cinemora helped me craft a personal brand that felt authentic and authoritative. The SEO work they did quietly doubled my organic traffic in under three months.",
    name: "Priya Nair",
    role: "Founder, Clarity Ventures",
  },
  {
    quote:
      "I came to Cinemora with a decent following but no real system. They built out my entire content infrastructure - from video to LinkedIn to email - and suddenly everything was working together. Highly recommend for any serious coach.",
    name: "Jordan Calloway",
    role: "Executive Coach & Speaker",
  },
  {
    quote:
      "We hired Cinemora to build our digital presence from scratch. What we got was far more than a website and some videos - we got a full brand identity and a content engine that continues to generate qualified leads on autopilot. Exceptional work.",
    name: "Lena Hoffmann",
    role: "Co-Founder, NorthBridge Capital",
  },
  {
    quote:
      "The AI tools and automation systems Cinemora built for our ops were game-changing. But what really stood out was their attention to brand detail - everything felt premium, intentional, and aligned with where we were headed. Worth every cent.",
    name: "Daniel Osei",
    role: "Startup Founder & Mentor, Lagos / London",
  },
];

export function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-inner testimonials-inner">
        <div className="testimonials-heading">
          <p className="eyebrow">Client Feedback</p>
          <h2 id="testimonials-title">What Clients Say</h2>
        </div>

        <div className="testimonial-card" aria-live="polite">
          {testimonials.map((testimonial, index) => (
            <input
              className="testimonial-state"
              defaultChecked={index === 0}
              id={`testimonial-${index}`}
              key={`state-${testimonial.name}`}
              name="testimonial"
              type="radio"
            />
          ))}

          <div className="testimonial-slides">
            {testimonials.map((testimonial, index) => {
              const previousIndex = index === 0 ? testimonials.length - 1 : index - 1;
              const nextIndex = (index + 1) % testimonials.length;

              return (
                <article className="testimonial-slide" key={testimonial.name}>
                  <div>
                    <div className="testimonial-copy">
                      <span className="quote-mark" aria-hidden="true">
                        &ldquo;
                      </span>
                      <blockquote>{testimonial.quote}</blockquote>
                    </div>

                    <div className="testimonial-controls" aria-label="Testimonial controls">
                      <label
                        aria-label="Previous testimonial"
                        className="testimonial-control-button"
                        htmlFor={`testimonial-${previousIndex}`}
                        role="button"
                      >
                        &larr;
                      </label>
                      <span>
                        {index + 1} / {testimonials.length}
                      </span>
                      <label
                        aria-label="Next testimonial"
                        className="testimonial-control-button"
                        htmlFor={`testimonial-${nextIndex}`}
                        role="button"
                      >
                        &rarr;
                      </label>
                    </div>
                  </div>

                  <div className="testimonial-person-card">
                    <div className="testimonial-image-placeholder">
                      <span>Client Image</span>
                    </div>
                    <div className="testimonial-author">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
