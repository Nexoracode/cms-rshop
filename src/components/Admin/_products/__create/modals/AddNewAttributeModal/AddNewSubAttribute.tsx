"use client"

import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider
} from "@heroui/react";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
//
import { Attribute, AttributeData } from "./Types";

type Props = {
  onNewSubAttribute: (data: AttributeData) => void;
  onDelete: (id: string) => void;
  attribute: AttributeData;
};

const AddNewSubAttribute: React.FC<Props> = ({ onNewSubAttribute, attribute, onDelete }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedAttr, setSelectedAttr] = useState<string | null>(null);
  //
  const [subAttributes, setSubAttributes] = useState<Attribute[]>([]);
  const [isExistAttrInListSuggestion, setIsExistAttrInListSuggestion] = useState(false)
  const [attributesListSuggestion, setAttributesListSuggestion] = useState<Attribute[]>([]);
  const [activeBtn, setActiveBtn] = useState<"submit" | "add_new_attribute">("submit")

  const isDisabledAcc = (!selectedAttr && !inputValue) || isExistAttrInListSuggestion || activeBtn === "add_new_attribute";

  useEffect(() => {
    getAllSubAttributes()
  }, [])

  useEffect(() => {
    console.log("<<<<<<<<<<<<", attributesListSuggestion);
  }, [attributesListSuggestion])

  useEffect(() => {
    //split
    if (subAttributes.length) {
      const result = subAttributes.find(item => item.label.trim() === inputValue.trim())
      setActiveBtn(result === undefined ? "add_new_attribute" : "submit")
    }
    //
    let attrFind = subAttributes.find(attr => attr.label.trim() === inputValue.trim())
    if (attrFind) {
      setSelectedAttr(attrFind.id)
      let isExist = attributesListSuggestion.filter(attr => attr.label === attrFind?.label);
      setIsExistAttrInListSuggestion(isExist.length ? false : true)
    } else setIsExistAttrInListSuggestion(false)
  }, [inputValue])

  const getAllSubAttributes = async () => {
    const data = [
      { id: crypto.randomUUID(), label: "sub - 1", },
      { id: crypto.randomUUID(), label: "sub - 2", },
    ]
    onNewSubAttribute({ ...attribute, subs: data })
    setAttributesListSuggestion(data)
  }

  const handleAddNewSubAttrInList = () => {
    if (!attribute.subs?.length) return
    let newAttr = attribute.subs.find(attr => attr.id === selectedAttr)!

    setSubAttributes(prev => {
      let past = prev.filter(attr => attr.id !== newAttr.id)
      return [...past, newAttr]
    })

    setAttributesListSuggestion(prev => prev.filter(attr => attr.id !== newAttr.id))

    // reset
    setInputValue("");
    setSelectedAttr(null);
    setActiveBtn("add_new_attribute");
  };

  const handleAddSubAttr = () => {
    let generateID = crypto.randomUUID()
    let newAttr = { id: generateID, label: inputValue.trim() }
    setSubAttributes((prev: any) => ([...prev, newAttr]))
    setSelectedAttr(generateID)
    setActiveBtn("submit")
    setAttributesListSuggestion(prev => ([...prev, newAttr]))
  }

  const handleRemove = (id: string) => {
    const newList = subAttributes.filter((item) => item.id !== id);
    const subAttr = subAttributes.filter((item) => item.id === id);
    setSubAttributes(newList);
    setAttributesListSuggestion(prev => [...prev, ...subAttr])
  };

  return (
    <Accordion variant="splitted">
      <AccordionItem
        key={attribute.id}
        className="shadow-md"
        aria-label="Accordion 1"
        title={
          <div className="flex items-center justify-between w-full">
            <p className="text-gray-600">{attribute.attr.label}</p>
            <RiDeleteBin5Line className="text-xl text-red-500" onClick={() => onDelete(attribute.id)} />
          </div>
        }
        startContent={
          attribute.isVariable ? <MdOutlineCategory className="text-xl text-gray-500" /> : null
        }
      >
        <Divider className="mb-4" />
        <Card className="bg-gray-100 p-2 shadow-none">
          <CardHeader className="flex flex-col items-start gap-2">
            <p className="text-[16px]">افزودن مقدار ویژگی</p>
            <p className="text-gray-500">نام مورد نظر را وارد کرده یا در لیست جستجو کنید.</p>
          </CardHeader>
          <CardBody>
            <Autocomplete
              allowsCustomValue
              labelPlacement="outside"
              defaultItems={attributesListSuggestion}
              placeholder="نام جدید را وارد کنید یا جستجو کنید"
              variant="flat"
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSelectionChange={(key: any) => setSelectedAttr(key)}
              color="secondary"
              endContent={
                inputValue.trim() &&
                  !subAttributes.some(s => s.label === inputValue) &&
                  activeBtn === "add_new_attribute" ? (
                  <Button size="sm" variant="flat" color="secondary" onPress={handleAddSubAttr}>
                    افزودن
                  </Button>
                ) : null
              }
            >
              {item => <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>}
            </Autocomplete>


            <div className="w-full text-end">
              <Button isDisabled={isDisabledAcc} size="sm" variant="flat" color="secondary" className="mt-4" onPress={handleAddNewSubAttrInList}>
                + افزودن
              </Button>
            </div>

            {subAttributes.length > 0 && (
              <>
                <Divider className="mt-6" />
                <div className="mt-4">
                  <p className="text-start pb-4">زیر مجموعه‌ها</p>
                  <ul className="flex flex-col gap-4">
                    {subAttributes.map((sub, i) => (
                      <li key={i} className="flex items-center justify-between bg-gray-200 rounded-lg p-2">
                        <span>{sub.label}</span>
                        <Button size="sm" variant="flat" color="danger" onPress={() => handleRemove(sub.id)}>
                          <RiDeleteBin5Line className="text-xl" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default AddNewSubAttribute;
