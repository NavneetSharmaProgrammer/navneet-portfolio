import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  // Helper: run initialFX and reveal the page
  const revealSite = () => {
    import("../components/utils/initialFX").then((module) => {
      if (module.initialFX) {
        module.initialFX();
      }
      setIsRevealed(true);
      setIsLoading(false);
    }).catch(() => {
      // If even initialFX fails, still reveal the page reliably via React state
      setIsRevealed(true);
      setIsLoading(false);
    });
  };

  // Normal path: model loaded successfully
  useEffect(() => {
    if (loading >= 100 && isLoading) {
      setTimeout(revealSite, 500);
    }
  }, [loading, isLoading]);

  // Fallback: if model never loads, reveal after 8s
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (isLoading) {
        console.warn("Model load timeout — revealing site without 3D character");
        revealSite();
      }
    }, 8000);
    return () => clearTimeout(fallback);
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      <main className={`main-body ${isRevealed ? 'main-active' : ''}`}>{children}</main>
    </LoadingContext.Provider>
  );
};


export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
