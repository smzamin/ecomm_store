import Shop from '@/components/Shop';
import { getAllBrands, getCategories } from '../../../sanity/queries';

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div className='w-full'>
      <Shop categories={categories} brands={brands} />
    </div>
  );
}

export default ShopPage;