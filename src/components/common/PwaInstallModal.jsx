import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { 
  Download, 
  Smartphone, 
  Apple, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  Sparkles, 
  Monitor, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Bell
} from 'lucide-react';

export default function PwaInstallModal({ isOpen, onClose, deferredPrompt, isInstalled }) {
  const [platform, setPlatform] = useState('android'); // 'android' | 'ios' | 'desktop'
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Detect user platform
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent || '';
      const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
      const isAndroid = /Android/.test(ua);
      if (isIOS) {
        setPlatform('ios');
      } else if (isAndroid) {
        setPlatform('android');
      } else {
        setPlatform('desktop');
      }
    }
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setInstallSuccess(true);
        }
      } catch (err) {
        console.warn('[PWA Install Error]', err);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Instalar Aplicación Móvil IPSUR"
      subtitle="Instala IPSUR EDUCORE en tu celular o computadora como una app nativa"
      size="lg"
    >
      <div className="space-y-6">
        {/* Header App Showcase Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#070D1B] via-[#141C42] to-[#70003E] p-5 text-white border border-white/10 shadow-lg">
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white/10 p-2 shadow-md border border-white/20 flex-shrink-0 flex items-center justify-center backdrop-blur-md">
              <img src="/ipsur-logo.png" alt="IPSUR Logo" className="w-full h-full object-contain" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
                  PWA Nativa
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sincronización Total
                </span>
              </div>
              <h3 className="font-display font-black text-xl text-white mt-1">
                IPSUR EDUCORE · Campus Móvil
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-md">
                Acceso directo desde tu pantalla de inicio, sin barra de direcciones, con máxima velocidad y notificaciones instantáneas.
              </p>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Status: Already Installed */}
        {isInstalled ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-sm">¡La aplicación ya está instalada!</h5>
              <p className="text-xs text-emerald-700 mt-0.5">
                Ya estás disfrutando de IPSUR EDUCORE en modo aplicación standalone en este dispositivo.
              </p>
            </div>
          </div>
        ) : installSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-sm">¡Instalación Iniciada con Éxito!</h5>
              <p className="text-xs text-emerald-700 mt-0.5">
                IPSUR EDUCORE se está agregando a tu pantalla de inicio. Puedes abrirla desde tus aplicaciones.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Platform Selector Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPlatform('android')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
                  platform === 'android'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Android (Samsung / Xiaomi / Motorola)</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform('ios')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
                  platform === 'ios'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Apple className="w-4 h-4 text-slate-900" />
                <span>iPhone / iPad (iOS)</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform('desktop')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
                  platform === 'desktop'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-4 h-4 text-blue-600" />
                <span>PC / Laptop</span>
              </button>
            </div>

            {/* Instruction Guides by Platform */}
            {platform === 'android' && (
              <div className="space-y-4">
                {deferredPrompt ? (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm">Instalación Directa Disponible</h5>
                        <p className="text-xs text-blue-700">Tu navegador admite la instalación en un solo clic.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleNativeInstall}
                      className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Instalar en Android</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                    <h5 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      Pasos para instalar en Android (Chrome, Edge o Samsung Internet):
                    </h5>
                    <ol className="space-y-3 text-xs text-slate-700">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          En tu navegador Chrome o Samsung Internet, toca el <strong>menú de 3 puntos (⋮)</strong> en la esquina superior derecha.
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          2
                        </span>
                        <div>
                          Selecciona la opción <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal"</strong>.
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          3
                        </span>
                        <div>
                          Confirma <strong>"Instalar"</strong>. En segundos tendrás el ícono de IPSUR EDUCORE en tu pantalla como cualquier aplicación descargada de Google Play.
                        </div>
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {platform === 'ios' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Apple className="w-4 h-4 text-slate-900" />
                  <span>Pasos para instalar en iPhone o iPad (Safari):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Paso 1</span>
                    <h6 className="font-bold text-xs text-slate-900 mt-1">Botón Compartir</h6>
                    <p className="text-[11px] text-slate-600 mt-1">
                      En Safari, pulsa el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba <span className="font-bold text-blue-600">⎋</span> en la barra inferior).
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-2">
                      <PlusSquare className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider">Paso 2</span>
                    <h6 className="font-bold text-xs text-slate-900 mt-1">Agregar a Inicio</h6>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Desliza hacia abajo en el menú y selecciona <strong>"Agregar a pantalla de inicio"</strong> (o <em>"Añadir a pantalla de inicio"</em> ➕).
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Paso 3</span>
                    <h6 className="font-bold text-xs text-slate-900 mt-1">Confirmar</h6>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Toca <strong>"Agregar"</strong> en la esquina superior derecha. ¡Listo! Abre la app con su icono oficial en tu iPhone.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center gap-2">
                  <span className="text-base">💡</span>
                  <span><strong>Nota para iOS:</strong> Asegúrate de abrir la página en el navegador <strong>Safari</strong> para que aparezca la opción de instalación.</span>
                </div>
              </div>
            )}

            {platform === 'desktop' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <h5 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>Instalación en Computadora (Windows / Mac / Linux):</span>
                </h5>
                <p className="text-xs text-slate-600">
                  En Google Chrome o Microsoft Edge, haz clic en el icono de instalación (una pequeña computadora o monitor con flecha) que aparece a la derecha de la barra de direcciones URL, o toca el menú (⋮) y selecciona <strong>"Instalar IPSUR EDUCORE"</strong>.
                </p>
                {deferredPrompt && (
                  <button
                    type="button"
                    onClick={handleNativeInstall}
                    className="mt-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Instalar en esta Computadora</span>
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h6 className="font-bold text-xs text-slate-900">Velocidad Instantánea</h6>
              <p className="text-[11px] text-slate-500 mt-0.5">Carga ultrarrápida optimizada para redes celulares 4G/5G y Wi-Fi.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
            <Bell className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
            <div>
              <h6 className="font-bold text-xs text-slate-900">Alertas en Tiempo Real</h6>
              <p className="text-[11px] text-slate-500 mt-0.5">Notificaciones instantáneas de conexión de alumnos y calificaciones.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h6 className="font-bold text-xs text-slate-900">Sincronización Total</h6>
              <p className="text-[11px] text-slate-500 mt-0.5">Todo lo que hagas en tu celular se ve reflejado en tu computadora al instante.</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
