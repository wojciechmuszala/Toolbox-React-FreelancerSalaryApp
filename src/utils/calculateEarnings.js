export function calculateEarnings(formData) {
  const { isGross, monthlyRate, unpaidDaysOff, taxForm, expenses, reliefs } =
    formData;

  const parsedMonthlyRate = parseFloat(monthlyRate) || 0;
  const unpaidDays = parseInt(unpaidDaysOff) || 0;

  // 1. Podstawy
  const workingDays = 20;
  const dailyRate = parsedMonthlyRate / workingDays;
  const deductionForUnpaidDays = unpaidDays * dailyRate;
  const incomeAfterUnpaid = isGross
    ? parsedMonthlyRate - deductionForUnpaidDays
    : parsedMonthlyRate;

  // 2. Składki ZUS (fikcyjne wartości)
  const ZUS_STANDARD = 1773.96; // Pełny ZUS z chorobowym
  const ZUS_PREFERENCYJNY = 442.9; // Preferencyjny ZUS z chorobowym

  let zus = ZUS_STANDARD; // Domyślnie pełny ZUS z chorobowym

  if (reliefs.startupRelief) {
    zus = 0;
  } else if (reliefs.smallZUS) {
    zus = ZUS_PREFERENCYJNY;
  } else if (reliefs.smallZUSPlus) {
    zus = ZUS_PREFERENCYJNY;
  }

  // 3. VAT (23%)
  let vat = 0;
  if (reliefs.isVatPayer) {
    vat = parsedMonthlyRate * 0.23;
  }

  // 3.5 Koszty uzyskania przychodu z expenses
  const expensesList = Array.isArray(expenses) ? expenses : [];
  const totalExpenses = expensesList.reduce(
    (acc, item) => acc + parseFloat(item.amount || 0),
    0
  );

  // 4. Podatek dochodowy (upraszczamy)
  let tax = 0;
  let taxableBase = incomeAfterUnpaid - zus;

  if (taxForm === "progresywny") {
    taxableBase -= totalExpenses;

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
    taxableBase -= totalExpenses;
    if (reliefs.ipBox) {
      tax = taxableBase * 0.05;
    } else {
      tax = taxableBase * 0.19;
    }
  }

  if (taxForm === "ryczalt") {
    tax = parsedMonthlyRate * 0.15;
  }

  // Składka zdrowotna – uproszczenie: 9% od podstawy (tylko progresywny)
  const healthInsurance = taxForm === "progresywny" ? taxableBase * 0.09 : 0;
  zus += healthInsurance;

  // 5. Netto i brutto
  const grossIncome = isGross ? parsedMonthlyRate : parsedMonthlyRate + vat;

  // Dochód na rękę przed kosztami (netto - zus - podatek)
  const netIncomeBeforeExpenses = incomeAfterUnpaid - zus - tax;

  // Dochód na rękę po kosztach (netto - zus - podatek - koszty)
  const netIncome = netIncomeBeforeExpenses - totalExpenses;

  // Wartości netto i brutto z formularza (zawsze oba)
  const formNetIncome = isGross
    ? (parsedMonthlyRate - vat).toFixed(2)
    : parsedMonthlyRate.toFixed(2);
  const formGrossIncome = isGross
    ? parsedMonthlyRate.toFixed(2)
    : (parsedMonthlyRate + vat).toFixed(2);

  return {
    formNetIncome,
    formGrossIncome,
    netIncomeBeforeExpenses: netIncomeBeforeExpenses.toFixed(2),
    expenses: totalExpenses.toFixed(2),
    netIncome: netIncome.toFixed(2),
    grossIncome: grossIncome.toFixed(2),
    socialSecurity: zus.toFixed(2),
    incomeTax: tax.toFixed(2),
    vat: vat.toFixed(2),
    grossIncomeWithVat: grossIncome.toFixed(2),
    healthInsurance: healthInsurance.toFixed(2),
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
