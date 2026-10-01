import test from "node:test";
import assert from "node:assert/strict";
import {
  templateSale,
  isTemplateSaleActive,
  templatePrice,
  formatPriceCad,
  designPrice,
  collectionInquiry,
  journeyInquiry,
  websiteDesigns,
} from "../src/data/website-collection.ts";

const startsAt = Date.parse("2026-10-01T23:30:00.000Z");
const endsAt = Date.parse("2027-01-01T07:00:00.000Z");
const approvedPrices = [
  [150, 120, "$120 CAD"],
  [299, 239.2, "$239.20 CAD"],
  [399, 319.2, "$319.20 CAD"],
  [499, 399.2, "$399.20 CAD"],
  [549, 439.2, "$439.20 CAD"],
  [600, 480, "$480 CAD"],
];

test("the 20% sale includes its start and ends exactly at midnight Alberta on January 1", () => {
  assert.equal(templateSale.percent, 20);
  assert.equal(Date.parse(templateSale.startsAt), startsAt);
  assert.equal(Date.parse(templateSale.endsAt), endsAt);
  assert.equal(templateSale.endsLabel, "January 1, 2027 at 12:00 a.m. MT");
  for (const [now, active] of [
    [startsAt - 1, false],
    [startsAt, true],
    [endsAt - 1, true],
    [endsAt, false],
    [endsAt + 1, false],
  ])
    assert.equal(isTemplateSaleActive(now), active, new Date(now).toISOString());
});

test("every approved base price has its exact sale amount and restores its regular amount", () => {
  for (const [regularPriceCad, salePriceCad, label] of approvedPrices) {
    const design = { startingPriceCad: regularPriceCad };
    for (const now of [startsAt, endsAt - 1]) {
      assert.deepEqual(templatePrice(regularPriceCad, now), {
        regularPriceCad,
        priceCad: salePriceCad,
        saleActive: true,
      });
      assert.equal(formatPriceCad(salePriceCad), label);
      assert.equal(designPrice(design, now), `From ${label}`);
    }
    for (const now of [startsAt - 1, endsAt, endsAt + 1]) {
      assert.deepEqual(templatePrice(regularPriceCad, now), {
        regularPriceCad,
        priceCad: regularPriceCad,
        saleActive: false,
      });
      assert.equal(designPrice(design, now), `From $${regularPriceCad} CAD`);
    }
    assert.equal(design.startingPriceCad, regularPriceCad, "display never mutates the base price");
  }
});

test("unpriced additions stay quoted throughout the sale and after expiry", () => {
  for (const now of [startsAt - 1, startsAt, endsAt - 1, endsAt]) {
    assert.deepEqual(templatePrice(null, now), {
      regularPriceCad: null,
      priceCad: null,
      saleActive: false,
    });
    assert.equal(designPrice({ startingPriceCad: null }, now), "Quoted after a conversation");
  }
});

test("canonical enquiries show the sale terms only while active and ignore forged pricing dates", () => {
  const design = websiteDesigns.find((offer) => offer.id === "still");
  const query = {
    collection: "website",
    design: design.id,
    price: "1",
    discount: "100",
    now: "2099-01-01T00:00:00.000Z",
    sale: "false",
  };
  const active = collectionInquiry(query, websiteDesigns, endsAt - 1);
  assert.ok(active.message.includes("Launch pricing: From $239.20 CAD."));
  assert.ok(active.message.includes("20% template sale. Regular starting price: $299 CAD."));
  assert.ok(active.message.includes(`Offer ends ${templateSale.endsLabel}`));
  assert.ok(active.message.includes("extras and ongoing plans are separate"));
  assert.equal(active.contactMode, design.contactMode);
  const expired = collectionInquiry(
    { ...query, now: templateSale.startsAt, sale: "true" },
    websiteDesigns,
    endsAt,
  );
  assert.ok(expired.message.includes("Launch pricing: From $299 CAD."));
  assert.ok(!expired.message.includes("20% template sale"));
  assert.ok(!expired.message.includes("Offer ends"));
  assert.equal(expired.contactMode, design.contactMode);
  for (const inquiry of [active, expired])
    assert.ok(!inquiry.message.includes("From $1 CAD"), "query cannot forge the price");
  for (const [now, expected] of [
    [endsAt - 1, active],
    [endsAt, expired],
  ]) {
    const guided = journeyInquiry(design, ["photos", "contact-form"], "care", now);
    assert.equal(
      guided.message.match(/^Launch pricing:.*$/m)?.[0],
      expected.message.match(/^Launch pricing:.*$/m)?.[0],
      "guided enquiries use the same price at the sale boundary",
    );
    assert.equal(guided.message.includes("20% template sale"), now < endsAt);
    assert.ok(guided.message.includes("Photography & videography"));
    assert.ok(guided.message.includes("Enquiry form or contact workflow"));
  }
});
