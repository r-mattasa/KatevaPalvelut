
import { SubServices } from "@/app/types/types";
import { subService } from "../../platform-service/platformservices";
import SubServicesList from "./subServicesList";

/* const services = [
  {
    title: "Liikunnan ja valmennuksen palvelutoiminta",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    slug: "liikunta",
  },
  {
    title: "Jalkojenhoitopalvelut",
    slug: "jalkojenhoito",
  },
  {
    title: "Parturi- ja kampaajapalvelut",
    slug: "parturi-kampaamo",
  },
  {
    title: "OSAO kauneudenhoitopalvelut opiskelijatyönä",
    slug: "kauneudenhoito-opiskelijat",
  },
  {
    title: "Kontinkankaan opiskelijahieronta",
    slug: "opiskelijahieronta",
  },
]; */

const getFilteredSubServices = async (serviceId: string): Promise<SubServices[]> => {
  // Convert the string ID from the URL param to a number
  const idToFilter = Number(serviceId);
  const allServices = await subService.getAll();
  const filteredServices = allServices.filter((i) => i.service_id === idToFilter);
  console.log("Filtered...", allServices, idToFilter, filteredServices);
  return filteredServices;
};

export default async function SubServicePage( props : { params: Promise<{ id: string }> }) {
  // Access params.id directly here - it's safe in an async Server Component
   const { id } = await props.params;
  console.log("id is ", id);
  
  const subservices = await getFilteredSubServices(id);

  return (
    <div>
      <h1>Subservices for Service ID: {id}</h1>
      <SubServicesList data={subservices} />
    </div>
  );
}

// export default function ServicesPage() {
/* export default  function SubServicePage({ params }: { params: {id: string}}) {
  const subservices = await getFilteredSubServices(params.id);
 
} */
