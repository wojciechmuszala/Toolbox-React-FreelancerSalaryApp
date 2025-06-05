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

  // 2. Składki ZUS (fikcyjne wartości)
  // Stałe składki ZUS na 2025 rok
  const ZUS_STANDARD = 1773.96; // Pełny ZUS z chorobowym
  const ZUS_STANDARD_NO_CHOROBOWE = 1646.47; // Pełny ZUS bez chorobowego
  const ZUS_PREFERENCYJNY = 442.9; // Preferencyjny ZUS z chorobowym
  const ZUS_PREFERENCYJNY_NO_CHOROBOWE = 408.6; // Preferencyjny ZUS bez chorobowego

  let zus = ZUS_STANDARD; // Domyślnie pełny ZUS z chorobowym

  if (reliefs.startupRelief) {
    zus = 0;
  } else if (reliefs.smallZUS) {
    zus = ZUS_PREFERENCYJNY;
  } else if (reliefs.smallZUSPlus) {
    // Dla Małego ZUS Plus należałoby obliczyć składki indywidualnie
    // Na potrzeby uproszczenia przyjmujemy wartość preferencyjną
    zus = ZUS_PREFERENCYJNY;
  }

  // 3. VAT (23%)
  let vat = 0;
  if (reliefs.isVatPayer) {
    vat = parsedMonthlyRate * 0.23;
  }

  // 4. Podatek dochodowy (upraszczamy)
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

  // 5. Netto i brutto
  const grossIncome = isGross ? parsedMonthlyRate : parsedMonthlyRate + vat;
  console.log(vat);

  return {
    netIncome: parsedMonthlyRate.toFixed(2),
    grossIncome: grossIncome.toFixed(2),
    socialSecurity: zus.toFixed(2),
    incomeTax: tax.toFixed(2),
    vat: vat.toFixed(2),
    grossIncomeWithVat: grossIncome.toFixed(2),
  };
}

export function format(amount, currency = "zł") {
  const parsed = parseFloat(amount);
  if (isNaN(parsed)) return `0,00 ${currency}`;

  return (
    parsed.toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ` ${currency}`
  );
}
