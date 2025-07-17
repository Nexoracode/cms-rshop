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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-100 rounded-2xl p-2 sm:p-3">
            <div className="flex items-center text-start gap-3">
                <img src={img} alt="img" className="w-20 rounded-2xl" />
                <div className="flex flex-col gap-2">
                    <p>{productName}</p>
                    <p>{subProductName}</p>
                </div>
            </div>
            <div className="text-end flex justify-between bg-white p-3 rounded-xl w-full sm:flex-col mt-3 sm:mt-0 gap-2 sm:max-w-36 sm:pl-2">
                <p>{isExist}</p>
                {price.toLocaleString()} تومان
            </div>
        </div>
    )
}

export default ProductItem