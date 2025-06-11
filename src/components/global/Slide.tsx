import Image from "next/image";

type SlideProps = {
    priority?: boolean | undefined,
    path: string
}

const Slide = ({ priority, path }: SlideProps) => {
    return (
        <Image
            src={path}
            alt="slide"
            width={800}
            height={800}
            priority={priority}
            rel="preload"
            className="rounded-md w-full h-[65vh] object-cover"
        />
    )
}

export default Slide;