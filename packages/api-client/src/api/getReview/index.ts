import { Review, ReviewSearchParams } from './../../types';
import { Context } from 'src/types';

export async function getReview(context: Context, params: ReviewSearchParams): Promise<Review> {

  const urlFeedbackStars: URL = new URL(`/rest/feedbacks/feedback/helper/counts/${params.itemId}`, context.config.api.url);
  urlFeedbackStars.searchParams.set('allowFeedbacksOnlyIfPurchased', 'false');
  urlFeedbackStars.searchParams.set('numberOfFeedbacks', '100');

  const { data: feedbackStars } = await context.client.get(urlFeedbackStars.href);

  const url: URL = new URL(`/rest/feedbacks/feedback/helper/feedbacklist/${params.itemId}/1`, context.config.api.url);
  url.searchParams.set('feedbacksPerPage', '10');

  const { data } = await context.client.get(url.href);
  return {
    ...data,
    ...feedbackStars
  };
}
