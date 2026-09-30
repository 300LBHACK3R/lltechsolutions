import Image from "next/image";
import Link from "next/link";
import { retailPagePath, type RetailTemplate } from "@/data/website-collection";
import { JewelleryGallery } from "./RetailPremiumInteractions";
import { RetailContact, RetailFooter, RetailHeader, RetailPageIntro } from "./RetailShared";

type JewelleryProps = { template: RetailTemplate; page?: string; enquiryHref: string };

function FormePhoto({
  template,
  className = "",
  eager = false,
  caption = "Light on form / An illustrative still life",
}: {
  template: RetailTemplate;
  className?: string;
  eager?: boolean;
  caption?: string;
}) {
  return (
    <figure className={`forme-photo ${className}`}>
      <div>
        <Image
          src={template.image}
          alt={template.imageAlt}
          fill
          sizes="(max-width: 760px) 100vw, 65vw"
          loading={eager ? "eager" : "lazy"}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function FormeNext({
  title = "Something personal begins with a conversation.",
  label = "Begin a conversation",
  target = "Contact",
}: {
  title?: string;
  label?: string;
  target?: string;
}) {
  return (
    <section className="forme-next retail-wrap">
      <span className="forme-monogram" aria-hidden="true">
        f.
      </span>
      <p className="forme-eyebrow">A note to the atelier</p>
      <h2>{title}</h2>
      <Link className="forme-link" href={retailPagePath(target)}>
        {label}
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

function JewelleryHome({ template }: { template: RetailTemplate }) {
  return (
    <>
      <section className="forme-hero retail-wrap">
        <div className="forme-hero-copy">
          <p className="forme-eyebrow">Objects of quiet distinction</p>
          <h1>
            {template.headline}
            <em>{template.emphasis}</em>
          </h1>
          <p>{template.intro}</p>
          <Link className="forme-link" href={retailPagePath("Collections")}>
            Discover the studies <span aria-hidden="true">↗</span>
          </Link>
          <span className="forme-hero-edition">FORME / A jewellery atelier concept</span>
        </div>
        <FormePhoto
          template={template}
          className="forme-hero-photo"
          eager
          caption="No. 01 / On the relationship between objects"
        />
        <span className="forme-hero-margin" aria-hidden="true">
          Form. Light. A little space.
        </span>
      </section>
      <section className="forme-statement retail-wrap">
        <p className="forme-eyebrow">A point of view</p>
        <h2>
          Noticed in a moment.
          <br />
          <em>Considered for a lifetime.</em>
        </h2>
        <p>
          A curve that holds the light. An edge that feels deliberate. An object with room for your
          own meaning.
        </p>
        <Link className="forme-link" href={retailPagePath("The atelier")}>
          The atelier’s perspective <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <section className="forme-exhibition retail-wrap">
        <div className="forme-section-heading">
          <p className="forme-eyebrow">An exhibition in three studies</p>
          <h2>
            Simple forms.
            <br />
            <em>Many possibilities.</em>
          </h2>
          <p>
            A small exploration of proportion, surface and the spaces in between. Move through the
            collection and consider each form in a different light.
          </p>
        </div>
        <JewelleryGallery items={template.items} />
        <Link className="forme-link" href={retailPagePath("Collections")}>
          View the collection notes <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <section className="forme-material-teaser">
        <div className="retail-wrap">
          <div className="forme-material-art" aria-hidden="true">
            <span />
            <span />
            <span />
            <i>01 — 03 / Tonal studies</i>
          </div>
          <div>
            <p className="forme-eyebrow">The character of a surface</p>
            <h2>
              Before the object,
              <br />
              <em>the material.</em>
            </h2>
            <p>
              Warmth and coolness. Reflection and restraint. The finish is part of the form,
              carrying an idea in its own quiet way.
            </p>
            <Link className="forme-link" href={retailPagePath("Materials")}>
              A closer look at materials <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="forme-bespoke-teaser retail-wrap">
        <p className="forme-eyebrow">An idea, entirely your own</p>
        <h2>
          Made meaningful.
          <br />
          <em>By you.</em>
        </h2>
        <div>
          <p>
            Some pieces begin with a sketch. Others with a memory, a gesture or a shape you cannot
            stop thinking about.
          </p>
          <Link className="forme-link" href={retailPagePath("Bespoke")}>
            Explore the bespoke process <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <FormeNext />
    </>
  );
}

function JewelleryCollections({ template }: { template: RetailTemplate }) {
  return (
    <>
      <RetailPageIntro
        eyebrow="The collections / Studies in form"
        title="A small collection. An open conversation."
        description="Three illustrative objects, viewed as studies of shape and light. These are concept pieces, with no live inventory or purchasing function."
      />
      <section className="forme-collection-gallery retail-wrap">
        <JewelleryGallery items={template.items} />
      </section>
      <section className="forme-collection-index retail-wrap">
        <p className="forme-eyebrow">The exhibition notes</p>
        <div>
          {template.items.map((item, index) => (
            <article key={item.name}>
              <span className="forme-index">0{index + 1}</span>
              <div>
                <p className="forme-eyebrow">{item.category}</p>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <div className="forme-item-enquiry">
                <span>{item.price}</span>
                <Link className="forme-link" href={retailPagePath("Contact")}>
                  Enquire about a direction <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="forme-quiet-note retail-wrap">
        <p>
          Sample prices are in CAD. Illustrations explore colour and geometry. A real piece’s
          dimensions, composition, finish, price and availability would be confirmed by the atelier.
        </p>
      </div>
      <FormeNext
        title="A familiar form. Your own interpretation."
        label="Consider a bespoke piece"
        target="Bespoke"
      />
    </>
  );
}

function JewelleryAtelier({ template }: { template: RetailTemplate }) {
  return (
    <>
      <RetailPageIntro
        eyebrow="The atelier / A point of view"
        title="Less, but with a little more meaning."
        description="FORME is an imagined jewellery atelier. An exploration of how a small object can hold a large idea."
      />
      <section className="forme-atelier-opening retail-wrap">
        <span className="forme-large-letter" aria-hidden="true">
          f.
        </span>
        <div>
          <p className="forme-atelier-lead">
            A shape does not need to say everything.
            <br />
            <em>Only something worth keeping.</em>
          </p>
          <p>{template.about}</p>
          <p>
            For this atelier concept, the starting point is always a line: a circle left open, an
            edge folded inward, a curve catching the light. Each one asks what can be taken away
            while keeping the feeling intact.
          </p>
        </div>
      </section>
      <FormePhoto
        template={template}
        className="forme-atelier-photo retail-wrap"
        caption="The space around an object is part of the composition."
      />
      <section className="forme-principles retail-wrap">
        <div>
          <p className="forme-eyebrow">Three guiding thoughts</p>
          <h2>
            The details
            <br />
            <em>we return to.</em>
          </h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>Give the form room.</h3>
              <p>
                A simple silhouette lets the eye travel. Negative space is given the same attention
                as the object itself.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Let the surface speak.</h3>
              <p>
                Soft reflection, a polished edge, the change from warm to cool. Finish is a part of
                the design conversation.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Leave room for a story.</h3>
              <p>
                The object is only the beginning. The person who wears it brings the meaning that no
                drawing can supply.
              </p>
            </div>
          </li>
        </ol>
      </section>
      <div className="forme-quiet-note retail-wrap">
        <p>
          This fictional atelier has no claimed maker history, workshop location or material
          provenance. A real studio’s people, methods and story would make this space their own.
        </p>
      </div>
      <FormeNext title="The first line might be yours." label="Explore bespoke" target="Bespoke" />
    </>
  );
}

function JewelleryBespoke({ template, enquiryHref }: JewelleryProps) {
  return (
    <>
      <RetailPageIntro
        eyebrow="Bespoke / A shared process"
        title="For the idea that is yours alone."
        description="A memory, a shape, an occasion. Begin with what matters to you, and give the conversation a little room to unfold."
      />
      <section className="forme-bespoke-opening retail-wrap">
        <div className="forme-bespoke-sketch" aria-hidden="true">
          <svg viewBox="0 0 500 480">
            <circle cx="250" cy="237" r="144" />
            <ellipse cx="250" cy="237" rx="113" ry="144" />
            <ellipse cx="250" cy="237" rx="105" ry="136" />
            <path d="M250 38v398M50 237h400M108 88l287 299M108 387l287-299" />
            <circle cx="250" cy="237" r="3" />
          </svg>
          <span>A line. A possibility.</span>
        </div>
        <div>
          <p className="forme-eyebrow">Before the sketch</p>
          <h2>
            Bring an idea.
            <br />
            <em>It need not be finished.</em>
          </h2>
          <p>
            A clear starting point matters more than a perfect brief. Share a few words about the
            piece, what draws you to it and how you imagine it being worn.
          </p>
          <p>
            Materials, dimensions, feasibility, pricing and timing would be discussed and agreed
            with a real maker before a commission begins.
          </p>
          <a className="forme-link" href="#contact">
            Try the enquiry preview <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section className="forme-bespoke-process retail-wrap">
        <p className="forme-eyebrow">From first thought to considered direction</p>
        <ol>
          <li>
            <span>01 / Conversation</span>
            <h2>Find the feeling.</h2>
            <p>
              Describe the person, the occasion or the everyday moment. Bring references and a
              preferred budget, if you have them.
            </p>
          </li>
          <li>
            <span>02 / Exploration</span>
            <h2>Give it a shape.</h2>
            <p>
              Discuss proportion, possible materials and the details that matter. A real proposal
              defines the design work and its scope.
            </p>
          </li>
          <li>
            <span>03 / Agreement</span>
            <h2>Make it clear.</h2>
            <p>
              Confirm the approved design, specifications, price and timing directly with the maker
              before committing to work.
            </p>
          </li>
        </ol>
      </section>
      <RetailContact template={template} enquiryHref={enquiryHref} />
    </>
  );
}

const materialNotes = [
  {
    title: "A warmer light.",
    name: "Champagne tones",
    text: "A quiet warmth that picks out the contour of a rounded form. In this palette, pale highlights give way to deeper, honey-coloured edges.",
    className: "champagne",
  },
  {
    title: "A cooler reflection.",
    name: "Silver tones",
    text: "A sharper contrast between light and shadow. A cool-toned surface draws attention to the geometry and the space around an object.",
    className: "silver",
  },
  {
    title: "A softer presence.",
    name: "Rose tones",
    text: "A gentle blush changes the mood of the same shape. The colour is a way to explore a direction before discussing an actual material.",
    className: "rose",
  },
];

function JewelleryMaterials() {
  return (
    <>
      <RetailPageIntro
        eyebrow="Materials / A closer look"
        title="The surface is part of the story."
        description="An editorial palette of warmth, reflection and texture. These colour studies are an invitation to look closely, rather than specifications for a real piece."
      />
      <section className="forme-materials-page retail-wrap">
        {materialNotes.map((note, index) => (
          <article
            key={note.name}
            className={`forme-material-study forme-material-${note.className}`}
          >
            <div className="forme-material-swatch" aria-hidden="true">
              <span />
              <i>0{index + 1}</i>
            </div>
            <div>
              <p className="forme-eyebrow">{note.name}</p>
              <h2>{note.title}</h2>
              <p>{note.text}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="forme-material-questions retail-wrap">
        <div>
          <p className="forme-eyebrow">For a real piece</p>
          <h2>
            Beautiful details.
            <br />
            <em>Clear information.</em>
          </h2>
          <p>
            Colour alone does not tell you what something is made from. A real atelier should
            confirm the specifications of the piece being discussed.
          </p>
        </div>
        <dl>
          <div>
            <dt>Composition</dt>
            <dd>
              The actual metal or alloy, fineness where relevant, and any plating or surface
              treatment.
            </dd>
          </div>
          <div>
            <dt>Stones</dt>
            <dd>
              Any stone’s identity, origin claims, treatments and the documentation available for
              that piece.
            </dd>
          </div>
          <div>
            <dt>Provenance</dt>
            <dd>
              The sourcing statements the maker can support. No sourcing or certification claim is
              made by this demo.
            </dd>
          </div>
          <div>
            <dt>Living with it</dt>
            <dd>
              Piece-specific care, repair options and suitability for the way you intend to wear it.
            </dd>
          </div>
        </dl>
      </section>
      <FormeNext title="A question about the smallest detail is welcome." />
    </>
  );
}

const journalEntries = [
  {
    title: "The space inside the circle.",
    category: "Notes on form",
    number: "01",
    intro: "A circle is as much about what it leaves open as the line that draws it.",
    paragraphs: [
      "Look at a ring as a small sculpture for a moment. The eye follows its outer edge, then moves through the centre. Neither shape exists quite independently of the other.",
      "For this collection study, the space inside the object is a useful starting point. Widen the band and the opening feels intimate. Narrow the line and it feels expansive. The same familiar form can carry an entirely different mood.",
    ],
  },
  {
    title: "When the light moves.",
    category: "Notes on surface",
    number: "02",
    intro: "A still object can feel different from one moment to the next.",
    paragraphs: [
      "The outline stays the same, but a bright edge becomes a shadow. A flat surface reads as a curve. In the illustrations here, shifting between warm and cool tones is a simple way of seeing the effect.",
      "The finish of a real object adds another layer to that conversation. A photograph, a colour sample and the piece in front of you each reveal something different. Looking closely is part of choosing deliberately.",
    ],
  },
  {
    title: "A brief can begin with a feeling.",
    category: "Notes on making",
    number: "03",
    intro: "You do not need a finished drawing to begin a meaningful design conversation.",
    paragraphs: [
      "Perhaps there is a gesture you want to remember, a shape from a place you love, or a piece you reach for every day. Those small observations give a maker something to ask about.",
      "A useful first note can be simple: what the piece means, how you imagine wearing it, and any practical considerations. The rest is a conversation about what is possible, followed by clear agreement on the details.",
    ],
  },
];

function JewelleryJournal({ template }: { template: RetailTemplate }) {
  return (
    <>
      <RetailPageIntro
        eyebrow="The journal / Small observations"
        title="A little time to look closer."
        description="Short editorial notes on the forms, surfaces and conversations behind this imagined atelier."
      />
      <section className="forme-journal-feature retail-wrap">
        <FormePhoto template={template} caption="An object changes with the light around it." />
        <div>
          <p className="forme-eyebrow">The atelier notebook</p>
          <h2>
            On looking.
            <br />
            <em>And looking again.</em>
          </h2>
          <p>
            Some details ask for a second glance. A shadow inside a curve. The meeting of two edges.
            A small change that alters the whole.
          </p>
          <a className="forme-link" href="#forme-notes">
            Open the notebook <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section
        className="forme-journal-list retail-wrap"
        id="forme-notes"
        aria-label="Journal articles"
      >
        {journalEntries.map((entry) => (
          <details key={entry.number}>
            <summary>
              <span className="forme-index">{entry.number}</span>
              <div>
                <span className="forme-eyebrow">{entry.category}</span>
                <h2>{entry.title}</h2>
                <p>{entry.intro}</p>
              </div>
              <span className="forme-journal-toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="forme-journal-content">
              {entry.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="forme-journal-signature">From the FORME concept notebook</p>
            </div>
          </details>
        ))}
      </section>
      <FormeNext
        title="The next story could begin with you."
        label="Explore bespoke"
        target="Bespoke"
      />
    </>
  );
}

export default function JewelleryTemplate({
  template,
  page = "home",
  enquiryHref,
}: JewelleryProps) {
  return (
    <div className={`retail-site retail-theme-${template.id}`}>
      <RetailHeader template={template} page={page} />
      {page === "home" ? (
        <JewelleryHome template={template} />
      ) : page === "collections" ? (
        <JewelleryCollections template={template} />
      ) : page === "the-atelier" ? (
        <JewelleryAtelier template={template} />
      ) : page === "bespoke" ? (
        <JewelleryBespoke template={template} enquiryHref={enquiryHref} />
      ) : page === "materials" ? (
        <JewelleryMaterials />
      ) : page === "journal" ? (
        <JewelleryJournal template={template} />
      ) : (
        <>
          <RetailPageIntro
            eyebrow="Contact / The beginning of a conversation"
            title="A small note. A new possibility."
            description="For a collection question, an idea for a personal piece or a closer look at the atelier’s approach. Explore the local enquiry preview below."
          />
          <div className="forme-contact-prelude retail-wrap">
            <span className="forme-monogram" aria-hidden="true">
              f.
            </span>
            <p>
              There is no need for a perfect brief.
              <br />A few thoughtful words are a good place to begin.
            </p>
          </div>
          <RetailContact template={template} enquiryHref={enquiryHref} />
        </>
      )}
      <RetailFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
