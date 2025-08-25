import { developerEvents, DeveloperEventType } from "@/data/events";
import React, { useRef, HTMLProps } from "react";
import { m, useTransform, useScroll } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import SectionContainer from "../shared/SectionContainer";

export default function Events(props: Readonly<HTMLProps<HTMLDivElement>>) {
  return (
    <SectionContainer id="events" title="Developer Community Events" {...props}>
      <HorizontalScrollCarousel />
    </SectionContainer>
  );
}
const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <m.div style={{ x }} className="flex gap-4">
          {developerEvents.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </m.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: DeveloperEventType }) => {
  return (
    <div
      key={card.id}
      className="group group relative h-[450px] w-[450px] overflow-hidden rounded-2xl"
    >
      <div
        style={{ backgroundImage: `url(${card.image})` }}
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 hidden w-full place-content-stretch transition-transform duration-300 group-hover:grid">
        <div className="from-card text-accent flex flex-col bg-linear-to-br to-white/0 p-8 font-black uppercase">
          <h3 className="grow text-3xl font-semibold text-white">
            {card.title}
          </h3>
          <div className="mt-4 flex items-center text-lg font-medium text-white">
            <Calendar className="mr-2" />
            {card.date}
          </div>
          <div className="mt-2 flex items-center text-lg font-medium text-white">
            <MapPin className="mr-2" />
            {card.venue}
          </div>
        </div>
      </div>
    </div>
  );
};
