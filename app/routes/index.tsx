import { useLoaderData } from "@remix-run/react";
import Cryptoquote from "~/components/cryptoquote";

export const loader = async () => {
  return {
    cryptoQuote: 'AIED EF QUER\'D'
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  
  return (
    <div className="container">
      <h1>Cryptle</h1>
      <Cryptoquote cryptoquote={data.cryptoQuote}/>
    </div>
  );
}
