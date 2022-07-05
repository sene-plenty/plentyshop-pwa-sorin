import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import type { Review, ReviewItem } from '@vue-storefront/plentymarkets-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(review: Review): ReviewItem[] {
  return review.feedbacks;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewId(item: ReviewItem): string {
  return item.id.toString();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewAuthor(item: ReviewItem): string {
  return item.authorName;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewMessage(item: ReviewItem): string {
  return item.feedbackComment.comment.message;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewRating(item: ReviewItem): number {
  return Number(item.feedbackRating.rating.ratingValue);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewDate(item: ReviewItem): string {
  return new Date(item.feedbackComment.comment.createdAt).toDateString();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(review: Review): number {
  return Number(review.counts.ratingsCountTotal);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(review: Review): number {
  return Number(review.counts.averageValue);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRatesCount(review: Review): AgnosticRateCount[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewsPage(review: Review): number {
  return 0;
}

export const reviewGetters: ReviewGetters<Review, ReviewItem> = {
  getItems,
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate,
  getTotalReviews,
  getAverageRating,
  getRatesCount,
  getReviewsPage
};
