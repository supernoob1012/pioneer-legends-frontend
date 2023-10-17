import React, { FC, useContext } from 'react';
import { ModalContext } from '../../context/ModalProvider';
import { CloseIcon } from '../SvgIcons';

const ShareModal: FC = () => {
  const { isShareModal, setIsShareModal } = useContext<any>(ModalContext);
  return isShareModal ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50" >
      <div className="w-[600px] bg-white p-6 rounded-2xl border-2 border-[#ffffff60] relative max-sm:w-[450px] max-[500px]:w-[380px] max-[400px]:w-[300px] h-[800px]">

        <button
          className="absolute right-5 top-5"
          onClick={() => setIsShareModal(false)}
        >
          <CloseIcon color="#000" />
        </button>
        <div>
          <p className="text-3xl">Share</p>
        </div>
      </div>
    </div >
  ) : (
    <></>
  )
}

export default ShareModal;
