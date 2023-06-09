import { NextApiRequest, NextApiResponse } from "next";

import { createOrder } from "@/utils/paypal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const order = await createOrder();

  res.status(200).json(order);
}
