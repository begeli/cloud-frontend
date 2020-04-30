import React, {useState} from 'react';
import MUIDataTable from "mui-datatables";
import NavBar from './NavBar';
import axios from "axios";

export default function LinkAnalytics(props) {
    const userURLsAPIURL = "http://18.196.128.47:8080/Urls/userURL";
    const redirectionAPIURL = "http://18.196.128.47:8080/Urls/";
    
    const columns = ["Full URL", "Shortened URL", "Number of Clicks", "Expiration Date"];
    const [dataUpdated, setDataUpdated] = useState(false);
    const [table_data, setTableData] = useState([]);
    const options = {
        responsive: 'scroll', whiteSpace: 'nowrap', selectableRows: false
        };

    

    const onFinish = () =>  {
      const headers = {
        "usermail":props.email
      }
      console.log("All user urls");
      console.log(headers);
      axios.get(userURLsAPIURL, {headers: headers})    
      .then(res => {
        console.log(res);
        if (res.status === 200) {     
          console.log(res.data.length);
          var i;
          const data = [];
          for (i = 0; i < res.data.length; i++) {
            const table_row = [res.data[i].URL, redirectionAPIURL + res.data[i].hash, res.data[i].noOfClick, res.data[i].date];
            data.push(table_row);            
          }
          console.log("data is " + data);
          setTableData(data);
          console.log("table data is " + table_data);
          setDataUpdated(true);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));          
    }    

    if (dataUpdated) {
      return(        
        <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
          <NavBar />
          <MUIDataTable
          title={"Link Analytics"}
          data={table_data}
          columns={columns}
          options={options}
          />
      </div>
      );      
    } else {
      return (
        <div>
            <NavBar />
            {onFinish()}
            <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
                        <MUIDataTable
                        title={"Link Analytics"}
                        data={table_data}
                        columns={columns}
                        options={options}
                        />
            </div>
        </div>        
      );
    }
    
}