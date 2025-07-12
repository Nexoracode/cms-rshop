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
        <div className="flex items-center justify-between bg-slate-100 rounded-2xl p-2">
            <div className="flex items-center text-start gap-3">
                <img src={img} alt="img" className="w-20 rounded-2xl" />
                <div className="flex flex-col gap-2">
                    <p>{productName}</p>
                    <p>{subProductName}</p>
                </div>
            </div>
            <div className="text-end flex flex-col gap-2 max-w-36 pl-2 w-full">
                <p>{isExist}</p>
                {price.toLocaleString()} تومان
            </div>
        </div>
    )
}

export default ProductItem