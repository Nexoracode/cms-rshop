"use client"

import React, { useEffect, useState } from "react";
import { sendRequestWithLoading } from "@utils/configs/axios";
import Editor from "@comp_global/Editor"
import SelectBox from "@comp_global/SelectBox";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Input from "@/components/global/Input";

type FormatData = { id: number, content: string, title: string }

const Policy = () => {

    const [dataList, setDataList] = useState<FormatData[]>([])
    const [document, setDocument] = useState<FormatData>({ id: 1, content: "", title: "" })
    const [chooseDoc, setChooseDoc] = useState<any>(0)

    useEffect(() => {
        getAllDocuments()
    }, [])

    useEffect(() => {
        if (chooseDoc) {
            let filterData = [...dataList].find(data => data.id === chooseDoc)
            console.log("FilterData =>", filterData);
            setDocument(filterData!)
        }
    }, [chooseDoc])

    const getAllDocuments = async () => {
        const res = await sendRequestWithLoading(`/admin/document?get_all=true`, {}, "post", "Getting Documents", false, false)
        if (res?.data?.data) {
            const data = res.data.data as FormatData[]
            setDataList(data)
        }
    }

    const reRender = () => {
        getAllDocuments()
    }

    const createNewContent = async (content: string, id: number) => {
        console.log("=>>>>>>>>>>>>>>", content);

        const { title } = document

        if (id === 0) {
            console.log("Create");

            const res = await sendRequestWithLoading(`/admin/document/create`, { title, content }, "post", "Adding New Document", false, false)
            if (res?.data?.data) {
                reRender()
            }
        } else if (id >= 1) {
            console.log("Upadte");

            const res = await sendRequestWithLoading(`/admin/document/${id}`, { title, content }, "put", "Updating Document", false, false)
            if (res?.data?.data) {
                reRender()
            }
        } else {
            console.log("Delete");

            const res = await sendRequestWithLoading(`/admin/document/${+content}`, {}, "delete", "Deleting Document", false, false)
            if (res?.data?.data) {
                reRender()
            }
        }
    }

    return (
        <div className="px-4 pb-4">

            <div className="w-full mb-10 flex items-center justify-center">
                <div className="w-full grid grid-cols sm:grid-cols-2 sm:gap-8">
                    <SelectBox
                        label={"Selected Document"}
                        selectedItemIcon={<HiOutlineClipboardDocumentList />}
                        fields={
                            dataList?.length
                                ? dataList.map(doc => {
                                    return { id: doc.id, icon: null, title: <div className="flex items-center"> <span className={"bg-[var(--light-primary)] text-[var(--primary)] rounded px-1 me-2"}>{doc.id}</span> <span>{doc.title}</span> </div> };
                                }) : []
                        }
                        onChoosedItem={val => {
                            setChooseDoc(+val)
                            let filterData = [...dataList].find(data => data.id === +val) || { id: 1, title: "", content: "" }
                            setDocument(filterData)
                        }}
                        defaultSelectedId={dataList[0]?.id || 1}
                        isLoading={dataList.length ? false : true}
                        activeSearch
                    />
                    <Input defaultValue={document.title} onInpValue={val => document.title = val} htmlFor="title" lablel="Title" placeholder="Title..." />
                </div>
            </div>

            <Editor
                onContent={data => createNewContent(data.content, data.id)}
                defaultContent={chooseDoc ? { content: document.content, id: document.id } : null}
                newDoc={() => setDocument({ id: 0, content: "", title: "" })}
            />

        </div>
    )
}

export default Policy