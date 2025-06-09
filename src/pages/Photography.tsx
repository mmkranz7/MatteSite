import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "../pages/PageWrapper";
import "../Styles/Photography.css";
import { getDistinctTopAndBottomTape } from "../utils/tapeOptions";

import photo1 from "../assets/Photography/Balconies1BW_1.2.1.jpg";
import photo2 from "../assets/Photography/Leaves1BW_1.1.1.jpg";
import photo3 from "../assets/Photography/Leaves2BW_1.5.1.jpg";
import photo4 from "../assets/Photography/Roses1BW_1.3.1.jpg";
import photo5 from "../assets/Photography/Skylight1BW_1.4.1.jpg";
import photo6 from "../assets/Photography/Sprout1BW_1.7.1.jpg";
import photo7 from "../assets/Photography/Tosia1BW_1.6.1.jpg";
import photo8 from "../assets/Photography/Maciej1BW_1.8.1.jpg";

const images = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

const Photography: React.FC = () => {
  const [tapePairs, setTapePairs] = useState<{ top: any; bottom: any }[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newTapes = images.map(() => getDistinctTopAndBottomTape());
    setTapePairs(newTapes);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (galleryRef.current && firstImageRef.current) {
        const container = galleryRef.current;
        const firstImg = firstImageRef.current;
        const offsetLeft = firstImg.offsetLeft;
        const imgWidth = firstImg.offsetWidth;
        const containerWidth = container.offsetWidth;

        container.scrollLeft = offsetLeft - (containerWidth - imgWidth) / 2;
      }
    }, 100); // delay to let layout settle

    return () => clearTimeout(timer);
  }, [tapePairs]);

  return (
    <PageWrapper>
      <div className="photography-page">
        <div className="photo-gallery-scrollable" ref={galleryRef}>
          {images.map((img, index) => {
            const top = tapePairs[index]?.top;
            const bottom = tapePairs[index]?.bottom;

            return (
              <div
                key={index}
                className="photo-wrapper-scroll"
                ref={index === 0 ? firstImageRef : null}
              >
                <div className="photo-img-container">
                  <img
                    src={img}
                    alt={`Photo ${index + 1}`}
                    className="photo-img-scroll"
                  />
                  {top && (
                    <img
                      src={top.src}
                      alt="Top tape"
                      className="tape-overlay"
                      style={{
                        transform: `rotate(${top.rotation})`,
                        top: top.top,
                        left: top.left,
                      }}
                    />
                  )}
                  {bottom && (
                    <img
                      src={bottom.src}
                      alt="Bottom tape"
                      className="tape-overlay"
                      style={{
                        transform: `rotate(${bottom.rotation})`,
                        bottom: bottom.bottom,
                        right: bottom.right,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Photography;
