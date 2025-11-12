
import { SubServices } from "@/app/types/types";
import { subService, platformServices } from "../../platform-service/platformservices";
import SubServicesList from "./subServicesList";
import { Box, Typography } from '@mui/material';



const getFilteredSubServices = async (serviceId: string): Promise<SubServices[]> => {
  // Convert the string ID from the URL param to a number
  const idToFilter = Number(serviceId);
  const allServices = await subService.getAll();
  const filteredServices = allServices.filter((i) => i.service_id === idToFilter);
  console.log("Filtered...", allServices, idToFilter, filteredServices);
  return filteredServices;
};

export default async function SubServicePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; // access params id as a promise
  console.log("id is ", id);
  const getServiceName = await platformServices.getById(id);
  console.log("fetch", getServiceName);
  const subservices = await getFilteredSubServices(id);

  return (
    <Box sx={{ alignContent: 'center' , m:4,}} >

     
      <Box sx={{alignContent: 'center',height:'auto', width:'30%',p:2, m:4, bgcolor:'#f5f2f5ff', alignItems:'center'}} >
      <Typography variant="subtitle2" fontWeight="bold" textAlign="center" color="#2c2929ff">
               The Chosen service: {getServiceName.name ?? 'rest'}
      </Typography>
        </Box>

 
      <SubServicesList data={subservices} />
    </Box>
  );
}
