import Link from "next/link";
import Confetti from "../components/Confetti";

export default function ThankYou() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover"
      style={{ backgroundImage: "url(/images/bg-cover.jpg)" }}
    >
      <Confetti />
      <div className="card glass w-[800px]">
        <figure>
          <img src="/images/product-1.jpeg" alt="Jello (Summer Collection)" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-slate-600">
            Jello (Summer Collection)
          </h2>
          <p className="text-slate-600">
            Congratulations on your purchase of the stunning &apos;Jello (Summer
            Collection)&apos; shoe! You&apos;ve added a touch of style to your wardrobe.
            Enjoy wearing it with confidence!
          </p>
          <div className="card-actions justify-end">
            <Link href="/" className="btn btn-primary">
              Shope for more!
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
