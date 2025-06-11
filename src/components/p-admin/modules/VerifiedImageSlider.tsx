import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ModalPortal from '@/components/global/ModalPortal';
import { getFile } from '@utils/helper'; // متد اصلی شما

interface ImageData {
  name: string;
  is_verified: boolean | null;
}

type VerifiedImageSliderProps = {
  images: ImageData[];
  onImagesUpdate: (updatedImages: ImageData[]) => void;
  cancle: () => void;
};

const VerifiedImageSlider = ({ images: initialImages, onImagesUpdate, cancle }: VerifiedImageSliderProps) => {
  const [images, setImages] = useState<ImageData[]>(initialImages);
  const [photos, setPhotos] = useState<{ [key: string]: { url: string; type: string } | null }>({});
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    images.forEach((image) => {
      getPictureHandler(image.name);
    });
  }, [images]);

  const getPictureHandler = async (path: string) => {
    const fileData = await getFile(path);
    setPhotos((prevPhotos) => ({
      ...prevPhotos,
      [path]: fileData || null,
    }));
  };

  const toggleIsVerified = (name: string) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.name === name
          ? {
              ...image,
              is_verified: image.is_verified === null ? true : !image.is_verified,
            }
          : image
      )
    );
  };

  const handleSave = () => {
    onImagesUpdate(images);
  };

  return (
    <ModalPortal>
      <div className="absolute inset-0 flex justify-center items-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
        <div className="w-[800px] flex flex-col items-center justify-center">
          <div className="relative z-10 w-full h-[400px] flex flex-col justify-center items-center">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="w-full h-full"
            >
              {images.map((image) => (
                <SwiperSlide key={image.name}>
                  <div className="relative flex justify-center items-center w-[800px] h-[400px] overflow-hidden">
                    {photos[image.name]?.type === 'video/mp4' ? (
                      photos[image.name]?.url ? ( // بررسی وجود URL
                        <video
                          controls
                          className="w-full h-full rounded-lg object-center"
                        >
                          <source src={photos[image.name]?.url} type="video/mp4" />
                          ویدیو قابل پخش نیست.
                        </video>
                      ) : null // اگر URL خالی باشد، ویدیو رندر نشود
                    ) : (
                      photos[image.name]?.url ? ( // بررسی وجود URL
                        <img
                          ref={imageRef}
                          src={photos[image.name]?.url}
                          alt={`Slide ${image.name}`}
                          className="w-full h-full rounded-lg object-contain"
                        />
                      ) : null // اگر URL خالی باشد، تصویر رندر نشود
                    )}
                    <span
                      onClick={() => toggleIsVerified(image.name)}
                      className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white cursor-pointer ${image.is_verified === true ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {image.is_verified === true ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="z-50 w-full grid grid-cols-1 sm:grid-cols-2">
            <button onClick={handleSave} className="text-green-700 hover:bg-green-200 pb-2 mt-3 pt-1 !rounded-lg">
              Save
            </button>
            <button onClick={cancle} className="text-red-700 hover:bg-red-200 pb-2 mt-3 pt-1 !rounded-lg">
              Cancle
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default VerifiedImageSlider;