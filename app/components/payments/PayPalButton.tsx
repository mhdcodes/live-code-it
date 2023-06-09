"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useScript } from "usehooks-ts";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

type paymentSuccessHandler = (data: any) => void;

export const PayPalButton = () => {
  const router = useRouter();
  const status = useScript(
    `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`,
    { removeOnUnmount: true }
  );

  useEffect(() => {
    if (status === "ready") renderPayPalButtons();
  }, [status]);

  const renderPayPalButtons = () => {
    if (window !== undefined && (window as any).paypal !== undefined) {
      (window as any).paypal
        .Buttons({
          style: {
            disableMaxWidth: true,
            layout: "vertical",
          },
          createOrder: createOrder,
          onApprove: (data: { orderID: string }) =>
            approvePayment(data.orderID, onPaymentSuccess),
        })
        .render("#paypal-button-container");
    }
  };

  // method that runs on payment success
  const onPaymentSuccess = (order: any) => {
    console.log("Captured order", order, JSON.stringify(order, null, 2));

    router.push("/thank-you");
    return;
  };

  return <div id="paypal-button-container" className="bg-base-200 mt-1"></div>;
};

// Creates an order on the backend
// and returns an order id
function createOrder() {
  return fetch("/api/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart: [
        {
          sku: "jello-summer-2023",
          quantity: "1",
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((order) => order.id);
}

function approvePayment(orderId: string, handleSuccess: paymentSuccessHandler) {
  return fetch("/api/orders/capture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: orderId,
    }),
  })
    .then((response) => response.json())
    .then(handleSuccess);
}
