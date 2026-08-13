import ProductList from '../../src/components/ProductList';

export default function MasculinoScreen() {
  return (
    <ProductList
      titulo="Produtos Masculinos"
      categorias={[
        'mens-shirts',
        'mens-shoes',
        'mens-watches',
      ]}
    />
  );
}