import { Helmet } from "react-helmet";
import Design from "../../components/Design/Design";

export default function Home() {
  return (
    <div className=" relative bg-black w-full h-screen text-white flex justify-center items-center text-4xl font-bold">
      <Helmet>
        <title> Home </title>
      </Helmet>
      <Design />
      <div className=" relative ">😂😂 لسه هنشتغل بعدين </div>
    </div>
  );
}
