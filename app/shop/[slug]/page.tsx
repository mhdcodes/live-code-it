import Navbar from "@/app/components/Navbar";
import { PayPalButton } from "@/app/components/payments";

export default function Product() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-48 bg-base-200">
      <Navbar />
      <div className="hero min-h-full gap-24">
        <div className="hero-content flex-col lg:flex-row gap-8 items-start">
          <img
            src="/images/product-1.jpeg"
            className="max-w-sm rounded-lg shadow-2xl object-cover"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Jello (Summer Collection)
              <span className="badge badge-secondary align-middle ml-4">
                $87.24
              </span>
            </h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reprehenderit maxime quo officia non temporibus iste asperiores
              labore aut rem vero optio possimus, a dolorem quidem eius officiis
              voluptatem, laborum assumenda? Lorem ipsum dolor sit, amet
            </p>
            <PayPalButton />
          </div>
        </div>
      </div>
    </main>
  );
}
