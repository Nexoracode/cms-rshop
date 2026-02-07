import { 
  MdDesktopWindows, 
  MdPhoneIphone, 
  MdTabletMac,
  MdLaptop,
  MdComputer,
  MdLanguage
} from "react-icons/md";

interface DeviceInfoProps {
  userAgent: string;
  ip: string;
}

const DeviceInfo = ({ userAgent, ip }: DeviceInfoProps) => {
  // تجزیه user agent
  const getDeviceInfo = (ua: string) => {
    let device = "دستگاه ناشناخته";
    let os = "سیستم عامل ناشناخته";
    let browser = "مرورگر ناشناخته";
    let deviceIcon = <MdComputer className="text-gray-400" />;
    
    // تشخیص دستگاه
    if (/mobile|iphone|android/i.test(ua)) {
      device = "موبایل";
      deviceIcon = <MdPhoneIphone className="text-blue-400" />;
    } else if (/tablet|ipad/i.test(ua)) {
      device = "تبلت";
      deviceIcon = <MdTabletMac className="text-purple-400" />;
    } else if (/laptop/i.test(ua)) {
      device = "لپ‌تاپ";
      deviceIcon = <MdLaptop className="text-green-400" />;
    } else {
      device = "کامپیوتر";
      deviceIcon = <MdDesktopWindows className="text-gray-400" />;
    }
    
    // تشخیص سیستم عامل
    if (/windows/i.test(ua)) {
      os = "Windows";
    } else if (/mac os|macintosh/i.test(ua)) {
      os = "macOS";
    } else if (/linux/i.test(ua)) {
      os = "Linux";
    } else if (/android/i.test(ua)) {
      os = "Android";
    } else if (/ios|iphone|ipad/i.test(ua)) {
      os = "iOS";
    }
    
    // تشخیص مرورگر
    if (/chrome/i.test(ua) && !/edge/i.test(ua)) {
      browser = "Google Chrome";
    } else if (/firefox/i.test(ua)) {
      browser = "Mozilla Firefox";
    } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
      browser = "Safari";
    } else if (/edge/i.test(ua)) {
      browser = "Microsoft Edge";
    } else if (/opera|opr/i.test(ua)) {
      browser = "Opera";
    }
    
    return { device, os, browser, deviceIcon };
  };
  
  const { device, os, browser, deviceIcon } = getDeviceInfo(userAgent);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {deviceIcon}
          <div>
            <p className="font-medium text-sm">{device}</p>
            <p className="text-xs text-gray-500">نوع دستگاه</p>
          </div>
        </div>
        
        {ip && (
          <div className="text-right">
            <p className="font-mono text-sm">{ip}</p>
            <p className="text-xs text-gray-500">آدرس IP</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-600">سیستم عامل</p>
          <p className="font-medium">{os}</p>
        </div>
        <div>
          <p className="text-gray-600">مرورگر</p>
          <p className="font-medium">{browser}</p>
        </div>
      </div>
      
      {/* نمایش user agent کامل (مخفی شده) */}
      <details className="mt-3">
        <summary className="cursor-pointer text-blue-600 text-sm flex items-center gap-1">
          <MdLanguage size={16} />
          نمایش User Agent کامل
        </summary>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
          {userAgent}
        </pre>
      </details>
    </div>
  );
};

export default DeviceInfo;