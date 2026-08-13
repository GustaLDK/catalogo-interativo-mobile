import ProductList from '../../src/components/ProductList';

export default function FemininoScreen() {
  return (
    <ProductList
      titulo="Produtos Femininos"
      categorias={[
        'womens-bags',
        'womens-dresses',
        'womens-jewellery',
        'womens-shoes',
        'womens-watches',
      ]}
    />
  );
}