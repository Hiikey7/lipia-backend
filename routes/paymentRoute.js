const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await axios.post(
      "https://lipia-online.vercel.app/api/v2.1.0/payments/till",
      {
        phone,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LIPIA_API_KEY}`,
        },
      }
    );

    res.json({
      success: true,
      message: response.data.message,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Payment error (full):",
      error?.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message || "Unknown error",
    });
  }
});

module.exports = router;
