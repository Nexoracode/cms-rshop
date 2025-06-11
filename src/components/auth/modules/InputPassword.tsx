"use client";
import { useEffect, useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
//validators
import { contains_upper_lower_number, containsSpace, containsSpecialChar } from "@/utils/validation/regexes";

type InputPasswordProps = {
    onIsCorrectPassword: (value: string, isValid: boolean) => any,
    activeTextValidation?: boolean | true,
    label?: string,
    title?: string,
    condition: boolean,
    clearInp?: boolean,
    disableRegex?: boolean;
}

const InputPassword = ({ onIsCorrectPassword, disableRegex = false, activeTextValidation = true, clearInp = false, label = "password", title = "Password", condition }: InputPasswordProps) => {

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [isCorrectPassword, setIsCorrectPassword] = useState<boolean>(false)
    // validation password
    const [charactersPass, setCharactersPass] = useState<boolean>(false)
    const [isContainsCombine, setIsContainsCombine] = useState<boolean>(false)
    const [isContainsSpace, setIsContainsSpace] = useState<boolean>(false)
    const [isContainsSpecialChar, setIsContainsSpecialChar] = useState<boolean>(false)
    //value
    const [password, setPassword] = useState<string>("")

    useEffect(() => {
        if (password.length >= 10 && password.length <= 32) setCharactersPass(true)
        else setCharactersPass(false)

        if (contains_upper_lower_number(password)) setIsContainsCombine(true)
        else setIsContainsCombine(false)

        if (containsSpecialChar(password)) setIsContainsSpecialChar(true)
        else setIsContainsSpecialChar(false)

        if (containsSpace(password)) setIsContainsSpace(true)
        else setIsContainsSpace(false)

    }, [password])

    useEffect(() => {

        if (password.length && charactersPass && isContainsCombine && !isContainsSpace && isContainsSpecialChar || (disableRegex && password.length >= 8 && password.length <= 32)) {
            onIsCorrectPassword(password, true)
            setIsCorrectPassword(true)
        }
        else {
            onIsCorrectPassword(password, false)
            setIsCorrectPassword(false)
        }
    }, [charactersPass, isContainsCombine, isContainsSpace, password, isContainsSpecialChar])

    useEffect(() => {
        if (passwordRef?.current)
            isShowPassword ? passwordRef.current.type = "text" : passwordRef.current.type = "password"
    }, [isShowPassword])

    useEffect(() => {
        if (clearInp) setPassword("");
    }, [clearInp]);

    return (
        <div className="mt-6">

            <label htmlFor={label} className="block tracking-wide text-[var(--black-color)] font-bold mb-2">{title}</label>
            <div className="relative">
                <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder={isShowPassword ? "12345678" : "********"}
                    id={label}
                    value={password}
                    className={`${password.length && (isCorrectPassword && condition ? "!shadow !shadow-green-600" : "!shadow !shadow-red-300")} w-full h-12 px-3 rounded-lg`}
                    ref={passwordRef}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                    onKeyDown={e => e.key === " " && e.preventDefault()}
                />

                <div onClick={() => setIsShowPassword(prev => !prev)} className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer">
                    {
                        isShowPassword ? <FaRegEye className="w-5 h-5 text-[var(--gray)]" /> : <FaRegEyeSlash className="w-5 h-5 text-[var(--gray)]" />
                    }
                </div>
            </div>
            {
                !disableRegex
                    ?
                    <div className="mb-4">
                        <div className={`text-red-500 text-[.9rem] mt-2 ml-4 select-none ${password.length && (!isCorrectPassword || !condition) ? 'block' : 'hidden'}`}>
                            ╚ The entered value is wrong.
                        </div>
                        {
                            activeTextValidation && !isCorrectPassword ?
                                <div className="ml-4 text-[.8rem] 320:text-[.9rem] sm:text-[1rem] mt-2 text-[var(--gray)] select-none">
                                    <small className={charactersPass ? "text-green-500" : password.length >= 1 && !charactersPass ? "text-red-500" : "text-[var(--gray)]"}>■ 10-32 characters.</small><br />
                                    <small className={isContainsCombine ? "text-green-500" : password.length >= 1 && !isContainsCombine ? "text-red-500" : "text-[var(--gray)]"}>■ At least one uppercase, lowercase and number.</small><br />
                                    <small className={isContainsSpecialChar ? "text-green-500" : password.length >= 1 && !isContainsSpecialChar ? "text-red-500" : "text-[var(--gray)]"}>■ Special characters ( @, #, & ... )</small><br />
                                    {
                                        isContainsSpace && password.length >= 1 &&
                                        <small className="text-red-500">■ Does not contain any spaces.</small>
                                    }
                                </div>
                                : ""
                        }
                    </div>
                    :
                    ""
            }
        </div>
    )
}

export default InputPassword