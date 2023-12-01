import React, { useState } from "react";
import { SliderContent, CustomSlider } from "./StyledCustomSlider";

type SliderProps<T> = {
  items: T[]; // An array of items of any type
  renderItem: (item: T) => React.ReactNode; // A function to render each item
};

const Slider = <T extends {}>({ items, renderItem }: SliderProps<T>) => {
  const [activeIndex] = useState(0);

  return (
    <CustomSlider>
      <SliderContent>
        {items.map((item, index) => (
          <div
            className={index === activeIndex ? "active" : "inactive"}
            key={index}
          >
            {renderItem(item)}
          </div>
        ))}
      </SliderContent>
    </CustomSlider>
  );
};

export default Slider;
