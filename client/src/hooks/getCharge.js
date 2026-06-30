export const getShippingCharges = async (items, pincode, paymentType) => {
  // Future API Call

  // const res = await api.post("/shipping/calculate", {
  //   items,
  //   pincode,
  //   paymentType,
  // });

  // return res.data;

  return {
    success: true,
    shipping_charge: 40,
  };
};

export const getCodCharges = async (items, pincode, paymentType) => {
  // Future API Call

  // const res = await api.post("/shipping/cod-charge", {
  //   items,
  //   pincode,
  //   paymentType,
  // });

  // return res.data;

  return {
    success: true,
    cod_charge: paymentType === "COD" ? 50 : 0,
  };
};
