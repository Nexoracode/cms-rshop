"use client";

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { Button, Card, CardBody, CardFooter, Image } from "@heroui/react";
import { TbBrandArc } from "react-icons/tb";

const BrandsProduct = () => {
  return (
    <section className="flex flex-col gap-6">
      <Card>
        <BoxHeader
          title="برندها"
          color="text-white bg-gradient-to-r from-orange-500 via-purple-500 to-slate-700"
          icon={<TbBrandArc className="text-3xl" />}
        />
        <CardBody>
          <Card isFooterBlurred className="border-none w-fit" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width={200}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
              >
                Notify me
              </Button>
            </CardFooter>
          </Card>
        </CardBody>
      </Card>
    </section>
  );
};

export default BrandsProduct;
