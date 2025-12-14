import 'strict-vue-router';

declare module 'strict-vue-router' {
  interface CustomRouteMap {
    shop: CustomRouteInfo<['/'], ['/'], 'Shop'>;

    cart: CustomRouteInfo<['/cart'], ['/cart'], 'Cart'>;

    wishlist: CustomRouteInfo<['/wishlist'], ['/wishlist'], 'Wishlist'>;

    receipts: CustomRouteInfo<['/receipts'], ['/receipts'], 'receipts'>;

    profile: CustomRouteInfo<['/profile'], ['/profile'], 'Profile'>;

    product: CustomRouteInfo<
      ['/products', ':product_id'],
      ['/products', ':product_id'],
      'Product',
      'Product <[product_id]>',
      never,
      { product_id: string }
    >;
  }
}
