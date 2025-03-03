import axios from 'axios';
import { Request, Response } from 'express';
import {DataEater} from './DataConsumption';

export const getExternalData = async  () => {

    console.log("you made it here");
    const Apires = await axios.get('https://api.twelvedata.com/ad?apikey=459e4dfc97e6485997ef59ff4f51c2d9&interval=1min&symbol=AAPL');
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


