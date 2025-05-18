import { useTranslation } from "react-i18next";

interface IdeaResultProps {
  result: string;
  isLoading: boolean;
  error?: string;
  onClose: () => void;
}

export default function IdeaResult({ result, isLoading, error, onClose }: IdeaResultProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-secondary rounded-xl p-6 max-w-3xl w-full max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-textPrimary">{t('generatingIdea')}</h2>
            <button 
              onClick={onClose}
              className="text-textSecondary hover:text-accent"
            >
              ✕
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="flex justify-center items-center h-60">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-textSecondary">{t('pleaseWait')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-secondary rounded-xl p-6 max-w-3xl w-full max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-textPrimary text-red-500">{t('errorTitle')}</h2>
            <button 
              onClick={onClose}
              className="text-textSecondary hover:text-accent"
            >
              ✕
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="bg-red-500 bg-opacity-10 p-4 rounded-md border border-red-500">
              <p className="text-red-400">{error || t('genericError')}</p>
              <p className="mt-2 text-textSecondary">{t('tryAgainLater')}</p>
            </div>
            <div className="mt-4 text-center">
              <p className="text-textSecondary text-sm">{t('missingApiKey')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-secondary rounded-xl p-6 max-w-3xl w-full max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-textPrimary">{t('ideaResult')}</h2>
          <button 
            onClick={onClose}
            className="text-textSecondary hover:text-accent"
          >
            ✕
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="bg-primary p-4 rounded-lg">
            <pre className="whitespace-pre-wrap font-sans text-textPrimary">
              {result}
            </pre>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-primary text-textPrimary rounded-md hover:bg-opacity-80 transition"
          >
            {t('close')}
          </button>
          <button
            onClick={() => {
              const textArea = document.createElement('textarea');
              textArea.value = result;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              // Poderia adicionar um toast aqui confirmando a cópia
            }}
            className="px-4 py-2 bg-accent text-primary rounded-md hover:bg-opacity-80 transition"
          >
            {t('copyToClipboard')}
          </button>
        </div>
      </div>
    </div>
  );
}