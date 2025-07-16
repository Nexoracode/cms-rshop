"use client"

type Props = {
    productName: string,
    subProductName: string,
    isExist: string,
    price: string | number,
    img: string
}

const ProductItem: React.FC<Props> = ({ price, productName, isExist, subProductName, img }) => {

    return (
        <div className="flex flex-col xs:flex-row xs:items-center justify-between bg-slate-100 rounded-2xl p-2 xs:p-3">
            <div className="flex items-center text-start gap-3">
                <img src={img} alt="img" className="w-20 rounded-2xl" />
                <div className="flex flex-col gap-2">
                    <p>{productName}</p>
                    <p>{subProductName}</p>
                </div>
            </div>
            <div className="text-end flex justify-between bg-white p-3 rounded-xl w-full xs:flex-col mt-3 xs:mt-0 gap-2 xs:max-w-36 xs:pl-2">
                <p>{isExist}</p>
                {price.toLocaleString()} تومان
            </div>
        </div>
    )
}

export default ProductItem