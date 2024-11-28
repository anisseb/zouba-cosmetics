export const CATEGORIES = [
  {
    id: '1',
    name: 'Beauty',
    image: 'https://picsum.photos/204',
    subCategories: [
      { id: '1-1', name: 'Makeup', parentId: '1' },
      { id: '1-2', name: 'Perfumes', parentId: '1' },
      { id: '1-3', name: 'Personal Care', parentId: '1' },
      { id: '1-4', name: 'Health', parentId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Electronics',
    image: 'https://picsum.photos/205',
    subCategories: [
      { id: '2-1', name: 'Smartphones', parentId: '2' },
      { id: '2-2', name: 'Laptops', parentId: '2' },
      { id: '2-3', name: 'Accessories', parentId: '2' },
    ],
  },
  {
    id: '3',
    name: 'Fashion',
    image: 'https://picsum.photos/206',
    subCategories: [
      { id: '3-1', name: 'Women', parentId: '3' },
      { id: '3-2', name: 'Men', parentId: '3' },
      { id: '3-3', name: 'Kids', parentId: '3' },
    ],
  },
];