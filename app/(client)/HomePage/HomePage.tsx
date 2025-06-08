import Container from '@/components/Container';
import HomeCategories from '@/components/HomeCategories';
import ProductGrid from '@/components/ProductGrid';
import { getCategories } from '../../../sanity/queries';

const categories = await getCategories(6);

const HomePage = () => {
  return (
    <Container className="bg-shop-light-pink">
      <HomeCategories categories={categories} />
      <ProductGrid />
    </Container>
  );
};

export default HomePage;
