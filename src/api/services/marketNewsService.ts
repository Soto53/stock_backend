
import axios from 'axios';
import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient(); 



export interface MarketNews{
meta: {uuid:string,
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
    entities:[{symbol:string
        ,name:string,
        exchange:null,
        exchange_long:null,
        country:string,
        type:string,
        industry:string,
        match_score:number,
        sentiment_score:number,
        highlights:[{}]}]
    }

}

export const addStockNews = async (symbol: string) => {
  console.log("addStock initiated");

  const response: any = await axios.get(NEWS_URL);

   

    // Create new stock if not found
    const newMarketNews = await prisma.news.create({
      data: {
        company:response.data.data.enteties.symbol,
        news_url:response.data.data.url,
        image_url:response.data.data.image_url,
        title:response.data.data.title,
        text:response.data.data.snippet,
        source_name:response.data.data.source,
        date : "",
        topics:response.data.data.keywords,
        sentiment:"",
        type:",",
        tickers:"",
      },
    });

return newMarketNews;
};