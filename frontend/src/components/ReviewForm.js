import React, { useState } from "react";
import { Rating } from 'react-simple-star-rating'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Textarea,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { createReview } from "../api/repository";

const ReviewForm = ({ isOpen, onClose, productId, userId, onSubmit }) => {
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");

  const tooltipArray = [
    "Terrible",
    "Bad",
    "Average",
    "Great",
    "Awesome"
  ];

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

  const handleSubmit = async () => {
    try {
      console.log("Submitting review data:", {
        user_id: userId,
        product_id: productId,
        rating,
        review_text: reviewText
      });

      await createReview({
        user_id: userId,
        product_id: productId,
        rating,
        review_text: reviewText,
      });
      onSubmit(); // Notify parent component of successful review submission
    } catch (error) {
      console.error("Failed to submit review:", error);
      // Handle error submission
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Write your Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Rating</FormLabel>

            <Rating
              iconsCount={5}
              onClick={handleRating}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onPointerMove={onPointerMove}
              SVGstyle={{ display: 'inline-block' }}
              size={50}
              showTooltip
              tooltipArray={tooltipArray}
            /* Available Props */
            />

          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Review</FormLabel>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSubmit} mt={4}>
            Submit Review
          </Button>



        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReviewForm;
