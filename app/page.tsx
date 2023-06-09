import Link from "next/link";
import slugify from "slugify";
import Navbar from "./components/Navbar";

const products = [
  {
    id: 1,
    name: "Jello - Summer Collection",
    description:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu.",
    price: "$63.87",
  },
  {
    id: 2,
    name: "Brie - Winter Collection",
    description:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at.",
    price: "$24.04",
  },
  {
    id: 3,
    name: "Seabream - Spring Collection",
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    price: "$43.90",
  },
  {
    id: 4,
    name: "Wine - Special Collection",
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    price: "$87.24",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 bg-base-200">
      <Navbar />
      <div className="flex flex-row gap-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
          />
        ))}
      </div>
    </main>
  );
}

type Props = {
  id: number;
  name: string;
  description: string;
};
const ProductCard = ({ id, name, description }: Props) => (
  <div className="card card-compact w-96 bg-base-100 shadow-xl">
    <figure>
      <img
        src={`/images/product-${id}.jpeg`}
        alt={name}
        className="object-cover aspect-video"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{name}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        <Link
          className="btn btn-primary"
          href={`/shop/${slugify(name).toLowerCase()}`}
        >
          Buy Now
        </Link>
      </div>
    </div>
  </div>
);
