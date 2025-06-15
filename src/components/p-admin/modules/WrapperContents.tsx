"use client"

import React, { useEffect, useRef, useState } from "react"
import ContentTitle from "./ContentTitle"
import TextArea from "@comp_global/TextArea"
import ResizeListener from "@comp_global/ResizeListener"
import AuthButton from "@/components/auth/AuthButton"
import { Description } from "@comp_types/Types"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"
import { TbEdit } from "react-icons/tb"
import { MdOutlineAddToPhotos } from "react-icons/md"

type WrapperContentsProps = {
    editType: string,
    onCloseOnBoxHandler: () => void,
    onUpdateDescription: (data: string) => void,
    onUpdateContent?: () => void,
    defaultDescription: string,
    conditionForDisabledBtn: any,
    totalContent?: React.ReactNode,
    hiddenContentsForCreate?: number[],
    hiddenContentsForUpdate?: number[],
    contentTable: React.ReactNode
    children?: React.ReactNode,
    customStyle?: any,
    customConditionTable?: any,
    extraType?: string,
    extraBox?: React.ReactNode
    widthBox?: string
}

const WrapperContents = ({ editType, onCloseOnBoxHandler, hiddenContentsForCreate, hiddenContentsForUpdate, widthBox = "md:w-[704px]", extraType = "", extraBox = <></>, onUpdateDescription, customConditionTable, totalContent, customStyle, conditionForDisabledBtn, defaultDescription, contentTable, children, onUpdateContent }: WrapperContentsProps) => {

    // Animation
    const updateBoxRef = useRef<HTMLDivElement>(null)
    const createBoxRef = useRef<HTMLDivElement>(null)
    const DescripBoxRef = useRef<HTMLDivElement>(null)
    const BoxRef = useRef<HTMLDivElement>(null)
    const [heightBox, setHeightBox] = useState<any>(0)
    //
    const [contentUpdate, setContentUpdate] = useState<React.ReactNode[]>()
    const [contentCreate, setContentCreate] = useState<React.ReactNode[]>()
    //
    const [description, setDescription] = useState<Description>({ id: 1, description: "", isValid: false })

    useEffect(() => {
        const childrenArray = React.Children.toArray(totalContent);

        // بررسی می‌کنیم که اولین عنصر `ReactElement` است و `Fragment` می‌باشد
        if (
            childrenArray.length === 1 &&
            React.isValidElement(childrenArray[0]) &&
            childrenArray[0].type === React.Fragment
        ) {
            const actualChildren = React.Children.toArray(childrenArray[0].props.children);

            if (hiddenContentsForCreate?.length) {
                setContentCreate(actualChildren.filter((_, index) => !hiddenContentsForCreate.includes(index)));
            }

            if (hiddenContentsForUpdate?.length) {
                setContentUpdate(actualChildren.filter((_, index) => !hiddenContentsForUpdate.includes(index)));
            }
        } else {
            // در صورتی که `Fragment` نبود، مستقیماً از `childrenArray` استفاده می‌کنیم
            if (hiddenContentsForCreate?.length) {
                setContentCreate(childrenArray.filter((_, index) => !hiddenContentsForCreate.includes(index)));
            }

            if (hiddenContentsForUpdate?.length) {
                setContentUpdate(childrenArray.filter((_, index) => !hiddenContentsForUpdate.includes(index)));
            }
        }
    }, [totalContent, hiddenContentsForCreate, hiddenContentsForUpdate]);

    useEffect(() => {
        setDescription(prev => ({ ...prev, description: defaultDescription }))
    }, [defaultDescription])

    useEffect(() => {
        if (editType === "DESCRIPTION") setHeightBox(DescripBoxRef.current?.scrollHeight);
        else if (editType === "UPDATE") setHeightBox(updateBoxRef.current?.scrollHeight);
        else if (editType === "CREATE") setHeightBox(createBoxRef.current?.scrollHeight);
        else setHeightBox(BoxRef.current?.scrollHeight);
    }, [editType])

    const style = `w-fit absolute top-0 transition-transform duration-500 box-panel`
    const hide = `translate-y-[105px]`
    const show = `translate-y-[-1300px]`

    return (
        <section className={`flex flex-col items-center justify-center ${customStyle}`}>

            <div ref={DescripBoxRef} className={`${editType === "DESCRIPTION" ? hide : show} ${style}`}>

                <ContentTitle activeClose={true} onClickClose={onCloseOnBoxHandler} title="Description" icon={<HiOutlineClipboardDocumentList className="text-2xl sm:text-4xl" />} />

                <div className="px-2 w-screen max-w-[600px]">
                    <TextArea onInpValue={(val, isValid) => setDescription(prev => ({ ...prev, description: val, isValid }))} value={description.description} placeholder="Your description..." lablel="Description" htmlFor="Description" />
                    <div className="mt-4">
                        <AuthButton title="Update Description" disable={description.isValid ? false : true} onClickHandler={() => onUpdateDescription(description.description)} />
                    </div>
                </div>

            </div>

            <div ref={updateBoxRef} className={`${editType === "UPDATE" ? hide : show} ${style}`}>

                <ContentTitle activeClose={true} onClickClose={onCloseOnBoxHandler} title="Update" icon={<TbEdit className="text-2xl sm:text-4xl" />} />

                <div className="flex items-center justify-center">
                    <div className={`w-screen px-2 ${widthBox}`}>
                        {contentUpdate}
                        <div className="mt-4">
                            <AuthButton title="Update Information" disable={conditionForDisabledBtn} onClickHandler={onUpdateContent!} />
                        </div>
                    </div>
                </div>

            </div>

            <div ref={createBoxRef} className={`${editType === "CREATE" ? hide : show} ${style}`}>

                <ContentTitle activeClose={true} onClickClose={onCloseOnBoxHandler} title="Create" icon={<MdOutlineAddToPhotos className="text-2xl sm:text-4xl" />} />

                <div className="flex items-center justify-center">
                    <div className={`w-screen px-2 ${widthBox}`}>
                        {contentCreate}
                        <div className="mt-4">
                            <AuthButton title="Create" disable={conditionForDisabledBtn} onClickHandler={onUpdateContent!} />
                        </div>
                    </div>
                </div>

            </div>

            <div ref={BoxRef} className={`${editType === extraType ? hide : show} ${style}`}>{extraBox}</div>

            <div
                style={{
                    transform: `translateY(${editType === "NULL" || customConditionTable ? "0px" : `${heightBox + 26}px`})`,
                }}
                className={`${editType === "NULL" ? "!scale-100 !translate-y-[50px]" : "!scale-50 !translate-y-[-1200px]"} w-full 1280:w-full overflow-x-auto absolute top-0 right-auto left-auto 1280:!px-4 transition-translate duration-500`}>
                {contentTable}
            </div>

            {children}

            <ResizeListener onResize={() => editType !== "NULL" && onCloseOnBoxHandler()} />

        </section>
    )
}

export default WrapperContents