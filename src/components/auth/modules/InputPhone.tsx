import React, { useState, useRef, useEffect } from 'react';

interface IranianPhoneInputProps {
    title?: string;
    label?: string;
    onValidPhoneChange?: (phone: string) => void;
}

const IranianPhoneInput = ({
    title = "شماره همراه",
    label = "phone",
    onValidPhoneChange
}: IranianPhoneInputProps) => {
    const [phone, setPhone] = useState('');
    const [formattedPhone, setFormattedPhone] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const lastSentPhone = useRef<string | null>(null);

    // اعتبارسنجی شماره تلفن
    const isValidPhone = (num: string) => {
        const digits = num.replace(/\D/g, '');
        return digits.length === 10 && digits.startsWith('9');
    };

    // فرمت‌دهی خودکار به صورت XXX XXX XXXX
    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, '');
        let formatted = '';

        if (digits.length > 0) {
            formatted = digits.substring(0, 3);
        }
        if (digits.length > 3) {
            formatted += ' ' + digits.substring(3, 6);
        }
        if (digits.length > 6) {
            formatted += ' ' + digits.substring(6, 10);
        }

        return formatted;
    };

    useEffect(() => {
        if (isValidPhone(phone)) {
            const fullPhone = '0' + phone;

            // فقط در صورت تغییر نسبت به آخرین ارسال، اطلاع رسانی کنید
            if (fullPhone !== lastSentPhone.current) {
                onValidPhoneChange?.(fullPhone);
                lastSentPhone.current = fullPhone;
            }
        } else {
            // فقط در صورتی که قبلا شماره معتبر ارسال شده بود، اطلاع دهید
            if (lastSentPhone.current !== null) {
                onValidPhoneChange?.('');
                lastSentPhone.current = null;
            }
        }
    }, [phone, onValidPhoneChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        // جلوگیری از ورود صفر اول
        if (input.startsWith('0')) {
            return;
        }

        const digits = input.replace(/\D/g, '');
        if (digits.length <= 10) {
            const formatted = formatPhone(digits);
            setFormattedPhone(formatted);
            setPhone(digits); // ذخیره نسخه بدون فاصله برای اعتبارسنجی
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && formattedPhone.length > 0) {
            const lastChar = formattedPhone[formattedPhone.length - 1];
            if (lastChar === ' ') {
                e.preventDefault();
                const newValue = formattedPhone.slice(0, -1);
                setFormattedPhone(newValue);
                setPhone(newValue.replace(/\D/g, ''));
            }
        }

        // جلوگیری از ورود فاصله
        if (e.key === ' ') {
            e.preventDefault();
        }
    };

    return (
        <div className="h-full mt-6">
            <label htmlFor={label} className="block tracking-wide text-[var(--black-color)] font-bold mb-2">
                {title}
            </label>

            <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500">
                    98+
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="9xx xxx xxxx"
                    id={label}
                    value={formattedPhone}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={`${phone.length ? (isValidPhone(phone) ? "!shadow !shadow-green-600" : "!shadow !shadow-red-300") : ""} w-full h-12 px-3 pl-12 rounded-lg`}
                    maxLength={12} // 3 بخش + 2 فاصله
                    dir='ltr'
                />
            </div>

            <div className={`text-red-500 text-[.9rem] mt-2 ml-4 select-none ${phone.length && !isValidPhone(phone) ? 'block' : 'hidden'}`}>
                ╝ شماره تلفن وارد شده نامعتبر است
            </div>
        </div>
    );
};

export default IranianPhoneInput;