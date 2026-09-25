"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { collectionInquiryHref, type WebsiteDesign } from "@/data/website-collection";
import { earthworksPages, type EarthworksPage } from "@/data/earthworks-pages";
import EarthworksAction from "@/components/collection/EarthworksAction";
import EarthworksMaterials from "@/components/collection/EarthworksMaterials";
import EarthworksQuestions from "@/components/collection/EarthworksQuestions";
import {
  RidgelineMark,
  SurveyCross,
  EarthworksHeadline,
  TerrainContours,
} from "@/components/collection/EarthworksMarks";

const projectViews = ["All inspiration", "Groundwork", "Outdoor living"] as const;
type ProjectView = (typeof projectViews)[number];
const projectStudies = [
  {
    title: "Make room for the next chapter.",
    category: "Groundwork",
    type: "01 / Site preparation",
    src: "/images/collection/earthworks-site.webp",
    alt: "Illustrative excavation and site preparation with landscaping equipment",
    description: "Open ground, clear access and a considered plan for what comes next.",
  },
  {
    title: "More life, outside.",
    category: "Outdoor living",
    type: "02 / Landscape inspiration",
    src: "/images/collection/earthworks-landscape.webp",
    alt: "Illustrative landscaped outdoor space with planting and a finished stone patio",
    description: "A sheltered place to gather, with pale stone underfoot and planting all around.",
  },
  {
    title: "It is all in the groundwork.",
    category: "Groundwork",
    type: "03 / Detail inspiration",
    src: "/images/collection/earthworks-detail.webp",
    alt: "Illustrative stonework and drainage detail in a landscaped outdoor space",
    description:
      "The meeting of texture, level and planting — small details with a lasting presence.",
  },
] as const;
const servicePhotography = [
  projectStudies[0],
  projectStudies[2],
  projectStudies[2],
  projectStudies[1],
];
const processSteps = [
  {
    name: "Start with the site.",
    detail:
      "Talk through the existing space, access and the change you have in mind. Photos and a clear description give the conversation a useful starting point.",
    note: "Understand / Assess",
  },
  {
    name: "Make a considered plan.",
    detail:
      "Discuss materials, levels, drainage, practical constraints and the work involved. Any surveys, approvals or specialist input are identified for the actual project.",
    note: "Explore / Define",
  },
  {
    name: "Agree on the details.",
    detail:
      "Confirm the scope, price, responsibilities and anticipated schedule before committing. Good decisions begin with a shared understanding.",
    note: "Scope / Schedule",
  },
  {
    name: "Bring the plan to ground.",
    detail:
      "Prepare the work area, coordinate the agreed stages and keep the conversation open as the project develops.",
    note: "Prepare / Build",
  },
  {
    name: "Finish with a clear handover.",
    detail:
      "Walk through the completed scope and discuss care, upkeep and the next steps suited to the finished space.",
    note: "Review / Care",
  },
];
const priorities = [
  "Better drainage",
  "Useful outdoor space",
  "Low-maintenance finishes",
  "Preparing for a build",
] as const;

