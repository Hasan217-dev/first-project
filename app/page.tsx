import Image from "next/image";

export default async function Home() {

  const res = await fetch("https://api.freeapi.app/api/v1/public/randomjokes/100")
  const data = await res.json()
  console.log(data)



  return (
    <h1 className="text-3xl font-bold">Home Page</h1>
  );
}
