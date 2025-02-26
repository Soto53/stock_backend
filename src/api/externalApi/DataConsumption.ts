import { Request, Response } from 'express';
import {getExternalData} from './externalapi';
import fs from 'fs';
import path from 'path';

interface Meta {

    found: number;
    returned: number;
    limit: number;
    page: number;

}
  

  

  
export async function DataEater() {
   
      
      const externalData = await getExternalData();
      const { found, returned, limit, page }: Meta = externalData.data;


      console.log("found, returned, limit, page");


      const dbFilePath = path.join(__dirname, '../putjhere/users.json');

          // Create a JSON object with the data you want to save
    const dataToSave = {
        found,
        returned,
        limit,
        page,
    };

    
    // Write the JSON object to a file
    fs.writeFile(dbFilePath, JSON.stringify(dataToSave, null, 2), (err) => {
        if (err) {
            console.error('Error writing file', err);
        } else {
            console.log('Data successfully written');
        }
    });

    return externalData;
      

}


//   interface ExternalData {
//     meta: Meta;

//   }