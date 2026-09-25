"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { collectionInquiryHref, type WebsiteDesign } from "@/data/website-collection";
import { plumbingPages, type PlumbingPage } from "@/data/plumbing-pages";
import PlumbingAction from "@/components/collection/PlumbingAction";
import { PipeMark, PipeValve, PlumbingHeadline } from "@/components/collection/PlumbingMarks";

export default function PlumbingTemplate({
  design,
  businessName,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  businessName: string;
  standalonePage?: PlumbingPage;
  enquiryHref?: string;
}) {
  const [previewPage, setPreviewPage] = useState<PlumbingPage>("Home");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [enquiryService, setEnquiryService] = useState("");
  const page = standalonePage ?? previewPage;
  const standalone = standalonePage !== undefined;
  const heading = useRef<HTMLHeadingElement>(null);
  const focusRequested = useRef(false);
  const id = useId();
  const concept = design.concept;

  useEffect(() => {
    if (focusRequested.current) {
      heading.current?.focus();
      focusRequested.current = false;
    }
  }, [page]);

  if (!concept) return null;
  const brand = businessName.trim() || concept.brands[0];
  const Heading = standalone ? "h1" : "h3";
  const Subheading = standalone ? "h2" : "h4";
  const titleProps = { ref: heading, id: `${id}-heading`, tabIndex: -1 };
  const service = concept.services[serviceIndex];
  const navigate = (next: PlumbingPage) => {
    if (next === page) return;
    focusRequested.current = true;
    setPreviewPage(next);
  };
  const enquire = (name = "") => {
    setEnquiryService(name);
    navigate("Contact");
  };
  const contactLink = enquiryHref ?? collectionInquiryHref({ design: design.id });

  return (
    <div className="plumb-site">
      <div className="plumb-header">
        <PlumbingAction
          className="plumb-brand"
          standalone={standalone}
          to="Home"
          onPreview={() => navigate("Home")}
        >
          <PipeMark />
          <span>
            {brand}
            <small>PLUMBING</small>
          </span>
          <span className="sr-only"> — sample home</span>
        </PlumbingAction>
        <nav className="plumb-nav" aria-label="Plumbing Company concept pages">
          <span className="plumb-nav-pipe" aria-hidden="true" />
          {plumbingPages.map((item) => (
            <PlumbingAction
              key={item}
              standalone={standalone}
              to={item}
              current={page === item}
              onPreview={() => navigate(item)}
            >
              <span>{item}</span>
              <span className="plumb-nav-joint" aria-hidden="true">
                <PipeValve />
              </span>
            </PlumbingAction>
          ))}
        </nav>
      </div>

      <div className="plumb-page" key={page} aria-labelledby={`${id}-heading`}>
        {page === "Home" ? (
          <>
            <div className="plumb-hero">
              <div className="plumb-hero-copy">
                <p className="plumb-kicker">
                  <span aria-hidden="true" />
                  {concept.kicker}
                </p>
                <Heading {...titleProps}>
                  <PlumbingHeadline text={concept.headlines[0]} />
                </Heading>
                <p className="plumb-intro">{concept.subcopy}</p>
                <PlumbingAction
                  className="plumb-button"
                  standalone={standalone}
                  to="Contact"
                  onPreview={() => enquire()}
                >
                  {concept.action}
                  <span aria-hidden="true">↗</span>
                </PlumbingAction>
                <PlumbingAction
                  className="plumb-text-link"
                  standalone={standalone}
                  to="Services"
                  onPreview={() => navigate("Services")}
                >
                  Explore our services<span aria-hidden="true">→</span>
                </PlumbingAction>
                <p className="plumb-hero-footnote">
                  <span aria-hidden="true">01 —</span> The details make the difference.
                </p>
              </div>
              <figure className="plumb-hero-photo">
                <Image
                  {...concept.photo}
                  alt={concept.photo.alt}
                  sizes="(max-width: 699px) 100vw, 56vw"
                />
                <figcaption>
                  <span>Good design.</span>
                  <em>From the inside out.</em>
                </figcaption>
                <span className="plumb-photo-index" aria-hidden="true">
                  WATER / SPACE / COMFORT
                </span>
              </figure>
            </div>
            <div className="plumb-service-explorer">
              <div className="plumb-service-label">
                <p className="plumb-kicker">A better flow</p>
                <Subheading>
                  What does your
                  <br />
                  <em>home need?</em>
                </Subheading>
              </div>
              <div className="plumb-service-choices" aria-label="Explore plumbing services">
                {concept.services.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={serviceIndex === index}
                    aria-controls={`${id}-service-description`}
                    onClick={() => setServiceIndex(index)}
                  >
                    <span>0{index + 1}</span>
                    {item.name}
                    <span aria-hidden="true">{serviceIndex === index ? "−" : "+"}</span>
                  </button>
                ))}
              </div>
              <div
                className="plumb-service-description"
                id={`${id}-service-description`}
                aria-live="polite"
                aria-atomic="true"
              >
                <PipeValve />
                <strong>{service?.name}</strong>
                <p>{service?.description}</p>
                <PlumbingAction
                  className="plumb-text-link"
                  standalone={standalone}
                  to="Contact"
                  onPreview={() => enquire(service?.name)}
                >
                  Let’s talk it through<span aria-hidden="true">↗</span>
                </PlumbingAction>
              </div>
            </div>
            <div className="plumb-detail-story">
              <figure>
                <Image
                  src="/images/collection/plumbing-detail.webp"
                  alt="Illustrative brushed brass tap and stone basin, showing a considered fixture finish"
                  fill
                  sizes="(max-width: 699px) 100vw, 44vw"
                />
                <figcaption>Material. Finish. Function.</figcaption>
              </figure>
              <div>
                <p className="plumb-kicker">Beyond what you can see</p>
                <Subheading>
                  Beautiful on the outside.
                  <br />
                  <em>Considered underneath.</em>
                </Subheading>
                <p>{concept.approach}</p>
                <PlumbingAction
                  className="plumb-text-link"
                  standalone={standalone}
                  to="Projects"
                  onPreview={() => navigate("Projects")}
                >
                  Find your inspiration<span aria-hidden="true">↗</span>
                </PlumbingAction>
              </div>
            </div>
            <div className="plumb-process">
              <p className="plumb-kicker">A clear path, from the start</p>
              <ol>
                <li>
                  <span>01</span>
                  <strong>Understand the job.</strong>
                  <p>Talk through the space, the problem and what you have in mind.</p>
                </li>
                <li>
                  <span>02</span>
                  <strong>Agree on the details.</strong>
                  <p>Discuss the options, scope and next steps before work begins.</p>
                </li>
                <li>
                  <span>03</span>
                  <strong>Bring it together.</strong>
                  <p>Plan the installation, finish and handover around your project.</p>
                </li>
              </ol>
            </div>
          </>
        ) : page === "Services" ? (
          <div className="plumb-inner">
            <div className="plumb-page-heading">
              <p className="plumb-kicker">Purpose behind every connection</p>
              <Heading {...titleProps}>
                From the everyday.
                <br />
                <em>To the exceptional.</em>
              </Heading>
              <p>
                Small fixes, considered upgrades and the plumbing behind your next renovation.
                Explore the right starting point for your space.
              </p>
            </div>
            <div className="plumb-service-list">
              {concept.services.map((item, index) => (
                <article key={item.name}>
                  <span className="plumb-service-number">0{index + 1}</span>
                  <Subheading>{item.name}</Subheading>
                  <div>
                    <p>{item.description}</p>
                    <PlumbingAction
                      className="plumb-text-link"
                      standalone={standalone}
                      to="Contact"
                      onPreview={() => enquire(item.name)}
                    >
                      Discuss this service<span aria-hidden="true">↗</span>
                      <span className="sr-only">: {item.name}</span>
                    </PlumbingAction>
                  </div>
                </article>
              ))}
            </div>
            <div className="plumb-service-note">
              <PipeMark />
              <p>
                A clear scope makes for a better project. Tell us what is happening, where it is and
                what you would like to change.
              </p>
              <PlumbingAction
                standalone={standalone}
                to="Contact"
                className="plumb-button"
                onPreview={() => enquire()}
              >
                Start a conversation<span aria-hidden="true">↗</span>
              </PlumbingAction>
            </div>
          </div>
        ) : page === "Projects" ? (
          <div className="plumb-inner">
            <div className="plumb-page-heading">
              <p className="plumb-kicker">A feel for the possibilities</p>
              <Heading {...titleProps}>
                Spaces that work.
                <br />
                <em>Details that matter.</em>
              </Heading>
              <p>
                A place to show the work you are proud of. These illustrative spaces demonstrate how
                your own photography and project stories could look.
              </p>
            </div>
            <div className="plumb-projects">
              <figure>
                <div className="plumb-project-photo">
                  <Image
                    {...concept.photo}
                    alt={concept.photo.alt}
                    sizes="(max-width: 699px) 100vw, 60vw"
                  />
                </div>
                <figcaption>
                  <span>01 / Bathroom inspiration</span>
                  <Subheading>A little everyday luxury.</Subheading>
                  <p>Warm surfaces, considered fixtures and room to unwind.</p>
                </figcaption>
              </figure>
              <figure>
                <div className="plumb-project-photo">
                  <Image
                    src="/images/collection/plumbing-detail.webp"
                    width={1200}
                    height={800}
                    alt="Illustrative brass tap and natural stone basin with a detailed fixture finish"
                    sizes="(max-width: 699px) 100vw, 40vw"
                  />
                </div>
                <figcaption>
                  <span>02 / Fixture inspiration</span>
                  <Subheading>The finishing touch.</Subheading>
                  <p>A closer look at the materials that bring a space together.</p>
                </figcaption>
              </figure>
            </div>
            <p className="plumb-sample-note">
              Illustrative images, not completed plumbing projects. Your approved photography and
              accurate project details replace these examples.
            </p>
            <PlumbingAction
              className="plumb-button"
              standalone={standalone}
              to="Contact"
              onPreview={() => enquire()}
            >
              Let’s plan your space<span aria-hidden="true">↗</span>
            </PlumbingAction>
          </div>
        ) : (
          <div className="plumb-inner plumb-contact">
            <div className="plumb-page-heading">
              <p className="plumb-kicker">Every good project starts here</p>
              <Heading {...titleProps}>
                Tell us what
                <br />
                <em>you have in mind.</em>
              </Heading>
              <p>
                From a fixture that needs attention to a room you are ready to rethink. A few
                details help start the right conversation.
              </p>
              <div className="plumb-contact-note">
                <PipeValve />
                <p>
                  This is a sample contact layout. Your real contact details, service area and
                  enquiry form are connected during personalization.
                </p>
              </div>
            </div>
            <div
              className="plumb-estimate"
              aria-label="Non-interactive example of a plumbing enquiry layout"
            >
              <p className="plumb-kicker">Your project, at a glance</p>
              <div className="plumb-estimate-fields">
                <div>
                  <span>Your name</span>
                  <span>First and last name</span>
                </div>
                <div>
                  <span>Email</span>
                  <span>Your email address</span>
                </div>
                <div>
                  <span>Project location</span>
                  <span>City or neighbourhood</span>
                </div>
                <div>
                  <span>Plumbing service</span>
                  <span>{enquiryService || "Repairs, fixtures or a renovation"}</span>
                </div>
                <div className="plumb-estimate-wide">
                  <span>What can we help with?</span>
                  <span>A little about your space, the work and your timing…</span>
                </div>
              </div>
              <p className="plumb-sample-note">
                Preview only — no information is collected or sent.
              </p>
              <Link className="plumb-button" href={contactLink}>
                Make this my website<span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="plumb-footer">
        <span className="plumb-footer-brand">
          <PipeMark />
          {brand}
        </span>
        <p>Original L&L demo · Illustrative brand and imagery.</p>
        <Link href={contactLink}>
          Make it yours<span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
