import { BRANDS_QUERYResult, Category } from '../../sanity.types';


interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult
}

const Shop = ({ categories, brands }: Props) => {
  console.log(categories, brands)
  return <div>Shop</div>
}

export default Shop;