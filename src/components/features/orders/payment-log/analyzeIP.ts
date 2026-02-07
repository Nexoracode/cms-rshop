const analyzeIP = (ip: string) => {
  // حذف ::ffff: از ابتدای IP اگر وجود دارد (IPv6-mapped IPv4)
  let cleanIP = ip;
  console.log("SSSSSSSSSSS", ip);
  
  if (ip.startsWith('::ffff:')) {
    cleanIP = ip.substring(7); // حذف '::ffff:'
  }
  
  const info = {
    originalIp: ip,
    ip: cleanIP,
    version: cleanIP.includes(':') ? 'IPv6' : 'IPv4',
    isIPv6Mapped: ip.startsWith('::ffff:'),
    isPrivate: false,
    isLocalhost: false,
    isLoopback: false,
    isReserved: false,
    type: 'نامشخص',
    possibleLocation: 'نامشخص'
  };

  // تشخیص IPv4 خصوصی
  const privateIPv4Ranges = [
    { start: '10.0.0.0', end: '10.255.255.255', name: 'کلاس A خصوصی' },
    { start: '172.16.0.0', end: '172.31.255.255', name: 'کلاس B خصوصی' },
    { start: '192.168.0.0', end: '192.168.255.255', name: 'کلاس C خصوصی' },
    { start: '169.254.0.0', end: '169.254.255.255', name: 'Link-local' },
    { start: '127.0.0.0', end: '127.255.255.255', name: 'Loopback' }
  ];

  // تشخیص IPv6 خصوصی
  const privateIPv6Ranges = [
    { prefix: 'fc00::', name: 'ULLA (خصوصی)' },
    { prefix: 'fd00::', name: 'ULLA (خصوصی)' },
    { prefix: 'fe80::', name: 'Link-local' },
    { prefix: '::1', name: 'Loopback' },
    { prefix: '::ffff:', name: 'IPv6-mapped IPv4' }
  ];

  // بررسی IPv4
  if (info.version === 'IPv4') {
    const ipParts = cleanIP.split('.');
    if (ipParts.length !== 4) {
      return info; // IP نامعتبر
    }
    
    const ipNum = ipParts.reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
    
    // بررسی رنج‌های خصوصی
    for (const range of privateIPv4Ranges) {
      const startParts = range.start.split('.');
      const endParts = range.end.split('.');
      const start = startParts.reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
      const end = endParts.reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
      
      if (ipNum >= start && ipNum <= end) {
        info.isPrivate = true;
        info.type = range.name;
        break;
      }
    }
    
    // تشخیص localhost
    info.isLocalhost = cleanIP === '127.0.0.1';
    info.isLoopback = cleanIP.startsWith('127.');
    
    // تشخیص رنج‌های رزرو شده
    const reservedRanges = [
      { start: '0.0.0.0', end: '0.255.255.255', name: 'Current network' },
      { start: '100.64.0.0', end: '100.127.255.255', name: 'CGNAT' },
      { start: '192.0.0.0', end: '192.0.0.255', name: 'IETF Protocol' },
      { start: '192.0.2.0', end: '192.0.2.255', name: 'TEST-NET-1' },
      { start: '198.18.0.0', end: '198.19.255.255', name: 'Benchmark testing' },
      { start: '198.51.100.0', end: '198.51.100.255', name: 'TEST-NET-2' },
      { start: '203.0.113.0', end: '203.0.113.255', name: 'TEST-NET-3' },
      { start: '224.0.0.0', end: '239.255.255.255', name: 'Multicast' },
      { start: '240.0.0.0', end: '255.255.255.254', name: 'Reserved' },
      { start: '255.255.255.255', end: '255.255.255.255', name: 'Broadcast' }
    ];
    
    for (const range of reservedRanges) {
      const startParts = range.start.split('.');
      const endParts = range.end.split('.');
      const start = startParts.reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
      const end = endParts.reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
      
      if (ipNum >= start && ipNum <= end) {
        info.isReserved = true;
        info.type = range.name;
        break;
      }
    }
    
    // تشخیص احتمالی کشور بر اساس IP (فقط ایران)
    const iranRanges = [
      { prefix: '5.', location: 'ایران (رایانش ابری ایران)' },
      { prefix: '2.144.', location: 'ایران (شاتل)' },
      { prefix: '2.145.', location: 'ایران (مخابرات)' },
      { prefix: '37.27.', location: 'ایران (های وب)' },
      { prefix: '46.209.', location: 'ایران (پارس آنلاین)' },
      { prefix: '78.38.', location: 'ایران (صبانت)' },
      { prefix: '79.175.', location: 'ایران (شاتل)' },
      { prefix: '85.185.', location: 'ایران (پارس آنلاین)' },
      { prefix: '94.183.', location: 'ایران (های وب)' },
      { prefix: '95.38.', location: 'ایران (مخابرات)' },
      { prefix: '172.18.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.19.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.20.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.21.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.22.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.23.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.24.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.25.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.26.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.27.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.28.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.29.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.30.', location: 'شبکه خصوصی داخلی' },
      { prefix: '172.31.', location: 'شبکه خصوصی داخلی' }
    ];
    
    for (const range of iranRanges) {
      if (cleanIP.startsWith(range.prefix)) {
        info.possibleLocation = range.location;
        break;
      }
    }
    
  } else if (info.version === 'IPv6') {
    // بررسی IPv6
    info.isPrivate = privateIPv6Ranges.some(range => ip.startsWith(range.prefix));
    info.isLocalhost = ip === '::1';
    info.isLoopback = ip === '::1';
    
    // تشخیص نوع IPv6
    for (const range of privateIPv6Ranges) {
      if (ip.startsWith(range.prefix)) {
        info.type = range.name;
        break;
      }
    }
    
    // تشخیص احتمالی
    if (ip.startsWith('2001:')) {
      info.type = 'IPv6 عمومی (Teredo)';
    } else if (ip.startsWith('2002:')) {
      info.type = 'IPv6 to IPv4 (6to4)';
    } else if (ip.startsWith('3ffe:')) {
      info.type = '6bone (قدیمی)';
    }
  }

  return info;
};

export default analyzeIP