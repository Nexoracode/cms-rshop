"use client";

type MyProfileFormProps = {
  info: any;
};

const MyProfileForm: React.FC<MyProfileFormProps> = ({ info }) => {
  console.log("admin =>", info);

  return (
    <div>
      <p>MyProfileForm</p>
    </div>
  );
};

export default MyProfileForm;
