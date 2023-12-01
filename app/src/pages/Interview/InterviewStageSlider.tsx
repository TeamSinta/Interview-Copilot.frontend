import { useEffect, useState, useRef } from "react";

interface Question {
  number: string;
  question: string;
  duration: string;
  rating: string;
  answer: string;
  id: string;
}

interface Stage {
  stage: string;
  stageId: string;
  questions: Question[];
}

interface Props {
  data: Stage[];
  setActiveData(a: any): any;
  resetList(): void;
}

export default function InterviewStageSlider({
  data,
  setActiveData,
  resetList,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, data.length);
  }, [data]);

  const scrollToItem = (index: number, alignToStart = false) => {
    setActiveIndex(index);
    const parentDiv = parentRef.current;
    const itemRef = itemRefs.current[index];
    setActiveData(data[index]);

    if (parentDiv && itemRef) {
      const itemWidth = itemRef.offsetWidth;
      const parentWidth = parentDiv.offsetWidth;
      const scrollPos = alignToStart
        ? itemRef.offsetLeft - parentDiv.offsetLeft
        : itemRef.offsetLeft -
          parentDiv.offsetLeft -
          (parentWidth - itemWidth) / 2;

      parentDiv.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (index: number) => {
    if (index === activeIndex) {
      const previousIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : 0;
      scrollToItem(previousIndex, false);
    } else {
      scrollToItem(index, true);
    }

    resetList();
  };
  return (
    <div
      ref={parentRef}
      style={{
        display: "flex",
        width: "100%",
        fontSize: "12px",
        transition: "transform 0.3s",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {data &&
        data.map((stage, index) => (
          <div
            key={index}
            ref={(ref) => (itemRefs.current[index] = ref as HTMLDivElement)}
            onClick={() => handleClick(index)}
            style={{
              opacity: activeIndex === index ? "1" : "0.5",
              cursor: "pointer",
              padding: "0px",
              marginRight: "10px",
              paddingLeft: "0px",
            }}
          >
            <span style={{ width: "90%", padding: "15px" }}>{stage.stage}</span>
            <hr
              style={{
                borderRadius: "20px",
                border: "2px solid #6462F1",
                marginBottom: "15px",
                padding: "0px",
              }}
            />
          </div>
        ))}
    </div>
  );
}
