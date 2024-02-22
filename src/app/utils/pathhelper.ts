export const paths = {
  home() {
    return "/";
  },
  Posts(postSlug: string) {
    return `/post/${postSlug}`;
  },
  Category(categorySlug: string) {
    if (!categorySlug) {
      return `/category`;
    }
    return `/category/${categorySlug}`;
  },
  Search() {
    return `/search`
  },
  AboutUs() {
    return `/about-us`
  }
};
