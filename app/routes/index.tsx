import { useLoaderData } from "@remix-run/react";
import { generateCryptoQuote } from "~/common/utlities";
import Cryptoquote from "~/components/cryptoquote";

interface QuoteApiPayload {
  _id: string
  // The quotation text
  content: string
  // The full name of the author
  author: string
  // An array of tag names for this quote
  tags: string[]
}


export const loader = async () => {
  const quoteResponse = await fetch("https://api.quotable.io/random?minLength=20&maxLength=250");
  const quote:QuoteApiPayload = await quoteResponse.json();
  const cryptoQuote = generateCryptoQuote(quote.content);
  console.log(quote.content);

  return {
    cryptoQuote: cryptoQuote,
    author: quote.author
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  
  return (
    <div className="container">
      <h1>Cryptle</h1>
      <Cryptoquote cryptoquote={data.cryptoQuote} author={data.author}/>
    </div>
  );
}
