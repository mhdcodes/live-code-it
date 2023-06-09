"use client";

import { useEffect } from "react";
import { useScript } from "usehooks-ts";

const clientId =
  "AVoMscUn7LE4ZjcC15v5IDo5Nv2xofBFur7egKkVbyRw0AV6beQIt72rVMrIct0lOgOUOXVHEjmoH5BD";

export const PayPalButton = () => {
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
          onApprove: onApprove,
        })
        .render("#paypal-button-container");
    }
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

function onApprove(data: { orderID: string }) {
  return fetch("/api/orders/capture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: data.orderID,
    }),
  })
    .then((response) => response.json())
    .then((orderData) => {
      // Successful capture! For dev/demo purposes:
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2)
      );
      const transaction = orderData.purchase_units[0].payments.captures[0];
      alert(
        `Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`
      );
    });
}
