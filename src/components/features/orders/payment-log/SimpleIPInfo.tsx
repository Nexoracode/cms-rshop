import {
  MdPublic,
  MdSecurity,
  MdLocationOn,
  MdNetworkCheck,
  MdWarning,
  MdInfo,
} from "react-icons/md";
import { FaGlobeAmericas, FaNetworkWired } from "react-icons/fa";
import analyzeIP from "./analyzeIP";

// تابع analyzeIP اینجا قرار بگیرد (همان نسخه بالا)

const SimpleIPInfo = ({ ip }: { ip: string }) => {
  console.log("آدرس IP دریافتی:", ip);

  const ipInfo = analyzeIP(ip);
    console.log(ipInfo);
    
  // تشخیص امنیت بر اساس نوع IP
  const getSecurityLevel = () => {
    if (ipInfo.isPrivate || ipInfo.isLocalhost) {
      return { level: "ایمن", color: "text-green-600", bg: "bg-green-100" };
    }
    if (ipInfo.isReserved || ipInfo.type.includes("TEST")) {
      return {
        level: "غیرمعمول",
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      };
    }
    return { level: "عمومی", color: "text-blue-600", bg: "bg-blue-100" };
  };

  const security = getSecurityLevel();

  return (
    <div className="space-y-4">
      {/* کارت اصلی */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MdPublic className="text-xl text-blue-500" />
            <div>
              <h3 className="font-bold text-gray-800">تحلیل IP</h3>
              <p className="text-sm text-gray-600">بدون نیاز به API خارجی</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {ipInfo.isIPv6Mapped && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                IPv6-mapped
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-sm ${security.bg} ${security.color}`}
            >
              {security.level}
            </span>
          </div>
        </div>

        {/* آدرس IP */}
        <div className="mb-4 p-3 bg-white rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdNetworkCheck className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">آدرس IP</p>
                <div className="flex flex-col">
                  <code className="font-mono text-lg font-bold">{ipInfo.ip}</code>
                  {ipInfo.originalIp !== ipInfo.ip && (
                    <span className="text-xs text-gray-500 mt-1">
                      اصلی: {ipInfo.originalIp}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">نسخه</p>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  ipInfo.version === "IPv6"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {ipInfo.version}
              </span>
            </div>
          </div>
        </div>

        {/* اطلاعات شبکه */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MdSecurity className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">نوع شبکه</p>
                <p className="font-medium">{ipInfo.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaNetworkWired className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">محدوده</p>
                <p className="font-medium">
                  {ipInfo.isPrivate ? "خصوصی" : "عمومی"}
                  {ipInfo.isLocalhost && " (Localhost)"}
                  {ipInfo.isReserved && " (رزرو شده)"}
                  {ipInfo.isIPv6Mapped && " (IPv6-mapped)"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {ipInfo.possibleLocation !== "نامشخص" && (
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">احتمالاً از</p>
                  <p className="font-medium">{ipInfo.possibleLocation}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <FaGlobeAmericas className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">دسترسی</p>
                <p className="font-medium">
                  {ipInfo.isPrivate || ipInfo.isLocalhost
                    ? "فقط شبکه داخلی"
                    : "دسترسی عمومی"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* نکات امنیتی */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-start gap-2">
            <MdInfo className="text-blue-500 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800">نکات امنیتی:</p>
              <ul className="list-disc list-inside mt-1 text-blue-700 space-y-1">
                {ipInfo.isPrivate && <li>این IP متعلق به شبکه داخلی است</li>}
                {ipInfo.isLocalhost && <li>دسترسی از localhost (سرور خودی)</li>}
                {ipInfo.version === "IPv6" && (
                  <li>اتصال از طریق IPv6 انجام شده</li>
                )}
                {!ipInfo.isPrivate && !ipInfo.isLocalhost && (
                  <li>اتصال از اینترنت عمومی برقرار شده</li>
                )}
                {ipInfo.isIPv6Mapped && (
                  <li>این یک IPv6-mapped IPv4 address است</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* هشدار برای IP‌های خاص */}
      {ipInfo.type.includes("TEST") && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <MdWarning />
            <p className="font-medium">تست شبکه</p>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            این IP متعلق به رنج‌های تست شبکه است و ممکن است غیرمعمول باشد.
          </p>
        </div>
      )}

      {ipInfo.isReserved && !ipInfo.type.includes("TEST") && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-orange-800">
            <MdWarning />
            <p className="font-medium">IP رزرو شده</p>
          </div>
          <p className="text-sm text-orange-700 mt-1">
            این آدرس IP در محدوده رزرو شده است و نباید در اینترنت عمومی دیده
            شود.
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleIPInfo;