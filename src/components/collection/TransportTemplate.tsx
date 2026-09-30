import type { TransportTemplate as Template } from "@/data/website-collection";
import CourierTemplate from "@/components/collection/CourierTemplate";
import MovingTemplate from "@/components/collection/MovingTemplate";
import AutoTransportTemplate from "@/components/collection/AutoTransportTemplate";
import EquipmentRentalsTemplate from "@/components/collection/EquipmentRentalsTemplate";
import ColdChainTemplate from "@/components/collection/ColdChainTemplate";
import FreightTemplate from "@/components/collection/FreightTemplate";

export default function TransportTemplate(props: {
  template: Template;
  page: string;
  enquiryHref: string;
}) {
  switch (props.template.id) {
    case "courier-one-page":
      return <CourierTemplate {...props} />;
    case "moving-company":
      return <MovingTemplate {...props} />;
    case "auto-transport":
      return <AutoTransportTemplate {...props} />;
    case "equipment-rentals":
      return <EquipmentRentalsTemplate {...props} />;
    case "cold-chain":
      return <ColdChainTemplate {...props} />;
    case "freight-logistics":
      return <FreightTemplate {...props} />;
  }
}
