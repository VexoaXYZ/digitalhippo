export const PRODUCT_CATEGORIES = [
  {
    label: 'Scripts',
    value: 'scripts' as const,
    href: '/products?category=scripts',
    featured: [
      {
        name: 'Editor picks',
        href: `/products?category=scripts`,
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=scripts&sort=desc',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=scripts',
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },
]
