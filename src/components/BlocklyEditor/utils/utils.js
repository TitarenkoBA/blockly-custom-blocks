export function getValue(block, field) {
  return block.getFieldValue(field).trim() || null;
};

export function validateEmail(email) {
  // eslint-disable-next-line
  const reg = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
  return reg.test(email) ? email : null;
};

export function validateObj(obj) {
  let err = "";
  let count = 0;
  Object.keys(obj).forEach((key) => {
    if (obj[key] && obj[key] !== "NONE") {
      count++;
    } else {
      err += "Error: wrong " + key + "!\n";
    }
  });
  return count === Object.keys(obj).length ? "OK" : err;
};