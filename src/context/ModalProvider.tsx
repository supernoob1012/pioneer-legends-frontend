import React, { useState, ReactNode, createContext } from "react";

// Define the shape of the context
interface ModalContextProps {
  isProfileModal: boolean;
  setIsProfileModal: Function;
  isDisconnectWalletModal: boolean;
  setIsDisconnectWalletModal: Function;
  isShareModal: boolean;
  setIsShareModal: Function;
  isAboutModal: boolean;
  setIsAboutModal: Function;
  isMyWalletModal: boolean;
  setIsMyWalletModal: Function;
  isStakeModal: boolean;
  setIsStakeModal: Function;
}

// Create the Modal context
export const ModalContext = createContext<ModalContextProps | null>(null);

// Create the Modal context provider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [isDisconnectWalletModal, setIsDisconnectWalletModal] = useState(false);
  const [isShareModal, setIsShareModal] = useState(false);
  const [isAboutModal, setIsAboutModal] = useState(false);
  const [isMyWalletModal, setIsMyWalletModal] = useState(false);
  const [isStakeModal, setIsStakeModal] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        isProfileModal,
        setIsProfileModal,
        isDisconnectWalletModal,
        setIsDisconnectWalletModal,
        isShareModal,
        setIsShareModal,
        isAboutModal,
        setIsAboutModal,
        isMyWalletModal,
        setIsMyWalletModal,
        isStakeModal,
        setIsStakeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
