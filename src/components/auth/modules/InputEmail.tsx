"use client";

import { isValidEmail } from "@/utils/validation/regexes";
import { useEffect, useRef, useState } from "react";

type InputEmailProps = {
    onIsCorrectEmail: (value: string, isValid: boolean) => any,
    defaultValue?: string,
    clearInp?: boolean;
    disabled?: boolean
}

const emailLists = [
    "gmail.com", "yahoo.com", "outlook.com", "icloud.com", "aol.com", "yandex.com", "protonmail.com", "zoho.com", "gmx.com",
]

const InputEmail = ({ onIsCorrectEmail, defaultValue = "", clearInp = false, disabled = false }: InputEmailProps) => {

    const emailRef = useRef<HTMLInputElement>(null)
    // Value
    const [email, setEmail] = useState<string>("")
    // show suggestion email list
    const [isShowListEmail, setIsShowListEmail] = useState<boolean>(false)
    const [chooseItemInEmail, setChooseItemInEmail] = useState<boolean>(false)
    // Feiltered Email
    const [sortedEmails, setSortedEmails] = useState<string[]>(emailLists)

    useEffect(() => {
        if (chooseItemInEmail) {
            setChooseItemInEmail(false)
            setIsShowListEmail(false)
        }
    }, [chooseItemInEmail])

    useEffect(() => {
        setEmail(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (clearInp) setEmail("");
    }, [clearInp])

    // funcs Suggestion List Email
    const handleClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        const target = e.currentTarget as HTMLElement;
        const emailValue = target.getAttribute('email-value');
        setEmail(emailValue || "");
        setIsShowListEmail(false)
        setChooseItemInEmail(true)

        if (isValidEmail(emailValue || ""))
            onIsCorrectEmail(emailValue || "", true)
        else
            onIsCorrectEmail(emailValue || "", false)
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setTimeout(() => { setIsShowListEmail(false) }, 100);
    };

    const handleChangeEmailInp = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailVal = e.target.value;
        const cursorPosition = e.target.selectionStart;

        if (emailVal.length === 0 && !/@/.test(emailVal)) {
            setIsShowListEmail(false);
        }

        if (emailVal.length) {
            if (/@/.test(emailVal) && !isShowListEmail) {
                setIsShowListEmail(true);
            }
            if (!/@/.test(emailVal)) {
                setIsShowListEmail(false);
            }
            if (/@/.test(emailVal)) {
                const query = emailVal.split('@')[1].toLowerCase();
                const matchedEmails = emailLists.filter(email => email.startsWith(query));
                const unmatchedEmails = emailLists.filter(email => !email.startsWith(query));
                setSortedEmails([...matchedEmails, ...unmatchedEmails]);
            }
        }

        if (isValidEmail(emailVal)) {
            onIsCorrectEmail(emailVal, true);
        } else {
            onIsCorrectEmail(emailVal, false);
        }

        setEmail(emailVal);
        setTimeout(() => {
            if (emailRef.current) {
                emailRef.current.setSelectionRange(cursorPosition, cursorPosition);
            }
        }, 0);
    };

    return (
        <div className="mt-6 h-full">
            <div className="relative">
                <label className="block tracking-wide text-[var(--black-color)] font-bold mb-2" htmlFor="email">
                    ایمیل
                </label>
                <input
                    disabled={disabled}
                    type="text"
                    id="email"
                    autoComplete="off"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={handleChangeEmailInp}
                    onKeyDown={e => e.key === " " && e.preventDefault()}
                    onFocus={() => email.includes("@") && setIsShowListEmail(true)}
                    onBlur={handleBlur}
                    ref={emailRef}
                    className={`${email.length && (isValidEmail(email) ? "!shadow !shadow-green-600" : "!shadow !shadow-red-300")} w-full h-12 px-3 rounded-lg`}
                    dir="ltr"
                />
                {
                    isShowListEmail &&
                    <div className="rounded-md bg-gray-300 dark:bg-gray-800 overflow-y-auto shadow-[0_0_10px_#c9c9c9] p-2 leading-9 w-full max-h-56 absolute top-[86px] z-10" dir="ltr">
                        <div tabIndex={-1} onBlur={handleBlur} className="h-[200px]">

                            {
                                (!email.includes("@") ? emailLists : sortedEmails).map((emailElem, index) => (
                                    <p
                                        key={index}
                                        onMouseDown={handleClick}
                                        email-value={`${email.slice(0, email.indexOf("@"))}@${emailElem}`}
                                        className="!z-30 select-none px-2 rounded cursor-pointer hover:bg-[var(--light-primary)] hover:animate-pulse"
                                    >
                                        {

                                            email.slice(email.indexOf("@") + 1, email.length) === emailElem.slice(0, email.slice(email.indexOf("@") + 1, email.length).length)
                                                ?
                                                <>
                                                    <span className="!text-gray-500 pointer-events-none">{email.slice(0, email.indexOf("@") + 1)}{emailElem.slice(0, +email.slice(email.indexOf("@")).length - 1)}</span>
                                                    <span className="!text-[var(--black-color)] pointer-events-none">{emailElem.slice(+email.slice(email.indexOf("@")).length - 1)}</span>
                                                </>
                                                :
                                                <>
                                                    <span className="!text-gray-500 pointer-events-none">{email.slice(0, email.indexOf("@") + 1)}</span>
                                                    <span className="!text-[var(--black-color)] pointer-events-none">{emailElem}</span>
                                                </>
                                        }
                                    </p>
                                ))
                            }

                        </div>
                    </div>
                }
            </div>
            <div className={`text-red-500 text-[.9rem] font-[IRANSansLight] mt-2 ml-4 select-none ${email.length && (!isValidEmail(email) ? 'block' : 'hidden') || 'hidden'}`} dir="rtl">
                ╝ ایمیل وارد شده معتبر نمی باشد
            </div>
        </div>
    )
}

export default InputEmail