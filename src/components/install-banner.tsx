'use client';

import { Share, Smartphone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'hub_install_banner_dismissed';

export function InstallBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed, already installed as PWA, or not on mobile
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone;

    if (!dismissed && !isStandalone) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!show) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div
      className="w-full animate-in slide-in-from-top-2 fade-in duration-500"
    >
      <div className="bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-blue-600/10 border border-violet-500/20 rounded-2xl p-4 flex items-start gap-3 backdrop-blur-sm">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-violet-500/15 text-violet-500 flex-shrink-0 mt-0.5">
          <Smartphone className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Adicione à tela inicial
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {isIOS ? (
              <>
                Toque em{' '}
                <Share className="inline h-3 w-3 -mt-0.5" />{' '}
                e depois em &quot;Adicionar à Tela de Início&quot;
              </>
            ) : (
              'Toque no menu do navegador e selecione "Instalar app" ou "Adicionar à tela inicial"'
            )}
          </p>
        </div>

        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * Profile row version — shows as an action item
 */
export function InstallAppRow({ onClick }: { onClick?: () => void }) {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone;
    setIsInstalled(isStandalone);
  }, []);

  if (isInstalled) return null;

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    // Show a helpful alert
    if (isIOS) {
      alert(
        'Para adicionar à tela inicial:\n\n1. Toque no ícone de compartilhar (↑)\n2. Role para baixo\n3. Toque em "Adicionar à Tela de Início"'
      );
    } else {
      alert(
        'Para adicionar à tela inicial:\n\n1. Toque no menu do navegador (⋮)\n2. Toque em "Instalar app" ou "Adicionar à tela inicial"'
      );
    }
  };

  return (
    <button
      className="w-full px-5 sm:px-6 py-4 flex items-center gap-4 border-t border-border/40 hover:bg-accent/50 transition-colors duration-200 text-left"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-violet-500/10 text-violet-500 flex-shrink-0">
        <Smartphone className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">Adicionar à Tela Inicial</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Acesse como um app no celular
        </p>
      </div>
    </button>
  );
}
