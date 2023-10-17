import React, { FC, useContext } from "react";
import { ModalContext } from "../../context/ModalProvider";
import Button from "../Button";
import ModalEdges from "./ModalCorner";

const CloseModal: FC = () => {
  const { isCloseModal, setIsCloseModal, setIsProfileModal } =
    useContext<any>(ModalContext);

  const handleCancel = () => {
    setIsProfileModal(true);
    setIsCloseModal(!isCloseModal);
  };
  if (!isCloseModal) return <></>;
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="w-[576px] bg-gradient-to-b from-[#0F0902] to-[#26211E]  rounded-2xl relative p-2">
        <div className="bg-gradient-to-b from-[#1F1B18] to-[#393028]">
          <ModalEdges />
          <div className="grid place-content-center relative z-10">
            <div className="h-[171px] grid place-content-center">
              <p className="text-[24px] text-white font-medium">
                Are you sure to disconnect wallet?
              </p>
            </div>
            <div className="flex justify-center space-x-7 mt-6 pb-9">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsCloseModal(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseModal;
