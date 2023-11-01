import Link from "next/link";

import { MainNav, MobileNav, NavbarActions } from "@/components";
import { Container } from "@/components/ui";
import { getCategories } from "@/actions";

// export const revalidate = 0;

const Navbar = async () => {

  const categories = await getCategories();
  // console.log(categories);
  // console.log(categories[0]);

  return (
    <div className="border-b bg-softBG">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl text-primary">STORE</p>
          </Link>
          <MainNav data={categories} />
          <MobileNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;