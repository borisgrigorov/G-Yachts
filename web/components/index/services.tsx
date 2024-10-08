import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import sales from "@/public/pictures/index/services/sales.webp";
import charter from "@/public/pictures/index/services/charter.webp";
import management from "@/public/pictures/index/services/management.webp";
import construction from "@/public/pictures/index/services/construction.webp";

const Services = () => {
  const t = useTranslations("index.services");

  return (
    <div className="bg-rock-100 w-full h-full">
      <div className="flex flex-col items-start md:px-24 xl:px-52 px-3 md:py-32 py-16">
        <h1 className="font-slick font-light text-left mb-8">
          {t.rich("title", {
            classic: (chunks) => (
              <span className={"font-classic font-normal uppercase"}>
                <br className={"hidden"} />
                {chunks}
              </span>
            ),
          })}
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
          <div className="flex flex-col ">
            <Link href="/sales">
              <Image
                src={sales}
                alt="Sales"
                className="mb-4 shadow-lg lg:h-[50vh] h-[35vh]"
              />
            </Link>
            <h3 className="md:text-lg text-base font-classic text-left">
              {t("sales")}
            </h3>
            <p className={"font-slick font-light md:text-xl text-lg"}>
              {t("sales-p")}
            </p>
          </div>

          <div className="flex flex-col">
            <Link href="/charters">
              <Image
                src={charter}
                alt="Charter"
                className="mb-4 shadow-lg lg:h-[50vh] h-[35vh]"
              />
            </Link>
            <h3 className="md:text-lg text-base font-classic text-left">
              {t("charter")}
            </h3>
            <p className={"font-slick font-light md:text-xl text-lg"}>
              {t("charter-p")}
            </p>
          </div>

          <div className="flex flex-col">
            <Link href="/management">
              <Image
                src={management}
                alt="Management"
                className="mb-4 shadow-lg lg:h-[50vh] h-[35vh]"
              />
            </Link>
            <h3 className="md:text-lg text-base font-classic text-left">
              {t("management")}
            </h3>
            <p className={"font-slick font-light md:text-xl text-lg"}>
              {t("management-p")}
            </p>
          </div>

          <div className="flex flex-col">
            <Link href={"/new-constructions"}>
              <Image
                src={construction}
                alt="New Construction"
                className="mb-4 shadow-lg lg:h-[50vh] h-[35vh] object-cover"
              />
            </Link>
            <h3 className="md:text-lg text-base font-classic text-left">
              {t("construction")}
            </h3>
            <p className={"font-slick font-light md:text-xl text-lg"}>
              {t("construction-p")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