export default function EarthworksTemplate({
  design,
  businessName,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  businessName: string;
  standalonePage?: EarthworksPage;
  enquiryHref?: string;
}) {
  const [previewPage, setPreviewPage] = useState<EarthworksPage>("Home");
  const [activeService, setActiveService] = useState(0);
  const [projectView, setProjectView] = useState<ProjectView>("All inspiration");
  const [projectType, setProjectType] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [copyState, setCopyState] = useState("");
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
  const service = concept.services[activeService];
  const servicePhoto = servicePhotography[activeService] ?? projectStudies[0];
  const navigate = (next: EarthworksPage) => {
    if (next !== page) {
      focusRequested.current = true;
      setPreviewPage(next);
    }
  };
  const planProject = (name = "") => {
    setProjectType(name);
    setCopyState("");
    navigate("Contact");
  };
  const visibleProjects = projectStudies.filter(
    (project) => projectView === "All inspiration" || project.category === projectView,
  );
  const outline = `Project focus: ${projectType || "To be discussed"}.\nPriorities: ${selectedPriorities.length ? selectedPriorities.join(", ") : "To be discussed"}.\nNext conversation: site conditions, access, scope and timing.\nThis outline is a starting point, not a quotation or a booking.`;
  const changePriority = (priority: string) => {
    setSelectedPriorities((previous) =>
      previous.includes(priority)
        ? previous.filter((item) => item !== priority)
        : [...previous, priority],
    );
    setCopyState("");
  };
  const copyOutline = async () => {
    try {
      await navigator.clipboard.writeText(outline);
      setCopyState("Project outline copied.");
    } catch {
      setCopyState("Copy is unavailable here. You can select and copy the outline below.");
    }
  };
  const contactLink = enquiryHref ?? collectionInquiryHref({ design: design.id });

  return (
    <div className="earth-site">
      <div className="earth-header">
        <EarthworksAction
          className="earth-brand"
          standalone={standalone}
          to="Home"
          onPreview={() => navigate("Home")}
        >
          <RidgelineMark />
          <span>
            {brand}
            <small>EARTH & LANDSCAPE</small>
          </span>
          <span className="sr-only"> — sample home</span>
        </EarthworksAction>
        <nav className="earth-nav" aria-label="Excavation and Landscaping concept pages">
          {earthworksPages.map((item, index) => (
            <EarthworksAction
              key={item}
              standalone={standalone}
              to={item}
              current={page === item}
              onPreview={() => navigate(item)}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {item}
              <span className="earth-nav-tick" aria-hidden="true" />
            </EarthworksAction>
          ))}
        </nav>
      </div>
      <div className="earth-page" key={page} aria-labelledby={`${id}-heading`}>
        {page === "Home" ? (
          <>
            <div className="earth-hero">
              <Image
                {...concept.photo}
                alt={concept.photo.alt}
                sizes="100vw"
                preload={standalone}
              />
              <div className="earth-hero-shade" aria-hidden="true" />
              <TerrainContours />
              <div className="earth-hero-survey" aria-hidden="true">
                <SurveyCross />
                <span>GOOD GROUND. GREATER POSSIBILITIES.</span>
                <SurveyCross />
              </div>
              <div className="earth-hero-copy">
                <p className="earth-kicker">{concept.kicker}</p>
                <Heading {...titleProps}>
                  <EarthworksHeadline text={concept.headlines[0]} />
                </Heading>
                <p className="earth-intro">{concept.subcopy}</p>
                <EarthworksAction
                  className="earth-button"
                  standalone={standalone}
                  to="Contact"
                  onPreview={() => planProject()}
                >
                  {concept.action}
                  <span aria-hidden="true">↗</span>
                </EarthworksAction>
              </div>
              <EarthworksAction
                className="earth-hero-inset"
                standalone={standalone}
                to="Materials"
                onPreview={() => navigate("Materials")}
              >
                <Image
                  src="/images/collection/earthworks-detail.webp"
                  alt="Illustrative pale stone and planting detail"
                  width={1200}
                  height={800}
                  sizes="(max-width:699px) 70vw, 24vw"
                />
                <span>
                  <small>FROM FIRST DIG TO FINISHING TOUCH</small>
                  <strong>Consider every layer.</strong>
                  <span>
                    Explore materials <b aria-hidden="true">↗</b>
                  </span>
                </span>
              </EarthworksAction>
              <div className="earth-hero-foot">
                <span>01 / SHAPING WHAT COMES NEXT</span>
                <EarthworksAction
                  standalone={standalone}
                  to="Projects"
                  onPreview={() => navigate("Projects")}
                >
                  Explore the possibilities<span aria-hidden="true">↘</span>
                </EarthworksAction>
              </div>
            </div>
            <div className="earth-statement">
              <SurveyCross />
              <Subheading>
                The groundwork.
                <br />
                <em>The bigger picture.</em>
              </Subheading>
              <p>{concept.approach}</p>
            </div>
            <div className="earth-services-explorer">
              <div className="earth-section-heading">
                <p className="earth-kicker">01 / What we do</p>
                <Subheading>
                  A practical start.
                  <br />
                  <em>A lasting difference.</em>
                </Subheading>
              </div>
              <div className="earth-explorer-grid">
                <div className="earth-service-choices" aria-label="Explore services">
                  {concept.services.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={activeService === index}
                      aria-controls={`${id}-service-panel`}
                      onClick={() => setActiveService(index)}
                    >
                      <span>0{index + 1}</span>
                      <strong>{item.name}</strong>
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
                <div
                  className="earth-service-panel"
                  id={`${id}-service-panel`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="earth-service-panel-photo" key={servicePhoto.src + activeService}>
                    <Image
                      src={servicePhoto.src}
                      alt={servicePhoto.alt}
                      fill
                      sizes="(max-width:699px) 100vw, 50vw"
                    />
                    <span>0{activeService + 1} / ILLUSTRATIVE DIRECTION</span>
                  </div>
                  <div className="earth-service-panel-copy">
                    <strong>{service?.name}</strong>
                    <p>{service?.description}</p>
                    <EarthworksAction
                      className="earth-text-link"
                      standalone={standalone}
                      to="Contact"
                      onPreview={() => planProject(service?.name)}
                    >
                      Talk through your project<span aria-hidden="true">↗</span>
                    </EarthworksAction>
                  </div>
                </div>
              </div>
            </div>
            <div className="earth-feature-project">
              <div className="earth-feature-photo">
                <Image
                  src="/images/collection/earthworks-landscape.webp"
                  alt="Illustrative finished landscape with stone patio, planting and outdoor living space"
                  fill
                  sizes="(max-width:699px) 100vw, 65vw"
                />
                <span>02 / OUTDOOR LIVING INSPIRATION</span>
              </div>
              <div>
                <p className="earth-kicker">Room to live differently</p>
                <Subheading>
                  Make more
                  <br />
                  of the space
                  <br />
                  <em>you call yours.</em>
                </Subheading>
                <p>
                  A place for slow mornings, shared meals and a little more time outside. Consider
                  the shape of the space, the feeling of the materials and the way you want to live.
                </p>
                <EarthworksAction
                  className="earth-text-link"
                  standalone={standalone}
                  to="Projects"
                  onPreview={() => navigate("Projects")}
                >
                  Explore the inspiration<span aria-hidden="true">↗</span>
                </EarthworksAction>
              </div>
            </div>
            <section className="earth-home-materials" aria-label="Explore material directions">
              <div className="earth-material-heading">
                <div>
                  <p className="earth-kicker">03 / A considered palette</p>
                  <Subheading>
                    Find your <em>natural fit.</em>
                  </Subheading>
                </div>
                <p>
                  Stone, planting and the land beneath. Choose a direction to see how the details
                  can come together.
                </p>
              </div>
              <EarthworksMaterials standalone={standalone} />
              <EarthworksAction
                className="earth-text-link"
                standalone={standalone}
                to="Materials"
                onPreview={() => navigate("Materials")}
              >
                More about materials<span aria-hidden="true">↗</span>
              </EarthworksAction>
            </section>
            <div className="earth-home-process">
              <TerrainContours />
              <p className="earth-kicker">Clear from the beginning</p>
              <div>
                <Subheading>
                  Good work starts
                  <br />
                  <em>with a good plan.</em>
                </Subheading>
                <p>Understand the site. Agree on the scope. Keep the next step clear.</p>
                <EarthworksAction
                  className="earth-text-link"
                  standalone={standalone}
                  to="Process"
                  onPreview={() => navigate("Process")}
                >
                  How it comes together<span aria-hidden="true">↗</span>
                </EarthworksAction>
              </div>
              <div className="earth-process-track" aria-hidden="true">
                <span>01 / SITE</span>
                <span>02 / SCOPE</span>
                <span>03 / BUILD</span>
                <SurveyCross />
              </div>
            </div>
          </>
        ) : page === "Services" ? (
          <div className="earth-inner">
            <div className="earth-page-heading">
              <p className="earth-kicker">A stronger starting point</p>
              <Heading {...titleProps}>
                From first dig.
                <br />
                <em>To final detail.</em>
              </Heading>
              <p>
                See the services that shape a site, solve practical problems and make space for
                something better.
              </p>
            </div>
            <div className="earth-service-list">
              {concept.services.map((item, index) => (
                <article key={item.name}>
                  <div className="earth-service-list-photo">
                    <Image
                      src={servicePhotography[index]?.src ?? projectStudies[0].src}
                      alt={servicePhotography[index]?.alt ?? projectStudies[0].alt}
                      fill
                      sizes="(max-width:699px) 100vw, 42vw"
                    />
                    <span>0{index + 1} / SHAPING THE SITE</span>
                  </div>
                  <div className="earth-service-list-copy">
                    <p className="earth-kicker">0{index + 1} / The work</p>
                    <Subheading>{item.name}</Subheading>
                    <p>{item.description}</p>
                    <EarthworksAction
                      className="earth-text-link"
                      standalone={standalone}
                      to="Contact"
                      onPreview={() => planProject(item.name)}
                    >
                      Plan this work<span aria-hidden="true">↗</span>
                      <span className="sr-only">: {item.name}</span>
                    </EarthworksAction>
                  </div>
                </article>
              ))}
            </div>
            <div className="earth-service-close">
              <SurveyCross />
              <p>
                The right approach depends on the ground in front of you. Site conditions, access
                and the agreed scope guide the plan.
              </p>
              <EarthworksAction
                className="earth-button"
                standalone={standalone}
                to="Contact"
                onPreview={() => planProject()}
              >
                Start your project outline<span aria-hidden="true">↗</span>
              </EarthworksAction>
            </div>
          </div>
        ) : page === "Projects" ? (
          <div className="earth-inner">
            <div className="earth-page-heading">
              <p className="earth-kicker">A feel for what is possible</p>
              <Heading {...titleProps}>
                Good ground.
                <br />
                <em>Great possibilities.</em>
              </Heading>
              <p>
                Explore the relationship between the ground, the details and the spaces that follow.
                Three illustrative directions for what your property could become.
              </p>
            </div>
            <div className="earth-project-toolbar">
              <div
                className="earth-project-filters"
                role="group"
                aria-label="Filter project inspiration"
              >
                {projectViews.map((view) => (
                  <button
                    key={view}
                    type="button"
                    aria-pressed={projectView === view}
                    onClick={() => setProjectView(view)}
                  >
                    {view}
                  </button>
                ))}
              </div>
              <span role="status">
                {visibleProjects.length} illustrative{" "}
                {visibleProjects.length === 1 ? "study" : "studies"}
              </span>
            </div>
            <div className="earth-project-grid">
              {visibleProjects.map((project) => (
                <figure key={project.src}>
                  <div className="earth-project-photo">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      sizes="(max-width:699px) 100vw, 55vw"
                    />
                    <span>{project.type}</span>
                  </div>
                  <figcaption>
                    <Subheading>{project.title}</Subheading>
                    <p>{project.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="earth-sample-note">
              Illustrative images, not completed client projects. Your actual work, approved
              photographs and project details belong here.
            </p>
          </div>
        ) : page === "Materials" ? (
          <div className="earth-material-page">
            <div className="earth-inner earth-material-intro">
              <div className="earth-page-heading">
                <p className="earth-kicker">Texture. Tone. A sense of place.</p>
                <Heading {...titleProps}>
                  The details
                  <br />
                  <em>make the difference.</em>
                </Heading>
                <p>
                  Choose a starting palette. Picture the way it feels, then consider how it needs to
                  work for your property and your everyday life.
                </p>
              </div>
              <TerrainContours />
            </div>
            <div className="earth-material-body">
              <EarthworksMaterials standalone={standalone} />
              <div className="earth-material-considerations">
                <div>
                  <span>01 / THE SITE</span>
                  <Subheading>Work with the land.</Subheading>
                  <p>
                    Start with levels, sunlight, water and access. The best-looking option still
                    needs to make sense on the ground.
                  </p>
                </div>
                <div>
                  <span>02 / THE EVERYDAY</span>
                  <Subheading>Think beyond day one.</Subheading>
                  <p>
                    Consider how you will use the space through the seasons, and how much care you
                    want to give it.
                  </p>
                </div>
                <div>
                  <span>03 / THE DETAILS</span>
                  <Subheading>Bring it all together.</Subheading>
                  <p>
                    View samples, discuss finishes and agree on the material choices alongside the
                    scope of work.
                  </p>
                </div>
              </div>
              <div className="earth-process-close">
                <p>A direction in mind? Let’s give it a starting point.</p>
                <EarthworksAction
                  className="earth-button"
                  standalone={standalone}
                  to="Contact"
                  onPreview={() => planProject()}
                >
                  Shape your project outline<span aria-hidden="true">↗</span>
                </EarthworksAction>
              </div>
            </div>
          </div>
        ) : page === "Process" ? (
          <div className="earth-inner">
            <div className="earth-page-heading">
              <p className="earth-kicker">A clear way forward</p>
              <Heading {...titleProps}>
                Know the plan.
                <br />
                <em>See the progress.</em>
              </Heading>
              <p>
                Understand the site. Make the important decisions together. Keep the next step clear
                from the first conversation through to the finishing details.
              </p>
            </div>
            <div className="earth-process-list">
              {processSteps.map((step, index) => (
                <article key={step.name}>
                  <span className="earth-step-number">0{index + 1}</span>
                  <div>
                    <p className="earth-kicker">{step.note}</p>
                    <Subheading>{step.name}</Subheading>
                    <p>{step.detail}</p>
                  </div>
                  <SurveyCross />
                </article>
              ))}
            </div>
            <div className="earth-process-close">
              <p>Have a starting point in mind?</p>
              <EarthworksAction
                className="earth-button"
                standalone={standalone}
                to="Contact"
                onPreview={() => planProject()}
              >
                Shape your project outline<span aria-hidden="true">↗</span>
              </EarthworksAction>
            </div>
          </div>
        ) : page === "FAQ" ? (
          <div className="earth-inner earth-faq-page">
            <div className="earth-page-heading">
              <p className="earth-kicker">Good questions. Clear starting points.</p>
              <Heading {...titleProps}>
                A little clarity.
                <br />
                <em>A better beginning.</em>
              </Heading>
              <p>
                From the first conversation to the material choices, here are a few things worth
                knowing before the work begins.
              </p>
            </div>
            <div className="earth-faq-layout">
              <aside className="earth-faq-aside">
                <Image
                  src="/images/collection/earthworks-detail.webp"
                  alt="Illustrative stone wall and planting detail"
                  width={1200}
                  height={800}
                  sizes="(max-width:699px) 100vw, 30vw"
                />
                <p className="earth-kicker">Your site is the starting point</p>
                <Subheading>
                  Every space
                  <br />
                  <em>has its own story.</em>
                </Subheading>
                <p>
                  These answers are a starting point. The details belong in a conversation about
                  your actual project.
                </p>
                <EarthworksAction
                  className="earth-text-link"
                  standalone={standalone}
                  to="Contact"
                  onPreview={() => planProject()}
                >
                  Plan the conversation<span aria-hidden="true">↗</span>
                </EarthworksAction>
              </aside>
              <EarthworksQuestions />
            </div>
          </div>
        ) : (
          <div className="earth-inner earth-contact">
            <div className="earth-page-heading">
              <p className="earth-kicker">A little clarity goes a long way</p>
              <Heading {...titleProps}>
                Let’s shape
                <br />
                <em>what comes next.</em>
              </Heading>
              <p>
                Try a project outline. Choose the work and what matters most, then see your starting
                point come together.
              </p>
              <p className="earth-sample-note">
                Interactive sample — selections stay in this page. Nothing is submitted. Your actual
                enquiry form and contact details are added when we personalize the website.
              </p>
              <div className="earth-contact-photo">
                <Image
                  src="/images/collection/earthworks-landscape.webp"
                  alt="Illustrative finished garden and patio to inspire a project conversation"
                  width={1536}
                  height={1024}
                  sizes="(max-width:699px) 100vw, 40vw"
                />
                <span>Your next chapter starts here.</span>
              </div>
            </div>
            <div className="earth-planner">
              <fieldset>
                <legend>
                  <span>01</span> What are you planning?
                </legend>
                <div className="earth-planner-types">
                  {concept.services.map((item) => (
                    <button
                      type="button"
                      key={item.name}
                      aria-pressed={projectType === item.name}
                      onClick={() => {
                        setProjectType(item.name);
                        setCopyState("");
                      }}
                    >
                      {item.name}
                      <span aria-hidden="true">{projectType === item.name ? "✓" : "+"}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <span>02</span> What matters to you?
                </legend>
                <p>Choose any that fit.</p>
                <div className="earth-priorities">
                  {priorities.map((priority) => (
                    <button
                      type="button"
                      key={priority}
                      aria-pressed={selectedPriorities.includes(priority)}
                      onClick={() => changePriority(priority)}
                    >
                      <span aria-hidden="true">
                        {selectedPriorities.includes(priority) ? "✓" : "+"}
                      </span>
                      {priority}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="earth-brief">
                <p className="earth-kicker">Your starting point</p>
                <div
                  className="earth-brief-summary"
                  aria-live="polite"
                  aria-atomic="true"
                  tabIndex={0}
                >
                  {outline}
                </div>
                <button className="earth-text-link" type="button" onClick={copyOutline}>
                  Copy project outline<span aria-hidden="true">↗</span>
                </button>
                <p className="earth-copy-status" role="status">
                  {copyState}
                </p>
              </div>
              <div className="earth-planner-close">
                <p>Want this experience for your business?</p>
                <Link className="earth-button" href={contactLink}>
                  Make this my website<span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="earth-footer">
        <span className="earth-footer-brand">
          <RidgelineMark />
          {brand}
        </span>
        <p>Original L&L demo · Illustrative brand and imagery.</p>
        <Link href={contactLink}>
          Make this your starting point<span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
