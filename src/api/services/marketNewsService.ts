
import axios from 'axios';
import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient(); 



export interface MarketNews{
    uuid:string,
    title:string,
    description:string,
    keywords:string,
    snippet:string,
    url:string,
    image_url:string,
    language:string,
    published_at:string,
    source:string,
    relevance_score:string|null,
    entities: Entities[],
    
}

interface Entities{
    symbol:string,
    name:string,
    exchange:null,
    exchange_long:null,
    country:string,
    type:string,
    industry:string,
    match_score:number,
    sentiment_score:number,
    highlights:any
}
const key = process.env.MARKET_NEWS_KEY
export const addStockNews = async (symbol: string) => {
  console.log("addNews initiated");

  const response = await axios.get(`https://api.marketaux.com/v1/news/all?symbols=${symbol}&filter_entities=true&language=en&api_token=${key}`);

  const news = response.data.data[0].entities[0] as any

//   const ent = news.entities.forEach((e :any) => (
//     console.log(e.country)
//   ))

    // Create new stock if not found
    // const newMarketNews = await prisma.news.create({
    //   data: {
    //     company:"",
    //     news_url:response.data.url,
    //     image_url:response.data.image_url,
    //     title:response.data.title,
    //     text:response.data.snippet,
    //     source_name:response.data.source,
    //     date : "",
    //     topics:response.data.keywords,
    //     sentiment:"",
    //     type:",",
    //     tickers:"",
    //   },
    // });

// console.log('news', news)
return news 
};