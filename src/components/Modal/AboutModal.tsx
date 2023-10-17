import React, { FC, useContext } from 'react';
import { ModalContext } from '../../context/ModalProvider';
import { CloseIcon } from '../SvgIcons';
import { HOME_INTRO_CONTENT } from '../../config';
import IntroItem from '../IntroItem';

const AboutModal: FC = () => {
  const { isAboutModal, setIsAboutModal } = useContext<any>(ModalContext)
  return isAboutModal ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="w-[800px] bg-white p-6 rounded-2xl border-2 border-[#ffffff60] relative max-sm:w-[450px] max-[500px]:w-[380px] max-[400px]:w-[300px]">
        <button
          className="absolute right-5 top-5"
          onClick={() => setIsAboutModal(false)}
        >
          <CloseIcon color="#000" />
        </button>
        <div>
          <p className="text-3xl">About</p>
        </div>

        <div className="max-w-[800px] mx-auto flex flex-col gap-20 pt-10 h-[800px] overflow-y-auto">
          {HOME_INTRO_CONTENT.map((item, key) => (
            <IntroItem title={item.title} key={key} description={item.desciption} media={item.media} />
          ))}
        </div>
      </div>

    </div>
  ) : (
    <></>
  )
}

export default AboutModal;
