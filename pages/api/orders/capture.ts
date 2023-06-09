import { NextApiRequest, NextApiResponse } from "next";

import { capturePayment } from "@/utils/paypal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderID } = req.body;

  const capturedOrder = await capturePayment(orderID);

  res.status(200).json(capturedOrder);
}
