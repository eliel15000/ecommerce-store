// import getBillboard from "@/actions/get-billboard";
// import getProducts from "@/actions/get-products";

import { getBillboard, getProducts } from "@/actions";
import { Billboard, ProductList } from "@/components";
import { Container } from "@/components/ui";

export const revalidate = 0;

const HomePage = async () => {

  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("8ed1e966-9a7e-4c16-b7ea-e4857e75a323");

  const shuffledProducts = products
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

  return (
    <div>
      <div className="absolute lg:bg-grayBG h-96 w-full -z-10" />
      <Container>
        <div className="space-y-10 pb-10">
          <Billboard data={billboard} />
        
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={shuffledProducts} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;