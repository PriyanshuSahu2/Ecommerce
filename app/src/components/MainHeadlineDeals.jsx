import React, { useState } from "react";
import { styled } from "styled-components";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 400px;
  overflow: hidden;
`;

const LeftArrow = styled(BsArrowLeftCircleFill)`
  position: absolute;
  width: 2rem;
  height: 2rem;
  color: white;
  left: 1rem;
  filter: drop-shadow(0px 0px 5px #555);
  &:hover {
    cursor: pointer;
  }
`;
const RightArrow = styled(BsArrowRightCircleFill)`
  position: absolute;
  width: 2rem;
  height: 2rem;
  color: white;
  right: 1rem;
  filter: drop-shadow(0px 0px 5px #555);
  &:hover {
    cursor: pointer;
    filter: drop-shadow(100px 111px 100px #f00000);
  }
`;
const Indicators = styled.span`
  display: flex;
  position: absolute;
  bottom: 1rem;
`;
const Indicator = styled.button`
  background-color: white;
  height: 0.2rem;
  width: 0.5rem;
  border-radius: 10%;
  border: none;
  outline: none;
  margin: 0 0.2rem;
`;
const Slide = styled.img`
  border-radius: 0.5rem;
  box-shadow: 0px 0px 7px #666;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  
`;
const SlideHidden = styled(Slide)`
  display: none;
  transform: translateX(-100%);
`;
const IndicatorInActive = styled(Indicator)`
background-color: #504e4e;
`;
const MainHeadlineDeals = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };
  return (
    <Container id="carousel" className="carousel" data-bs-ride="carousel">
      <LeftArrow onClick={prevSlide} />
      {data.map((item, idx) =>
        slide === idx ? (
          <Slide src={item.src} alt={item.alt} key={idx} className="Slide" />
        ) : (
          <SlideHidden
            src={item.src}
            alt={item.alt}
            key={idx}
            className="Slide"
          />
        )
      )}
      <RightArrow onClick={nextSlide} />
      <Indicators className="indicators">
        {data.map((_, idx) =>
          slide === idx ? (
            <Indicator
              key={idx}
              onClick={()=>{setSlide(idx)}}
              className="indicator"
            ></Indicator>
          ) : (
            <IndicatorInActive
              key={idx}
              onClick={()=>{setSlide(idx)}}
              className="indicator"
            ></IndicatorInActive>
          )
        )}
      </Indicators>
    </Container>
  );
};

export default MainHeadlineDeals;
