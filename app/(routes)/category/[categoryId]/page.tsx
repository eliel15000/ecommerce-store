import { getCategory, getColors, getProducts, getSizes } from "@/actions";
import { Billboard } from "@/components";
import { Container, NoResults, ProductCard } from "@/components/ui";

import { Filter, MobileFilters } from "./components";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    sizeId: string;
    colorId: string;
  }
};

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  
  const products = await getProducts({
    categoryId: params.categoryId,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);
  // console.log(products);

  const shuffledProducts = products
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

  return (
    // <div className="bg-white">
    <div>
      <div className="absolute lg:bg-grayBG h-96 w-full -z-10" />
      <Container>
        <Billboard data={category.billboard} />

        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Add Mobile Filters */}
            <MobileFilters sizes={sizes} colors={colors} />

            {/* General Filters */}
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {shuffledProducts.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage;