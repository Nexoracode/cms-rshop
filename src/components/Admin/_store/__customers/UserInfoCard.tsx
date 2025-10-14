"use client";

import { Button, Card, CardBody } from "@heroui/react";

type Props = {
  firstName: string;
  lastName: string;
  phone: string;
  membership: string;
  email: string;
  onShowDetail: () => void;
};

const UserInfoCard: React.FC<Props> = ({
  firstName,
  lastName,
  phone,
  membership,
  email,
  onShowDetail,
}) => {
  return (
    <Card className="w-full border shadow-md">
      <CardBody>
        <div className="w-full flex flex-col xs:flex-row items-center justify-between mb-4">
          <p className="hidden xs:flex">اطلاعات کلی کاربر</p>
          <Button
            onPress={onShowDetail}
            className="text-sm w-full xs:w-fit"
            variant="flat"
            color="primary"
          >
            مشاهده جزئیات
          </Button>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p>
              {firstName} {lastName}
            </p>
            <p>{phone}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>{email}</p>
            <p>{membership}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserInfoCard;
