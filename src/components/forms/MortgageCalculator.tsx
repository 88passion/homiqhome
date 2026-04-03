"use client";

import { useMemo, useState } from "react";

const DEFAULT_PRICE = 3_500_000;
const DEFAULT_DOWN_PAYMENT = 15;
const DEFAULT_INTEREST_RATE = 6.5;
const DEFAULT_YEARS = 30;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  if (principal <= 0 || totalMonths <= 0) return 0;
  if (monthlyRate === 0) return principal / totalMonths;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
}

export function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(DEFAULT_PRICE);
  const [downPaymentPercent, setDownPaymentPercent] = useState(DEFAULT_DOWN_PAYMENT);
  const [interestRate, setInterestRate] = useState(DEFAULT_INTEREST_RATE);
  const [loanYears, setLoanYears] = useState(DEFAULT_YEARS);
  const [monthlyIncome, setMonthlyIncome] = useState(120_000);

  const result = useMemo(() => {
    const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = Math.max(propertyPrice - downPaymentAmount, 0);
    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanYears);
    const totalMonths = loanYears * 12;
    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = Math.max(totalPayment - loanAmount, 0);
    const incomeRatio = monthlyIncome > 0 ? (monthlyPayment / monthlyIncome) * 100 : 0;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyPayment,
      totalInterest,
      incomeRatio,
    };
  }, [downPaymentPercent, interestRate, loanYears, monthlyIncome, propertyPrice]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm md:p-8">
        <div>
          <h2 className="text-xl font-semibold text-black md:text-2xl">คำนวณวงเงินและค่างวดเบื้องต้น</h2>
          <p className="mt-2 text-sm leading-relaxed text-black/70 md:text-base">
            ใช้สำหรับประเมินเบื้องต้นก่อนตัดสินใจซื้อจริง ตัวเลขอาจเปลี่ยนตามเงื่อนไขธนาคาร รายได้
            และประวัติทางการเงินของผู้กู้
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-black">ราคาทรัพย์ (บาท)</span>
            <input
              type="number"
              min={0}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-black">เงินดาวน์ (%)</span>
            <input
              type="number"
              min={0}
              max={100}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-black">ดอกเบี้ยต่อปี (%)</span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-black">ระยะเวลากู้ (ปี)</span>
            <select
              value={loanYears}
              onChange={(e) => setLoanYears(Number(e.target.value) || DEFAULT_YEARS)}
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            >
              {[10, 15, 20, 25, 30].map((year) => (
                <option key={year} value={year}>
                  {year} ปี
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-medium text-black">รายได้ต่อเดือน (บาท) — สำหรับดูภาระผ่อน</span>
          <input
            type="number"
            min={0}
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
            className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          />
        </label>
      </section>

      <aside className="rounded-2xl border border-black/8 bg-[var(--muted-bg)] p-5 md:p-8">
        <h3 className="text-lg font-semibold text-black md:text-xl">ผลการคำนวณโดยประมาณ</h3>
        <div className="mt-5 space-y-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-black/60">เงินดาวน์</p>
            <p className="mt-1 text-xl font-semibold text-black md:text-2xl">{formatCurrency(result.downPaymentAmount)}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-black/60">วงเงินกู้โดยประมาณ</p>
            <p className="mt-1 text-xl font-semibold text-black md:text-2xl">{formatCurrency(result.loanAmount)}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-black/60">ค่างวดต่อเดือน</p>
            <p className="mt-1 text-2xl font-semibold text-black md:text-3xl">{formatCurrency(result.monthlyPayment)}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-black/60">ดอกเบี้ยรวมโดยประมาณ</p>
              <p className="mt-1 text-base font-semibold text-black md:text-lg">{formatCurrency(result.totalInterest)}</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-black/60">ค่างวดคิดเป็น</p>
              <p className="mt-1 text-base font-semibold text-black md:text-lg">{result.incomeRatio.toFixed(1)}% ของรายได้/เดือน</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-black/15 bg-white p-4 text-sm leading-relaxed text-black/70">
          ตัวเลขนี้เป็นเพียงการประเมินเบื้องต้น หากต้องการให้ช่วยดูงบที่เหมาะสมหรือวางแผนซื้อจริง
          สามารถส่งรายละเอียดมาให้ทีมงานช่วยประเมินต่อได้
        </div>
      </aside>
    </div>
  );
}
