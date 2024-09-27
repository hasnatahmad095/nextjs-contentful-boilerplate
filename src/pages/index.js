import React from "react";
import { getAwards, getHomeData } from "../lib/contentful/api";

export default function Index({ awards, home }) {

  return (
    // <div>
    //   {awards.map((i, idx) => {
    //     return (
    //       <div key={idx}>
    //         <h2>{i.bannertitle}</h2>
    //         <p>{i.bannerdesc}</p>
    //       </div>
    //     );
    //   })}
    // </div>
    <>

      {/* Banner Section */}

      <section className="Banner relative py-20 h-screen">
        <div className="overlay"></div>
        <img className="w-full h-full absolute left-0 right-0 m-auto top-0" src={home[0].banner.url} />
        <div className="container !w-full h-full flex items-end relative z-50">
          <h1 className="font-bold text-white text-[32px] md:text-[40px] lg:text-[60px]">{home[0].bannerText}</h1>
        </div>
      </section>

      {/* About Section */}
      <section className="aboutSection">
        <div className="container">
          <div className="flex">
            <div>
              <h2>{home[0].aboutHeading}</h2>
              <p>{home[0].aboutDescription}</p>
            </div>
            <div>
              <img className="w-full h-full" src={home[0].aboutImage.url} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const awards = await getAwards(false);
  const home = await getHomeData(false);

  return {
    props: {
      awards,
      home,
    },
    revalidate: 60,
  };
}
