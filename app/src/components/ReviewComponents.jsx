import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { CiStar } from "react-icons/ci";
import CustomerReviewsComponent from "./CustomerReviewsComponent";
import { publicRequest, userRequest } from "../requestMethod";

const Container = styled.div`
  width: 100%;
  position: relative;
  background: #fff;
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const ReviewDetailsContainer = styled.div``;

const ReviewsContainer = styled.div`
  margin-top: 22px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px 30px;
`;

const BottomContainer = styled.div`
  margin-top: 50px;
`;

const HeadingContainer = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
  color: #282c3f;
`;

const AverageRatingContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 48px !important;
`;

const Star = styled(TiStarFullOutline)`
  margin: 0px 2px;
  color: #ff3f6c;
  font-size: 42px;
  cursor: pointer;
`;

const AverageRatingStar = styled(Star)`
  font-size: 40px;
`;

const EmptyStar = styled(CiStar)`
  color: #ff3f6c;
  cursor: pointer;
  font-size: 42px;
`;

const AddReviewContainer = styled.div`
  margin-left: 20px;
`;

const RatingReview = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  margin-top: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
`;

const VerticalSeperator = styled.div`
  margin-left: 34px;
  height: 96px;
  border-left: 1.2px solid #eaeaec;
`;

const SubmitButton = styled.button`
  margin-left: 8px;
  padding: 8px 16px;
  border: none;
  border: 1px solid #ff3e6c;
  background-color: #ff3f6c;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
`;

const CancelButton = styled(SubmitButton)`
  background-color: white;
  color: #282c3f;
  border: 1px solid #d4d5d9;
`;

const ReviewComponents = ({ productId, averageRating }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isTextAreaVisible, setTextAreaVisible] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
    setTextAreaVisible(true);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleCancelClick = () => {
    setRating(0);
    setReview("");
    setTextAreaVisible(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform submit logic here
    const response = userRequest.post("reviews/", {
      customerName: "Priyanshu Sahu",
      rating: rating,
      review: review,
      productId: productId,
    });
    
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} onClick={() => handleRatingClick(i)} />);
      } else {
        stars.push(<EmptyStar key={i} onClick={() => handleRatingClick(i)} />);
      }
    }

    return stars;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getProductReviews = async () => {
      try {
        const response = await publicRequest("reviews/" + productId);
        console.log(response.data.reviews);
        setReviews(response.data.reviews); // Access the `data` property of the response
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };

    getProductReviews(); // Call the `getProducts` function
  }, [productId]);
  return (
    <Container>
      <Wrapper>
        <TopContainer>
          <ReviewDetailsContainer>
            <HeadingContainer>Ratings</HeadingContainer>
            <AverageRatingContainer>
              <span>{averageRating?.toFixed(1)}</span>
              <AverageRatingStar />
            </AverageRatingContainer>
          </ReviewDetailsContainer>
          <VerticalSeperator />
          <AddReviewContainer>
            <HeadingContainer>Add your rating:</HeadingContainer>
            <RatingReview>
              <div>{renderStars()}</div>
              <ReviewTextArea
                placeholder="Write your review..."
                value={review}
                onChange={handleReviewChange}
                show={isTextAreaVisible}
              />
              {isTextAreaVisible && (
                <ButtonContainer>
                  <SubmitButton onClick={handleFormSubmit}>Submit</SubmitButton>
                  <CancelButton onClick={handleCancelClick}>
                    Cancel
                  </CancelButton>
                </ButtonContainer>
              )}
            </RatingReview>
          </AddReviewContainer>
        </TopContainer>
        <hr />
        <BottomContainer>
          <HeadingContainer>Customer Reviews</HeadingContainer>
          <ReviewsContainer>
            {reviews.map((data) => {
              return <CustomerReviewsComponent data={data} />;
            })}
          </ReviewsContainer>
        </BottomContainer>
      </Wrapper>
    </Container>
  );
};

export default ReviewComponents;
