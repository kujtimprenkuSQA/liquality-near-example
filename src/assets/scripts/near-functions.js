/**
 * Copied useful format functions from near-api-js normally you would import near-api-js package
 * https://github.com/near/near-api-js/blob/master/src/utils/format.ts#L53
 * */

const NEAR_NOMINATION_EXP = 24;

const trimLeadingZeroes = (value) => {
  value = value.replace(/^0+/, "");
  if (value === "") {
    return "0";
  }
  return value;
};

const cleanupAmount = (amount) => {
  return amount.replace(/,/g, "").trim();
};

const parseNearAmount = (amt) => {
  if (!amt) {
    return null;
  }
  amt = cleanupAmount(amt);
  const split = amt.split(".");
  const wholePart = split[0];
  const fracPart = split[1] || "";
  if (split.length > 2 || fracPart.length > NEAR_NOMINATION_EXP) {
    throw new Error(`Cannot parse '${amt}' as NEAR amount`);
  }
  return trimLeadingZeroes(
    wholePart + fracPart.padEnd(NEAR_NOMINATION_EXP, "0")
  );
};
