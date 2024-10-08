import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import memories from "@/public/pictures/index/memories.webp";
import { Link } from "@/navigation";

const Memories = () => {
  const t = useTranslations("index.memories");
  return (
    <section
      className={
        "w-full flex lg:flex-row bg-rock-100 flex-col justify-center items-center lg:items-start lg:gap-[0vw] gap-[4vh]"
      }
    >
      <Image
        className={"lg:w-1/2 lg:h-[90vh] object-cover object-bottom w-full"}
        src={memories}
        alt={"Room in the yachts"}
      />
      <div
        className={
          "w-full lg:w-1/2 lg:py-[4vw] containerize flex flex-col justify-start items-start gap-[2vh]"
        }
      >
        <h4>{t("subtitle")}</h4>
        <h1 className={"font-slick font-light"}>
          {t.rich("title", {
            classic: (chunks) => (
              <span className={"font-classic font-normal uppercase"}>
                <br className={"hidden lg:block"} />
                {chunks}
              </span>
            ),
          })}
        </h1>
        <div
          className={
            "w-full flex justify-end items-center my-[8vh] lg:my-[10vh]"
          }
        >
          <div className={"flex flex-col justify-center items-start gap-[2vh]"}>
            <p className={"text-justify md:max-w-[48vh] max-w-[50vh]"}>
              {t("description")}
            </p>
            <Link
              href={"/charters"}
              className={"glass-button glass-button-dark"}
            >
              {t("CTA")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memories;
