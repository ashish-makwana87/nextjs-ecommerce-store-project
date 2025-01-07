type NavLink = {
  href: string;
  label: string;
};

const NavLinks: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/cart", label: "cart" },
  { href: "/favorites", label: "favorites" },
  { href: "/orders", label: "orders" },
];

export default NavLinks;
