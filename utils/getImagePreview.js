const getImageSrc = (image, size) => {
  if (image) {
    if (image.media_details.sizes[`${size}`]) {
      return image.media_details.sizes[`${size}`].source_url;
    }
    if (image.source_url) {
      return image.source_url;
    }
  }
  return "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png";
};

const getImageDimensions = (image, size) => {
  if (image) {
    if (image.media_details.sizes[`${size}`]) {
      return {
        height: image.media_details.sizes[`${size}`].height,
        width: image.media_details.sizes[`${size}`].width,
      };
    }
    if (image.source_url) {
      return {
        height: image.media_details.height,
        width: image.media_details.width,
      };
    }
  }
  return {
    height: 630,
    width: 1200,
  };
};

export default getImageSrc;
export { getImageDimensions };
