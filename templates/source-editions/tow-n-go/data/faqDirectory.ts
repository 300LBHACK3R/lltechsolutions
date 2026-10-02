export type FaqCategoryId =
  | "getting-started"
  | "trailer-selection"
  | "booking-pricing"
  | "towing-requirements"
  | "delivery-collection"
  | "transport-delivery"
  | "loading-safety"
  | "returns-condition"
  | "service-area-seasonal";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: FaqCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    shortLabel: "Start Here",
    description: "The quickest way to identify the right Trail & Co rental or hauling option.",
    items: [
      {
        id: "which-trailer-do-i-need",
        question: "Which trailer do I need?",
        answer:
          "Enclosed trailers are generally best for furniture, boxes, tools, appliances, business inventory, and cargo that needs weather protection. Dump trailers are suited to branches, debris, landscaping material, and cleanup work. Flatdeck and dovetail trailers are designed for equipment, machinery, vehicles, pallets, lumber, and larger open-deck loads.",
      },
      {
        id: "what-details-should-i-send",
        question: "What information should I send with my inquiry?",
        answer:
          "Include what you need to move, the approximate dimensions and weight when known, the pickup location, the destination when applicable, your preferred date, and whether you plan to tow the trailer yourself. Photos are strongly recommended when they help explain the load or access conditions.",
      },
      {
        id: "can-i-send-photos",
        question: "Can I send photos of the load or job site?",
        answer:
          "This sample form does not accept or send photographs. When launching your own business site, explain your approved way for customers to share load and access photos.",
      },
      {
        id: "is-inquiry-confirmed-booking",
        question: "Does submitting the website form confirm my booking?",
        answer:
          "No. This demonstration only previews the fields in your browser. It sends no request or email, saves no submission and makes no booking. Connect your own enquiry service and replace the sample terms before launch.",
      },
    ],
  },
  {
    id: "trailer-selection",
    label: "Choosing a Trailer",
    shortLabel: "Trailers",
    description:
      "Understand the practical differences between the enclosed, dump, and flatdeck or dovetail options.",
    items: [
      {
        id: "enclosed-trailer-best-for",
        question: "What is an enclosed trailer best for?",
        answer:
          "An enclosed trailer is generally the best choice for household moves, furniture, appliances, boxes, tools, business inventory, motorcycles, and other cargo that should remain protected from weather, road spray, and open exposure.",
      },
      {
        id: "dump-trailer-best-for",
        question: "What is a dump trailer best for?",
        answer:
          "A dump trailer is designed for branches, brush, yard waste, renovation debris, property cleanup, landscaping material, soil, gravel, and other approved bulk loads that benefit from hydraulic unloading.",
      },
      {
        id: "flatdeck-dovetail-best-for",
        question: "What is a flatdeck or dovetail trailer best for?",
        answer:
          "Flatdeck and dovetail trailers provide open-deck and ramp access for equipment, machinery, ATVs, UTVs, small vehicles, pallets, building materials, contractor supplies, and loads that are easier to load from an open deck.",
      },
      {
        id: "can-one-trailer-handle-different-jobs",
        question: "Can one trailer work for several different kinds of jobs?",
        answer:
          "Sometimes, but suitability depends on the load size, weight, shape, weather exposure, loading method, and securement requirements. Send the load details and Trail & Co can help compare the available options.",
      },
      {
        id: "accessories-available",
        question: "Are hitches, straps, cargo nets, boxes, or moving blankets available?",
        answer:
          "Practical support items may be available depending on the trailer and booking. Ask about hitches, ratchet straps, cargo nets, boxes, moving blankets, and related accessories when submitting your inquiry.",
      },
    ],
  },
  {
    id: "booking-pricing",
    label: "Booking, Pricing & Payment",
    shortLabel: "Booking",
    description: "How availability, rental duration, quotes, deposits, and payments are handled.",
    items: [
      {
        id: "how-far-ahead-book",
        question: "How far in advance should I book?",
        answer:
          "Book as early as possible for weekends, holidays, moving dates, spring cleanup, and peak construction or landscaping periods. Earlier requests provide the best chance of securing the preferred trailer and date.",
      },
      {
        id: "same-day-rental",
        question: "Are same-day rentals available?",
        answer:
          "Same-day availability may be possible when the requested trailer, schedule, tow setup, and paperwork can all be confirmed safely. Same-day service is not guaranteed.",
      },
      {
        id: "longer-rentals",
        question: "Can I rent for longer than one day?",
        answer:
          "Daily, weekly, and longer rental periods may be available depending on the trailer and schedule. Include the requested start and return dates so Trail & Co can confirm the appropriate rate and availability.",
      },
      {
        id: "how-much-rental-cost",
        question: "How much does a trailer rental cost?",
        answer:
          "Pricing depends on the trailer, rental duration, delivery or collection requirements, requested accessories, and job details. Trail & Co will confirm the applicable rate before the booking is finalized.",
      },
      {
        id: "deposit-payment-requirements",
        question: "Are a deposit, identification, or rental agreement required?",
        answer:
          "Booking requirements can include payment, identification, a security deposit, proof of an appropriate tow setup, and acceptance of the rental agreement. Trail & Co will confirm the exact requirements that apply to your booking before pickup or delivery.",
      },
      {
        id: "payment-methods",
        question: "What payment methods are accepted?",
        answer:
          "Trail & Co currently supports cash, e-transfer, and credit card payment options. Confirm the preferred method and timing when your booking is approved.",
      },
      {
        id: "cancellation-change",
        question: "What should I do if I need to cancel or change my booking?",
        answer:
          "Contact Trail & Co as soon as possible. Date changes and cancellations depend on availability and the terms confirmed for the booking, so early notice provides the best chance of finding another workable arrangement.",
      },
    ],
  },
  {
    id: "towing-requirements",
    label: "Towing & Vehicle Requirements",
    shortLabel: "Towing",
    description: "What customers need to know before towing a Trail & Co rental themselves.",
    items: [
      {
        id: "can-i-tow-myself",
        question: "Can I tow the trailer myself?",
        answer:
          "Yes, provided your vehicle, hitch, coupler or ball size, electrical connection, braking equipment, insurance, and towing capacity are appropriate for the selected trailer and expected loaded weight.",
      },
      {
        id: "vehicle-capable",
        question: "How do I know whether my vehicle can tow the trailer?",
        answer:
          "Provide the vehicle year, make, model, hitch setup, manufacturer-rated towing capacity, and any brake-controller information. Trail & Co can review the setup, but the driver remains responsible for staying within all manufacturer ratings and legal requirements.",
      },
      {
        id: "brake-controller",
        question: "Do I need a brake controller?",
        answer:
          "Brake and electrical requirements depend on the specific trailer and tow vehicle. Trail & Co will confirm the required connection and braking setup before releasing the trailer.",
      },
      {
        id: "correct-hitch",
        question: "What hitch or ball size do I need?",
        answer:
          "The required hitch hardware depends on the specific trailer. Do not assume that one hitch fits every trailer. Trail & Co will confirm the correct setup and may have practical hitch support available depending on the booking.",
      },
      {
        id: "hookup-walkthrough",
        question: "Will someone explain the hookup and basic trailer operation?",
        answer:
          "Trail & Co can review the coupler, safety chains, electrical connection, lights, doors, ramps, hydraulic controls when applicable, and other basic operating points before departure.",
      },
    ],
  },
  {
    id: "delivery-collection",
    label: "Trailer Delivery & Collection",
    shortLabel: "Trailer Delivery",
    description:
      "For customers who want the empty rental trailer brought to their location and collected afterward.",
    items: [
      {
        id: "can-trailer-be-delivered",
        question: "Can Trail & Co deliver the rental trailer to me?",
        answer:
          "Trailer delivery may be available depending on the requested location, schedule, trailer, access, and placement conditions. Delivery is quoted separately based on the details of the job.",
      },
      {
        id: "how-delivery-collection-works",
        question: "How does trailer delivery and collection work?",
        answer:
          "Trail & Co brings the empty rental trailer to the agreed location. You load and use the trailer during the approved rental period, and Trail & Co returns to collect it at the arranged time.",
      },
      {
        id: "space-for-placement",
        question: "What access information is needed for trailer placement?",
        answer:
          "Provide details about driveway width, surface condition, slope, gates, overhead clearance, street access, turning space, parked vehicles, and any other restrictions that could affect safe delivery or collection.",
      },
      {
        id: "delivery-includes-loading",
        question: "Does trailer delivery include loading or moving labour?",
        answer:
          "No. Standard trailer delivery and collection provide the trailer and transportation of the trailer. The customer is responsible for loading and unloading unless a separate arrangement is specifically confirmed in writing.",
      },
    ],
  },
  {
    id: "transport-delivery",
    label: "Pickup, Transport & Delivery",
    shortLabel: "Hauling",
    description:
      "For suitable prepared loads that customers want Trail & Co to haul from one location to another.",
    items: [
      {
        id: "can-trail-co-transport-load",
        question: "Can Trail & Co transport my load for me?",
        answer:
          "For suitable customer-prepared loads, pickup, transport, and delivery may be available depending on the item, dimensions, weight, access, pickup and destination locations, required trailer, and schedule.",
      },
      {
        id: "difference-delivery-vs-transport",
        question: "What is the difference between trailer delivery and hauling service?",
        answer:
          "Trailer delivery means Trail & Co brings you an empty rental trailer for you to use and collects it afterward. Pickup, transport, and delivery means your prepared load is hauled from the pickup location to the agreed destination.",
      },
      {
        id: "what-can-be-transported",
        question: "What kinds of loads may be transported?",
        answer:
          "Potential loads include furniture, appliances, tools, contractor equipment, building materials, pallets, ATVs, motorcycles, machinery, business inventory, and other suitable cargo. Every load must be reviewed before transport is confirmed.",
      },
      {
        id: "loading-labour",
        question: "Will Trail & Co load my furniture, equipment, or materials?",
        answer:
          "Standard hauling service does not include loading labour. The customer prepares and loads the cargo. Trail & Co must still be satisfied that the load, trailer, weight distribution, and securement are safe before transportation begins.",
      },
      {
        id: "long-distance-transport",
        question: "Is longer-distance transport available?",
        answer:
          "Longer-distance hauling may be considered depending on the load, destination, schedule, trailer requirements, travel time, and total cost. Submit both locations and complete load details for review.",
      },
      {
        id: "transport-quote-details",
        question: "What should I provide for a transport quote?",
        answer:
          "Send the pickup and delivery addresses, photos, item description, approximate dimensions and weight, loading method, access conditions, preferred date, and confirmation that the load will be prepared for pickup.",
      },
    ],
  },
  {
    id: "loading-safety",
    label: "Loading, Weight & Safe Use",
    shortLabel: "Safety",
    description:
      "Practical responsibilities that protect the customer, cargo, tow vehicle, and trailer.",
    items: [
      {
        id: "who-loads-trailer",
        question: "Who is responsible for loading and unloading?",
        answer:
          "The customer is responsible for loading and unloading under the standard rental, delivery, and hauling services unless a different arrangement is specifically confirmed. Every load must remain within approved weight and securement requirements.",
      },
      {
        id: "payload-capacity",
        question: "Can I load up to the physical top of the trailer?",
        answer:
          "Not necessarily. Maximum safe capacity is determined by weight ratings, not only available space. Dense material can reach the trailer or tow vehicle limit long before the trailer appears full.",
      },
      {
        id: "soil-gravel-concrete",
        question: "Can the dump trailer carry soil, gravel, rock, or concrete?",
        answer:
          "Potentially, but dense materials must be approved in advance because payload limits are reached quickly. Provide the material type and estimated quantity before booking.",
      },
      {
        id: "cover-secure-load",
        question: "Does my load need straps, a tarp, netting, or enclosed protection?",
        answer:
          "Many loads require securement or covering based on the cargo and road conditions. Trail & Co will identify the relevant trailer and available support items, but the load cannot travel unless it is safely contained and secured.",
      },
      {
        id: "prohibited-materials",
        question: "Are any materials prohibited?",
        answer:
          "Passengers, illegal cargo, hazardous waste, asbestos, uncontrolled liquids, hot materials, chemicals, and other unsafe or restricted loads are not accepted without explicit approval and may be prohibited entirely. Always disclose the full contents before booking.",
      },
      {
        id: "overloading",
        question: "What happens if the load is heavier than expected?",
        answer:
          "The job must be reassessed before travel. Trail & Co will not knowingly move an overloaded or unsafe trailer. The load may need to be reduced, divided, or matched with a different transportation solution.",
      },
    ],
  },
  {
    id: "returns-condition",
    label: "Pickup, Return & Trailer Condition",
    shortLabel: "Returns",
    description: "What to expect at handoff, during the rental, and when the trailer is returned.",
    items: [
      {
        id: "inspect-before-leaving",
        question: "What should be checked before leaving with the trailer?",
        answer:
          "Review the coupler, hitch, safety chains, electrical connection, lights, brakes when applicable, tires, doors, ramps, hydraulic equipment, visible condition, and included accessories before departure.",
      },
      {
        id: "return-clean",
        question: "Does the trailer need to be returned clean?",
        answer:
          "Yes. Return the trailer in substantially the same clean condition in which it was provided, normal use excepted. Additional cleaning charges may apply when excessive debris, residue, or contamination must be removed.",
      },
      {
        id: "late-return",
        question: "What happens if the trailer is returned late?",
        answer:
          "Contact Trail & Co immediately if a delay occurs. Late returns can affect the next customer and may result in additional charges under the confirmed rental terms.",
      },
      {
        id: "damage-problem",
        question: "What should I do if the trailer is damaged or develops a problem?",
        answer:
          "Stop using the trailer if continuing could be unsafe, protect the trailer and cargo, and contact Trail & Co immediately. Do not attempt unauthorized repairs or continue towing a trailer that may be unsafe.",
      },
      {
        id: "lost-accessories",
        question: "What happens if included equipment or accessories are lost or damaged?",
        answer:
          "Report the issue as soon as possible. Responsibility for damaged or missing accessories is handled under the rental agreement and the condition confirmed at pickup or delivery.",
      },
    ],
  },
  {
    id: "service-area-seasonal",
    label: "Service Area & Seasonal Rentals",
    shortLabel: "Service Area",
    description: "Where Trail & Co operates and how seasonal availability is handled.",
    items: [
      {
        id: "service-area",
        question: "What areas does Trail & Co serve?",
        answer:
          "Trail & Co serves Sampletown, Westfield, Lake District, Southfield, Eastfield, Northfield, the Sample Valley, and surrounding communities. Availability varies by trailer, service type, distance, and schedule.",
      },
      {
        id: "outside-okanagan",
        question: "Can the trailer or transport service go outside the Sample Valley?",
        answer:
          "Possibly. Travel outside the core service area requires prior approval and depends on the trailer, route, destination, rental terms, insurance, schedule, and total transportation cost.",
      },
      {
        id: "winter-rentals",
        question: "Are trailers and hauling services available during winter?",
        answer:
          "Winter rentals and transportation may be available subject to weather, road conditions, trailer suitability, safe access, and scheduling. Enclosed trailers are often the strongest option for cargo requiring protection from winter exposure.",
      },
      {
        id: "reserve-spring-cleanup",
        question: "Can I reserve early for spring cleanup or landscaping season?",
        answer:
          "Yes. Early inquiries are encouraged for spring cleanup, landscaping, construction, moving, and other high-demand periods when preferred dates can fill quickly.",
      },
    ],
  },
];

export const allFaqItems = faqCategories.flatMap((category) => category.items);
