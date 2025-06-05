export function calculateEarnings(formData) {
  const {
    isGross,
    monthlyRate,
    unpaidDaysOff,
    taxForm,
    commuteCount,
    commuteDistance,
    reliefs,
  } = formData;

  console.log("Form Data (js):", formData);

  const parsedMonthlyRate = parseFloat(monthlyRate) || 0;
  const unpaidDays = parseInt(unpaidDaysOff) || 0;
  const commuteTrips = parseInt(commuteCount) || 0;
  const distance = parseFloat(commuteDistance) || 0;

  // 1. Podstawy
  const workingDays = 20;
  const dailyRate = parsedMonthlyRate / workingDays;
  const deductionForUnpaidDays = unpaidDays * dailyRate;
  const incomeAfterUnpaid = isGross
    ? parsedMonthlyRate - deductionForUnpaidDays
    : parsedMonthlyRate;

  // 2. Dojazdy
  const commuteCostPerKm = 0.89; // stawka za km w 2024 (fikcyjna)
  const commuteCost = commuteTrips * distance * 2 * commuteCostPerKm;

  // 3. Składki ZUS (fikcyjne wartości)
  let zus = 1600; // standard ZUS
  if (reliefs.startupRelief) zus = 0;
  else if (reliefs.smallZUS) zus = 400;
  else if (reliefs.smallZUSPlus) zus = 800;

  // 4. VAT (23%)
  let vat = 0;
  if (reliefs.isVatPayer) {
    vat = parsedMonthlyRate * 0.23;
  }

  // 5. Podatek dochodowy (upraszczamy)
  let tax = 0;
  let taxableBase = incomeAfterUnpaid - zus;

  if (taxForm === "progresywny") {
    // koszty uzyskania: 250 zł/mc
    if (reliefs.useCosts) taxableBase -= 250;

    if (reliefs.youthRelief) {
      tax = 0;
    } else {
      tax =
        taxableBase <= 120000 / 12
          ? taxableBase * 0.12
          : 14400 + (taxableBase - 10000) * 0.32;
    }
  }

  if (taxForm === "liniowy") {
    if (reliefs.useCosts) taxableBase -= 250;
    if (reliefs.ipBox) {
      tax = taxableBase * 0.05;
    } else {
      tax = taxableBase * 0.19;
    }
  }

  if (taxForm === "ryczalt") {
    tax = parsedMonthlyRate * 0.15;
  }

  // 6. Netto i brutto
  const grossIncome = isGross ? parsedMonthlyRate : parsedMonthlyRate + vat;
  console.log(vat);

  return {
    netIncome: parsedMonthlyRate.toFixed(2),
    grossIncome: grossIncome.toFixed(2),
    socialSecurity: zus.toFixed(2),
    incomeTax: tax.toFixed(2),
    vat: vat.toFixed(2),
    commuteCost: commuteCost.toFixed(2),
    grossIncomeWithVat: grossIncome.toFixed(2),
  };
}
