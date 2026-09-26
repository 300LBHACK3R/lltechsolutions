"use client";

import { useState } from "react";
import { hairSalonContent } from "@/data/hair-salon-content";

export default function HairSalonServiceMenu() {
  const [category, setCategory] = useState("all");
  const services = hairSalonContent.services.filter(
    (service) => category === "all" || service.category === category,
  );

  return (
    <div className="hair-service-menu">
      <div className="hair-menu-toolbar">
        <div className="hair-service-filters" role="group" aria-label="Filter the example services">
          {[{ id: "all", name: "All services" }, ...hairSalonContent.categories].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              aria-controls="hair-menu-results"
              onClick={() => setCategory(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <p aria-live="polite" aria-atomic="true">
          {services.length} example services
        </p>
      </div>
      <div className="hair-menu-legend" aria-hidden="true">
        <span>SERVICE</span>
        <span>APPROX. TIME</span>
        <span>FROM / CAD</span>
      </div>
      <ul id="hair-menu-results" className="hair-menu-results">
        {services.map((service) => (
          <li key={service.id}>
            <div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <span className="hair-service-duration">
              <span className="hair-sr-only">Approximate time: </span>
              {service.duration}
            </span>
            <strong>
              <span className="hair-sr-only">Sample price from </span>
              {service.price}
              <span className="hair-sr-only"> CAD</span>
            </strong>
          </li>
        ))}
      </ul>
      <p className="hair-menu-note">
        Illustrative starting prices in CAD and example appointment lengths. This is a fictional
        salon menu. Final services, pricing, inclusions and tax information are supplied by your
        salon at launch.
      </p>
    </div>
  );
}
