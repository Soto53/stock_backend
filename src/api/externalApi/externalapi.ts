import axios from 'axios';
import { Request, Response } from 'express';
import {DataEater} from './DataConsumption';

export const getExternalData = async  () => {

    console.log("you made it here");
    const Apires = await axios.get('https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=vixRNSzfHufwyMBzESZuJEnCyxoG9fuy69AL2uri');
    // const externalData = Apires.data;
    console.log('almost there');

    return Apires.data;
    
}

export const fetchDataFromAPI = async (req: Request, res: Response) => {
    try {
        const externalData = await DataEater(); 
        res.json({externalData});  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching external data' });
    }
};


