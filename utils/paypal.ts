const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const baseUrl = process.env.PAYPAL_BASE_URL;

// a util to get access token from PayPal rest api.
export async function generateAccessToken(): Promise<string> {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

// a util to create a new order on PayPal rest API.
export async function createOrder() {
  const accessToken = await generateAccessToken();
  const url = `${baseUrl}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
      application_context: {
        return_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
      },
    }),
  });
  const data = await response.json();
  return data;
}

// a util to capture a payment approved by user.
export async function capturePayment(orderId: string) {
  const accessToken = await generateAccessToken();
  const url = `${baseUrl}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}
