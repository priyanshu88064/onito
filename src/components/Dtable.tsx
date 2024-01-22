import DataTable from 'datatables.net-dt';
import { Box } from '@mui/material';
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { useSelector } from 'react-redux';

function Dtable(){

    const personalInfo = useSelector((state:any)=>{
        return state.personalInfo.map((item:any) => Object.values(item.data))
    });
    const country = useSelector((state:any)=>state.country);
    const isSubmitted = useSelector((state:any)=>state.submit);
    
    let table = new DataTable('#example');

    if(isSubmitted){
        table.row.add([...personalInfo[personalInfo.length-1],country]).draw(false);
    }

    return (
        <Box sx={{
            mt:"20px"
        }}>
            <table id="example" className="display" style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>DOB/Age</th>
                        <th>Sex</th>
                        <th>ID Type</th>
                        <th>ID</th>
                        <th>Pincode</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Address</th>
                        <th>Country</th>
                    </tr>
                </thead>
            </table>
        </Box>
    );
}

export default Dtable;