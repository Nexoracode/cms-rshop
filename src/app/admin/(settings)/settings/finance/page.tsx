"use client"

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";

// UI atoms / layout
import BaseCard from "@/components/ui/BaseCard";
import CardHeader from "@/components/common/Card/CardHeader";

// Hero UI Table
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";

// charts
const MiniChart = dynamic(() => import("@/components/ui/charts/MiniChart"), { ssr: false });

// icons
import { PiMoneyWavyBold } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbWorldSearch } from "react-icons/tb";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiCoupon2Line } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";

// helpers
const monthsFa = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const formatCurrency = (v: number) =>
  v.toLocaleString("fa-IR", { style: "currency", currency: "IRR", maximumFractionDigits: 0 });

function exportToCSV(filename: string, rows: any[], columns: string[]) {
  if (!rows || !rows.length) return;
  const header = columns.join(",") + "";
  const csv = rows
    .map((row) => columns.map((col) => {
      const val = row[col] ?? "";
      if (typeof val === "string") return `"${val.replace(/"/g, '""')}"`;
      return val;
    }).join(","))
    .join("");
  const blob = new Blob([header + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// ---------- Full standard mock dataset ----------
const revenueSeries = monthsFa.map((name, i) => ({ name, value: [6000000,5200000,5800000,6100000,5400000,5900000,6500000,6800000,7000000,6300000,6600000,66505580][i] ?? 4000000 }));

const ordersTable = [
  { id: "O-1001", createdAt: "2025-01-10", revenue: 450000, discount: 20000, shipping: 15000, fees: 5000, profit: 410000, status: "completed" },
  { id: "O-1002", createdAt: "2025-01-12", revenue: 320000, discount: 0, shipping: 12000, fees: 4000, profit: 304000, status: "processing" },
  { id: "O-1003", createdAt: "2025-01-15", revenue: 150000, discount: 5000, shipping: 8000, fees: 2000, profit: 135000, status: "cancelled" },
  { id: "O-1004", createdAt: "2025-02-02", revenue: 980000, discount: 100000, shipping: 25000, fees: 10000, profit: 845000, status: "completed" },
  { id: "O-1005", createdAt: "2025-02-10", revenue: 210000, discount: 0, shipping: 10000, fees: 5000, profit: 195000, status: "completed" },
];

const refundsTable = [
  { id: "R-000", order: "O-1000", amount: 507723, reason: "معیوب" },
  { id: "R-001", order: "O-1001", amount: 88915, reason: "عدم رضایت" },
  { id: "R-002", order: "O-1002", amount: 401503, reason: "ارسال اشتباه" },
  { id: "R-003", order: "O-1003", amount: 513756, reason: "معیوب" },
  { id: "R-004", order: "O-1004", amount: 63038, reason: "عدم رضایت" },
  { id: "R-005", order: "O-1005", amount: 529052, reason: "ارسال اشتباه" },
];

const couponsTable = [
  { id: "C-1", code: "WELCOME10", uses: 123, amount: 12000000 },
  { id: "C-2", code: "SUMMER50", uses: 45, amount: 8500000 },
  { id: "C-3", code: "FREESHIP", uses: 210, amount: 5600000 },
];

const settlementsTable = [
  { id: "S-2025-10-01", date: "2025-10-28", amount: 32000000, status: "پرداخت‌شده" },
  { id: "S-2025-09-01", date: "2025-09-28", amount: 28000000, status: "در انتظار" },
];

const paymentMethodsTable = [
  { id: "P-1", method: "درگاه پرداخت", success: 3400, failed: 450, totalAmount: 52000000 },
  { id: "P-2", method: "پرداخت در محل", success: 600, failed: 80, totalAmount: 3200000 },
  { id: "P-3", method: "کیف پول", success: 253, failed: 12, totalAmount: 1200000 },
];

const taxSummary = {
  period: `${monthsFa[0]} - ${monthsFa[11]}`,
  totalTax: 5500000,
  breakdown: [
    { id: "T-1", name: "VAT", amount: 3500000 },
    { id: "T-2", name: "Sales Tax", amount: 2000000 },
  ],
};

// ---------- Component ----------
export default function Finance() {
  const [page, setPage] = useState(1);

  // KPI values (exact numbers you provided)
  const KPI_VALUES = {
    totalRevenue: 66505580,
    netRevenue: 61185135,
    grossMarginPercent: 92,
    successfulPayments: 4253,
    failedPercent: 12,
    refundsTotal: 1330111,
    refundsCount: 6,
    aov: 328952,
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold">گزارشات مالی</h1>
      </div>

      {/* KPI rows: 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">درآمد کل</div>
              <div className="text-xl font-semibold">{formatCurrency(KPI_VALUES.totalRevenue)}</div>
              <div className="text-xs text-gray-400">در {monthsFa[0]} - {monthsFa[11]}</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-50 to-white rounded-lg">
              <PiMoneyWavyBold className="text-2xl text-green-600" />
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">درآمد خالص</div>
              <div className="text-xl font-semibold">{formatCurrency(KPI_VALUES.netRevenue)}</div>
              <div className="text-xs text-gray-400">پس از تخفیف و مرجوعی</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-emerald-50 to-white rounded-lg">
              <MdOutlineAttachMoney className="text-2xl text-emerald-600" />
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">سود ناخالص</div>
              <div className="text-xl font-semibold">{KPI_VALUES.grossMarginPercent}%</div>
              <div className="text-xs text-gray-400">نسبت درآمد خالص به ناخالص</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-50 to-white rounded-lg">
              <GiProfit className="text-2xl text-yellow-600" />
            </div>
          </div>
        </BaseCard>
      </div>

      {/* second KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">پرداخت‌های موفق</div>
              <div className="text-xl font-semibold">{KPI_VALUES.successfulPayments.toLocaleString()}</div>
              <div className="text-xs text-gray-400">خطاها: {KPI_VALUES.failedPercent}%</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg">
              <FiUsers className="text-2xl text-blue-600" />
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">مرجوعی‌ها</div>
              <div className="text-xl font-semibold">{formatCurrency(KPI_VALUES.refundsTotal)}</div>
              <div className="text-xs text-gray-400">تعداد: {KPI_VALUES.refundsCount}</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-50 to-white rounded-lg">
              <BiMoneyWithdraw className="text-2xl text-red-500" />
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">میانگین ارزش سفارش</div>
              <div className="text-xl font-semibold">{formatCurrency(KPI_VALUES.aov)}</div>
              <div className="text-xs text-gray-400">AOV</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg">
              <TbWorldSearch className="text-2xl text-gray-700" />
            </div>
          </div>
        </BaseCard>
      </div>

      {/* Sales trend full row */}
      <div>
        <BaseCard bodyClassName="p-4">
          <CardHeader title="روند فروش (۱۲ ماه)" icon={<HiOutlineDocumentText className="text-[20px]" />} />
          <div className="mt-4">
            <MiniChart data={revenueSeries} />
          </div>
        </BaseCard>
      </div>

      {/* Two-per-row boxes: Refunds, Discounts, Settlements */}
      <div className="grid grid-cols-1 gap-4">
        <BaseCard>
          <CardHeader title="Refund / Return Report" icon={<BiMoneyWithdraw />} />
          <div className="p-4">
            <Table aria-label="refunds" isStriped>
              <TableHeader>
                <TableColumn key="id">Refund ID</TableColumn>
                <TableColumn key="order">Order</TableColumn>
                <TableColumn key="amount">Amount</TableColumn>
                <TableColumn key="reason">Reason</TableColumn>
              </TableHeader>
              <TableBody items={refundsTable}>
                {(item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.order}</TableCell>
                    <TableCell>{formatCurrency(item.amount)}</TableCell>
                    <TableCell>{item.reason}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="mt-3 flex items-center justify-end gap-2">
              <button className="px-3 py-1 border rounded text-sm" onClick={() => exportToCSV('refunds.csv', refundsTable, ['id','order','amount','reason'])}><FiDownload /> Export CSV</button>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <CardHeader title="Discounts & Coupons" icon={<RiCoupon2Line />} />
          <div className="p-4">
            <Table aria-label="coupons" isStriped>
              <TableHeader>
                <TableColumn key="code">کد</TableColumn>
                <TableColumn key="uses">تعداد استفاده</TableColumn>
                <TableColumn key="amount">مبلغ تخفیف</TableColumn>
              </TableHeader>
              <TableBody items={couponsTable}>
                {(item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.uses}</TableCell>
                    <TableCell>{formatCurrency(item.amount)}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="mt-3 flex items-center justify-end gap-2">
              <button className="px-3 py-1 border rounded text-sm" onClick={() => exportToCSV('coupons.csv', couponsTable, ['id','code','uses','amount'])}><FiDownload /> Export CSV</button>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <CardHeader title="Settlement / Payouts" icon={<BiMoneyWithdraw />} />
          <div className="p-4">
            <Table aria-label="settlements" isStriped>
              <TableHeader>
                <TableColumn key="id">Settlement</TableColumn>
                <TableColumn key="date">Date</TableColumn>
                <TableColumn key="amount">Amount</TableColumn>
                <TableColumn key="status">Status</TableColumn>
              </TableHeader>
              <TableBody items={settlementsTable}>
                {(item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{formatCurrency(item.amount)}</TableCell>
                    <TableCell>
                      <div className={`text-xs px-2 py-1 rounded ${item.status === 'پرداخت‌شده' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        {item.status}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="mt-3 flex items-center justify-end gap-2">
              <button className="px-3 py-1 border rounded text-sm" onClick={() => exportToCSV('settlements.csv', settlementsTable, ['id','date','amount','status'])}><FiDownload /> Export CSV</button>
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Mark paid</button>
            </div>
          </div>
        </BaseCard>
      </div>

      {/* Payment reports (full width card) */}
      <BaseCard>
        <CardHeader title="Payment Reports" icon={<HiOutlineDocumentText />} />
        <div className="p-4">
          <Table aria-label="payments" isStriped>
            <TableHeader>
              <TableColumn key="method">Method</TableColumn>
              <TableColumn key="success">Success</TableColumn>
              <TableColumn key="failed">Failed</TableColumn>
              <TableColumn key="amount">Total Amount</TableColumn>
            </TableHeader>
            <TableBody items={paymentMethodsTable}>
              {(item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.method}</TableCell>
                  <TableCell>{item.success.toLocaleString()}</TableCell>
                  <TableCell>{item.failed.toLocaleString()}</TableCell>
                  <TableCell>{formatCurrency(item.totalAmount)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </BaseCard>

      {/* Tax summary */}
      <BaseCard>
        <CardHeader title={`Tax Summary — ${taxSummary.period}`} icon={<PiMoneyWavyBold />} />
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <div className="text-sm text-gray-500">مجموع مالیات</div>
            <div className="text-xl font-semibold">{formatCurrency(taxSummary.totalTax)}</div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-2">
              {taxSummary.breakdown.map((b) => (
                <div key={b.id} className="flex items-center justify-between">
                  <div className="text-sm">{b.name}</div>
                  <div className="text-sm font-medium">{formatCurrency(b.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseCard>

    </div>
  );
}
