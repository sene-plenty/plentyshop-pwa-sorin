import {Product} from '@vue-storefront/plentymarkets-api';

export function productImageFilter(product: Product): { small: string, normal: string, big: string }[] {
  if (!product) {
    return [
      {
        small: '',
        normal: '',
        big: ''
      }
    ];
  }

  const images = product.images;
  const imagesAccessor = images.variation?.length ? 'variation' : 'all';
  const result = [];

  images[imagesAccessor].forEach(image => {
    result.push({
      small: image.urlPreview || image.urlMiddle,
      normal: image.urlMiddle,
      big: image.url || image.urlMiddle,
      position: image.position
    });
  });

  return result;
}
