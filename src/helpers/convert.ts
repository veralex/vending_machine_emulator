export const convert = (value: string | number): number | string | never => {
  const error = new Error("Value doesn't match format");

  switch (typeof value) {
    case "string":
      const num = value.match(/\d+\.\d{2}/);
      if (!num) throw error;
      return parseFloat(num[0]) * 100;
    case "number":
      return (value / 100).toFixed(2);
    default:
      throw error;
  }
};
